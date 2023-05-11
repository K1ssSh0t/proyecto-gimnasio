import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import type { Database } from "./types/supabase";

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user.id;

  let { data, error } = await supabase.rpc("es_empleado", {
    employee_id: userId,
  });

  const checarrutaAdmin = () => {
    if (
      req.nextUrl.pathname.startsWith("/inventario") ||
      req.nextUrl.pathname.startsWith("/trabajadores") ||
      req.nextUrl.pathname.startsWith("/ventas") ||
      req.nextUrl.pathname.startsWith("/ingreso") ||
      req.nextUrl.pathname.startsWith("/reportes")
    ) {
      return true;
    }
    return false;
  };

  const checarrutaCliente = () => {
    if (req.nextUrl.pathname.startsWith("/clientes")) {
      return true;
    }
    return false;
  };

  if (data != true && checarrutaAdmin()) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  if (!session) {
    if (checarrutaCliente()) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/";
      redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
    return res;
  }
  if (data && checarrutaCliente()) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

/*
export const config = {
  matcher: ["/inventario", "/trabajadores", "/ventas"],
};*/

/*
// Check auth condition
  if (session?.user.email?.endsWith('@gmail.com')) {
    // Authentication successful, forward request to protected route.
    return res
  }
*/
