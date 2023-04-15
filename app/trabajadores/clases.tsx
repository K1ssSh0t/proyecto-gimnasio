"use client";
import { Database } from "../../types/supabase";
import ActualizarClase from "./actualizar_clase";
import EliminarClase from "./eliminar_clase";

type Clase = Database["public"]["Tables"]["clase"]["Row"];
export default function ClasesLista({ clases }: { clases: Clase[] }) {
  const listaIdsEmpleados: (string | null)[] = clases.map(
    (clase: Clase) => clase.id_empleado
  );

  return (
    <div className=" flex flex-auto flex-col space-y-4 justify-center items-center">
      <h2 className="text-2xl font-bold mt-6 mb-2">Lista de Clases</h2>
      <button>Agregar Clase</button>
      <div className=" flexoverflow-x-auto w-11/12">
        <table className=" table table-compact w-full">
          <thead>
            <tr className=" text-center ">
              <th style={{ position: "unset" }}>Clase ID</th>
              <th className=" ">Descripcion</th>
              <th className=" ">Fecha de Inicio</th>
              <th className=" ">Fecha de Fin</th>
              <th className=" ">Hora de Inicio</th>
              <th className=" ">Hora de Fin</th>
              <th className=" ">Id del Empleado</th>
              <th className=" ">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clases.map((clase, index) => (
              <tr key={index}>
                <td className="">{clase.id}</td>
                <td className="">{clase.descripcion}</td>
                <td className="">{clase.fecha_inicio}</td>
                <td className="">{clase.fecha_fin}</td>
                <td className="">{clase.hora_inicio}</td>
                <td className="">{clase.hora_fin}</td>
                <td className="">{clase.id_empleado}</td>
                <td className=" flex space-x-4 justify-center">
                  <EliminarClase claseId={clase.id} />
                  <ActualizarClase
                    clase={clase}
                    listaIdsEmpleados={listaIdsEmpleados}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
