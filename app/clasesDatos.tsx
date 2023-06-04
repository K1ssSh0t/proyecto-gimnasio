import * as React from "react";
import { Database } from "@/types/supabase";

type Clases = Database["public"]["Tables"]["clase"]["Row"];

export function Clases({ clases }: { clases: Clases[] }) {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <section className=" ">
            <h1 className="text-5xl font-bold mb-12 ">Nuestras Clases</h1>
            <div className="flex flex-wrap justify-center items-center gap-y-3">
              {clases.map((clase, index) => (
                <div className="" key={index}>
                  <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="stat">
                      <div className="stat-title">Clase</div>
                      <div className="stat-value">{clase.descripcion}</div>
                      <div className="stat-desc"></div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Fecha de Inicio</div>
                      <div className="stat-value">{clase.fecha_inicio}</div>
                      <div className="stat-desc"></div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Fecha de Fin</div>
                      <div className="stat-value">{clase.fecha_fin}</div>
                      <div className="stat-desc"></div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Hora de Inicio</div>
                      <div className="stat-value">{clase.hora_inicio}</div>
                      <div className="stat-desc"></div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Hora de Finalización</div>
                      <div className="stat-value">{clase.hora_fin}</div>
                      <div className="stat-desc"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
