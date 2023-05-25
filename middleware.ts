import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import type { Database } from "./types/supabase";

type supabase = ReturnType<typeof createMiddlewareSupabaseClient>;

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`

// El middleware es una funcion que se ejecuta cada vez que se acedea una ruta
// permitiendo asi restringir el accceso a usuarios que no tienen permisos
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

  let { data: es_instructor, error: es_instructor_error } = await supabase.rpc(
    "es_instructor",
    {
      employee_id: userId,
    }
  );

  // Funcion que determina si se encuentra en alguna de las siguientes rutas
  // que son solo para el administrador
  const checarrutaAdmin = () => {
    if (
      req.nextUrl.pathname.startsWith("/inventario") ||
      req.nextUrl.pathname.startsWith("/trabajadores") ||
      req.nextUrl.pathname.startsWith("/ventas") ||
      req.nextUrl.pathname.startsWith("/ingreso") ||
      req.nextUrl.pathname.startsWith("/reportes") ||
      req.nextUrl.pathname.startsWith("/alumnos")
    ) {
      return true;
    }
    return false;
  };

  const checarrutaSoloAdmin = () => {
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

  // Funcion que checa si es encuentra en la ruta que es solo para clientes
  const checarrutaCliente = () => {
    if (req.nextUrl.pathname.startsWith("/clientes")) {
      return true;
    }
    return false;
  };

  // Funcion que determina si se encuentra en la ruta que es solo para el login
  const checarrutaLogin = () => {
    if (req.nextUrl.pathname.startsWith("/login")) {
      return true;
    }
    return false;
  };

  // Condicion que determina si el usuario no es administrador y esta en la ruta que solo es para el administrador
  // redirigiendolo hacia la ruta de inicio
  if (es_instructor && checarrutaSoloAdmin()) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

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
  // Condicion que determina si el usuario no es cliente y esta en la ruta que solo es para el cliente
  if (data && checarrutaCliente()) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  // Condicion que determina si el usuario ya esta logueado y esta en la ruta que solo es para el login
  if (session && checarrutaLogin()) {
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
