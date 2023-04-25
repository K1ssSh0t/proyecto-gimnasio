"use client";
import { Database } from "../../types/supabase";
import { ActualizarEmpleado } from "./actualizar_empleado";
import { useEffect, useState } from "react";
import { useSupabase } from "../../components/supabase-provider";

type Empleado = Database["public"]["Tables"]["empleados"]["Row"];

export default function EmpleadosLista({
  empleadosLista,
}: {
  empleadosLista: Empleado[];
}) {
  const { supabase } = useSupabase();

  const [empleados, setEmpleados] = useState(empleadosLista);

  useEffect(() => {
    setEmpleados(empleados);
  }, [empleados]);

  useEffect(() => {
    const channel = supabase
      .channel("cambio_tabla_empleados")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "empleados" },
        (payload) =>
          setEmpleados((empleados) => [...empleados, payload.new as Empleado])
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "empleados" },
        (payload) =>
          setEmpleados(
            empleados.filter((empleado) => empleado.id !== payload.old.id)
          )
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "empleados" },
        (payload) =>
          setEmpleados(
            empleados.map((empleado) =>
              empleado.id === payload.new.id
                ? { ...empleado, ...payload.new }
                : empleado
            )
          )
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setEmpleados, empleados]);

  return (
    <div className=" flex flex-auto flex-col space-y-4 justify-center items-center">
      <h2 className="text-2xl  mt-6 mb-2">Lista de Empleados</h2>
      <div className=" flexoverflow-x-auto w-11/12">
        <table className=" table table-compact w-full">
          <thead>
            <tr className=" text-center  ">
              <th style={{ position: "unset", textTransform: "capitalize" }}>
                Empleado ID
              </th>
              <th className=" capitalize ">Nombre</th>
              <th className=" capitalize">Apellido Paterno</th>
              <th className=" capitalize ">Apellido Materno</th>
              <th className=" capitalize ">Telefono</th>
              <th className=" capitalize">Correo</th>
              <th className="capitalize ">Puesto</th>
              <th className="capitalize ">Direccion</th>
              <th className=" capitalzie">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado, index) => (
              <tr key={index}>
                <td className="">{empleado.id}</td>
                <td className="">{empleado.nombre}</td>
                <td className="">{empleado.apellido_p}</td>
                <td className="">{empleado.apellido_m}</td>
                <td className="">{empleado.telefono}</td>
                <td className="">{empleado.email}</td>
                <td className="">{empleado.tipo_empleado}</td>
                <td className="">{empleado.direccion}</td>
                <td className=" flex space-x-4 justify-center">
                  <ActualizarEmpleado empleado={empleado} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
