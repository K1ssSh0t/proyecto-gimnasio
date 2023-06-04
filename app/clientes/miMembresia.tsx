import * as React from "react";
import { Database } from "@/types/supabase";

type Membresia = Database["public"]["Tables"]["membresia"]["Row"];

export function MiMembresia({ membresia }: { membresia: Membresia }) {
  return (
    <div className=" flex justify-center p-4">
      <div className="card w-4/5 bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title self-center">Mi Membresía</h2>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Estado</div>
              <div className="stat-value capitalize">
                {membresia.estado_membresia}
              </div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
              <div className="stat-title">Fecha de Activación</div>
              <div className="stat-value">{membresia.fecha_activacion}</div>
              <div className="stat-desc">Vigente hasta ...</div>
            </div>

            <div className="stat">
              <div className="stat-title">Tipo de membresia</div>
              <div className="stat-value">{membresia.id_tipo_membresia}</div>
              <div className="stat-desc">Membresía Básica , etc</div>
            </div>
          </div>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
}
