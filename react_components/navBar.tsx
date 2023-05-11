import Link from "next/link";
import LogOut from "./logout";

import { createServerClient } from "../utils/supabase-server";

interface Props {
  children: React.ReactNode;
}

const verificarUsuairio = async (supabase: any, userId: string | undefined) => {
  let { data, error } = await supabase.rpc("es_empleado", {
    employee_id: userId,
  });

  return data;
};

async function NavigationMenu({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.getSession();

  const session = data?.session;

  const userId = session?.user.id;
  const esEmpleado = await verificarUsuairio(supabase, userId);

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            {" "}
            <Link href="/" className="btn btn-ghost normal-case text-xl">
              Inicio
            </Link>
          </div>
          <div className="flex-none hidden lg:block">
            {!session ? null : esEmpleado ? (
              <ul className="menu menu-horizontal">
                <li>
                  <Link href="/ventas">Ventas</Link>
                </li>
                <li>
                  <Link href="/inventario">Inventario</Link>
                </li>
                <li>
                  <Link href="/trabajadores">Empleados</Link>
                </li>
                <li>
                  <Link href="/ingreso">Registro</Link>
                </li>
                <li>
                  <Link href="/reportes">Reportes</Link>
                </li>
              </ul>
            ) : (
              <ul className="menu menu-horizontal">
                <li className=" ">
                  <Link href="/clientes">Mis Datos</Link>
                </li>
              </ul>
            )}
          </div>
          {!session ? null : <LogOut />}
        </div>

        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        {!session ? (
          <ul className="menu p-4 w-80 bg-base-100"></ul>
        ) : esEmpleado ? (
          <ul className="menu p-4 w-80 bg-base-100">
            <li>
              <Link href="/ventas">Ventas</Link>
            </li>
            <li>
              <Link href="/inventario">Inventario</Link>
            </li>
            <li>
              <Link href="/trabajadores">Empleados</Link>
            </li>
            <li>
              <Link href="/ingreso">Registro</Link>
            </li>
            <li>
              <Link href="/reportes">Reportes</Link>
            </li>
          </ul>
        ) : (
          <ul className="menu p-4 w-80 bg-base-100">
            <li className=" ">
              <Link href="/clientes">Mis Datos</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default NavigationMenu as unknown as (props: Props) => JSX.Element;
