"use client";
import * as React from "react";
import { Database } from "@/types/supabase";
import { useSupabase } from "@/components/supabase-provider";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Clientes = Database["public"]["Tables"]["clientes"]["Row"];

export default function MisDatos({ cliente }: { cliente: Clientes }) {
  const { supabase } = useSupabase();
  const router = useRouter();

  const [clienteNombre, setClienteNombre] = useState(cliente.nombre);
  const [clienteApellidos, setClienteApellidos] = useState(cliente.apellidos);
  const [clienteEmail, setClienteEmail] = useState(cliente.email);
  const [clienteTelefono, setClienteTelefono] = useState(cliente.telefono);

  async function updateCliente(e: React.SyntheticEvent) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("clientes")
      .update({
        nombre: clienteNombre,
        apellidos: clienteApellidos,
        telefono: clienteTelefono,
      })
      .eq("id", cliente.id);
    error ? console.log(error) : router.refresh();
  }

  return (
    <div className=" flex justify-center items-center p-4">
      <div className="card w-4/5 bg-base-300 shadow-xl">
        <div className="card-body ">
          <form
            onSubmit={updateCliente}
            className=" flex flex-col items-center justify-center"
          >
            <h2 className="card-title  self-center ">Actualiza tus datos</h2>
            <div className=" flex flex-col items-center justify-center">
              <div className="form-control w-full max-w-2xl">
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="input input-bordered w-full max-w-xl"
                  value={clienteNombre!}
                  onChange={(e) => setClienteNombre(e.target.value)}
                />
                <label className="label">
                  <span className="label-text">Apellidos</span>
                </label>
                <input
                  type="text"
                  placeholder="Apellidos"
                  className="input input-bordered w-full max-w-xs"
                  value={clienteApellidos!}
                  onChange={(e) => setClienteApellidos(e.target.value)}
                />
                <label className="label">
                  <span className="label-text">Correo Electronico</span>
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full max-w-xs"
                  value={clienteEmail!}
                  readOnly
                />
                <label className="label">
                  <span className="label-text">Telefono</span>
                </label>
                <input
                  type="tel"
                  placeholder="000-000-00-00"
                  className="input input-bordered w-full max-w-xs"
                  value={clienteTelefono!}
                  onChange={(e) => setClienteTelefono(e.target.value)}
                />
              </div>
            </div>
            <div className="card-actions justify-end self-end">
              <button className="btn btn-info" type="submit">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
