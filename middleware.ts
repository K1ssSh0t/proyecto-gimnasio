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
      req.nextUrl.pathname.startsWith("/ventas")
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
    return res;
  }

  return res;
}

// TODO: Modificar para que redirija a la pagina de login si no tiene una session activa y redirija de la ruta clientes

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
