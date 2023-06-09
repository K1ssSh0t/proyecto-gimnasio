import * as React from "react";

type clases =
  | {
      clase_id: number;
      clase_descripcion: string;
      cantidad: number;
    }[]
  | null
  | undefined;

export function InscripcionesClases({ clases }: { clases: clases }) {
  return (
    <div className="overflow-x-auto w-full">
      <h5 className="text-lg font-bold  text-center text-[#666666] mb-2">
        Inscripciones por Clases
      </h5>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th style={{ position: "unset" }}>ID</th>
            <th>Descripción</th>
            <th>Cantidad de Inscripciones</th>
          </tr>
        </thead>
        <tbody>
          {clases?.map((clase) => (
            <tr key={clase.clase_id}>
              <td>{clase.clase_id}</td>
              <td>{clase.clase_descripcion}</td>
              <td>{clase.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
