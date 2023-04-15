"use client";
import { Database } from "../../types/supabase";

type Empleado = Database["public"]["Tables"]["empleados"]["Row"];

export default function EmpleadosLista({
  empleados,
}: {
  empleados: Empleado[];
}) {
  return (
    <div className=" flex flex-auto flex-col space-y-4 justify-center items-center">
      <h2 className="text-2xl font-bold mt-6 mb-2">Lista de Empleados</h2>
      <div className=" flexoverflow-x-auto w-11/12">
        <table className=" table table-compact w-full">
          <thead>
            <tr className=" text-center ">
              <th style={{ position: "unset" }}>Empleado ID</th>
              <th className=" ">Nombre</th>
              <th className=" ">Apellido Paterno</th>
              <th className=" ">Apellido Materno</th>
              <th className=" ">Telefono</th>
              <th className=" ">Correo</th>
              <th className=" ">Puesto</th>
              <th className=" ">Direccion</th>
              <th className=" ">Acciones</th>
              <th className=" ">Clases</th>
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
                <td className=" flex space-x-4 justify-center">Acciones</td>
                <td className="">Clases</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
