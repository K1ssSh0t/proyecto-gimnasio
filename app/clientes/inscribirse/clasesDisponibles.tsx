"use client";
import * as React from "react";
import { Database } from "@/types/supabase";
import { useState } from "react";
import { useSupabase } from "@/components/supabase-provider";
import { useRouter } from "next/navigation";

type Clase = Database["public"]["Tables"]["clase"]["Row"];
type inscripciones = Database["public"]["Tables"]["inscripciones"]["Row"];

type ClasesInscritas = {
  descripcion: string | null;
  fecha_fin: string | null;
  fecha_inicio: string | null;
  hora_fin: string | null;
  hora_inicio: string | null;
  id: number;
  id_empleado: string | null;
  inscripciones:
    | { id: number; id_clase: number | null; id_cliente: string | null }
    | { id: number; id_clase: number | null; id_cliente: string | null }[]
    | null;
};

// TODO: MODIFICAR PARA QUE SE MUESTREN LAS CLASES QUE ESTE INSCRITO Y HACER QUE SE PUEDAN ACTUALIZAR

// HACER QUE SEA UN BOTON QUE INSCRIBA A UNA CLASE , MOSTRAR UN MENSAJE SI YA NO SE PUEDE INSCRIBAR A MAS CLASES
// EN OTRO APARTADO MOSTRAR A LAS CLASES QUE SE ESTA INSCRITO Y DESDE AHI SE VA PODER ELIMINARLAS
export function ClasesDisponibles({
  clases,
  inscripciones,
}: {
  clases: Clase[];
  inscripciones: ClasesInscritas[];
}) {
  const { supabase, session } = useSupabase();
  const router = useRouter();

  const clasesInscritas = inscripciones.map(
    (inscripcion) => inscripcion.inscripciones
  );

  console.log(clasesInscritas);
  console.log(inscripciones.length);

  function buscarClaseInscrita(
    arr: ClasesInscritas[],
    idClase: number
  ): boolean {
    return arr.some((clase) => clase.id === idClase);
  }

  const handleClick = async (event: React.SyntheticEvent, claseID: number) => {
    event.preventDefault();

    if (inscripciones.length > 1) {
      alert("No se pueden inscribir mas clases");
      return;
    }
    if (buscarClaseInscrita(inscripciones, claseID)) {
      alert("Ya estas inscrito a esta clase");
      return;
    }
    const { data, error } = await supabase
      .from("inscripciones")
      .insert([{ id_cliente: session?.user.id, id_clase: claseID }]);

    router.refresh();
  };

  const handleEliminar = async (
    event: React.SyntheticEvent,
    inscripcionID: number
  ) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("inscripciones")
      .delete()
      .match({ id: inscripcionID });

    router.refresh();
  };

  return (
    <div className="flex justify-center flex-col items-center p-4">
      <div className="overflow-x-auto w-10/12">
        <table className="table table-zebra table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
              <th>Hora de Inicio</th>
              <th>Hora de Fin</th>
              <th>Inscribirse</th>
            </tr>
          </thead>
          <tbody>
            {clases.map((clase) => (
              <tr key={clase.id}>
                <th>{clase.id}</th>
                <td>{clase.descripcion}</td>
                <td>{clase.fecha_inicio}</td>
                <td>{clase.fecha_fin}</td>
                <td>{clase.hora_inicio}</td>
                <td>{clase.hora_fin}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    id={`${clase.id}`}
                    onClick={(event) => handleClick(event, clase.id)}
                  >
                    Inscribirse
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-info">Clases Inscritas </button>
      <div className="flex flex-col w-full border-opacity-50 justify-center items-center my-4">
        <div className="divider w-11/12 self-center" />
        <div className="grid h-20 card bg-base-300 rounded-box place-items-center w-11/12">
          Solo se puede inscribir a dos clases
        </div>
      </div>

      <div className="overflow-x-auto w-10/12">
        <table className="table table-zebra table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
              <th>Hora de Inicio</th>
              <th>Hora de Fin</th>
              <th>Inscribirse</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.map((clase) => (
              <tr key={clase.id}>
                <th>{clase.id}</th>
                <td>{clase.descripcion}</td>
                <td>{clase.fecha_inicio}</td>
                <td>{clase.fecha_fin}</td>
                <td>{clase.hora_inicio}</td>
                <td>{clase.hora_fin}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    name={`opciones${clase.id}`}
                    onClick={(event) =>
                      /* @ts-ignore */
                      handleEliminar(event, clase.inscripciones![0].id)
                    }
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
