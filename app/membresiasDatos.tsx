import * as React from "react";
import { Database } from "@/types/supabase";

type Membresias = Database["public"]["Tables"]["tipo_membresia"]["Row"];

export function Membresias({ membresias }: { membresias: Membresias[] }) {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className=" ">
            <h1 className="text-5xl font-bold mb-12 ">Nuestras Membresias</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-x-6 pt-6 place-content-center justify-items-center">
              {membresias.map((membresia, index) => (
                <div className="" key={index}>
                  <div className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure>
                      <img
                        src={membresia.url_imagen}
                        alt="Membreias"
                        className=" aspect-video"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{membresia.id}</h2>
                      <p>{membresia.descripcion}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-info">Inscribirse</button>
                        {
                          // TODO: Agregar boton para ver mas
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
