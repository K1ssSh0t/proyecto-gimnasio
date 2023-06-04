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
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Cantidad de Inscripciones</th>
          </tr>
        </thead>
        <tbody>
          {clases?.map((clase) => (
            <tr key={clase.clase_id}>
              <th>{clase.clase_id}</th>
              <td>{clase.clase_descripcion}</td>
              <td>{clase.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
