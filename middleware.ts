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

  if (data) {
    return res;
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/";
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/inventario", "/trabajadores", "/ventas"],
};

/*
// Check auth condition
  if (session?.user.email?.endsWith('@gmail.com')) {
    // Authentication successful, forward request to protected route.
    return res
  }
*/
