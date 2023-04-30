"use client";

import Link from "next/link";
import LogOut from "./logout";
import { useSupabase } from "../components/supabase-provider";
import { useEffect, useState } from "react";

export default function NavigationMenu() {
  const { supabase, session } = useSupabase();
  const userId = session?.user.id;
  const [esEmpleado, setEsEmpleado] = useState<boolean | null>();

  const verificarUsuairio = async () => {
    let { data, error } = await supabase.rpc("es_empleado", {
      employee_id: userId,
    });

    setEsEmpleado(data);
  };

  useEffect(() => {
    verificarUsuairio();
  }, []);

  return !session ? (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Inicio
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end"></div>
    </div>
  ) : esEmpleado ? (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
          >
            <li>
              <Link href="/ventas">Ventas</Link>
            </li>
            <li>
              <Link href="/inventario" className="justify-between">
                Inventario
              </Link>
            </li>
            <li>
              <Link href="/trabajadores">Trabajadores</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Inicio
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className=" text-xl">
            <Link href="/ventas">Ventas</Link>
          </li>
          <li className=" text-xl">
            <Link href="/inventario" className="justify-between">
              Inventario
            </Link>
          </li>
          <li className=" text-xl ">
            <Link href="/trabajadores">Trabajadores</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end"></div>
      <LogOut />
    </div>
  ) : (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
          >
            <li>
              <Link href="/clientes">Mis Datos</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Inicio
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className=" text-xl">
            <Link href="/clientes">Mis Datos</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end"></div>
      <LogOut />
    </div>
  );
}
