"use client";
import { Database } from "@/types/supabase";
import { useSupabase } from "@/components/supabase-provider";
import { useEffect, useState } from "react";

type Clientes = Database["public"]["Tables"]["clientes"]["Row"];
type Membresia = Database["public"]["Tables"]["membresia"]["Row"];

export function InterfazIngresos({ clientes }: { clientes: Clientes[] }) {
  const { supabase } = useSupabase();

  const [telefono, setTelefono] = useState("");

  const [telefonoAux, setTelefonoAux] = useState("");

  const [id_cliente, setId_cliente] = useState<string | undefined>("");

  const [encontrado, setEncontrado] = useState("");

  const [estadoMembresia, setEstadoMembresia] = useState<Membresia[]>();

  console.log(telefono);
  console.log(id_cliente);
  console.log(encontrado);

  useEffect(() => {
    const objeto = clientes.find((cliente) => cliente.telefono === telefono);
    setId_cliente(objeto?.id);
  }, [telefono]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: membresia, error } = await supabase
      .from("membresia")
      .select("*")
      .eq("id_cliente", id_cliente);

    console.log(membresia);
    if (!error && membresia.length > 0) {
      setEncontrado("encontrado");
      setEstadoMembresia(membresia!);
      setTelefonoAux(telefono);
    } else {
      setEncontrado("no encontrado");
    }
  };
  return (
    <div className=" m-4  flex flex-col items-center ">
      <div className="form-control">
        <div className="input-group ">
          <form onSubmit={handleSubmit} className=" flex  items-center ">
            <label>
              <input
                type="text"
                placeholder="Buscar Telefono…"
                className="input input-bordered"
                list="clientes"
                inputMode="tel"
                value={telefono}
                name="telefono"
                id="telefono"
                onChange={(e) => setTelefono(e.target.value)}
                required
                minLength={10}
                maxLength={10}
              />
              <datalist id="clientes">
                {clientes.map((cliente, index) => (
                  <option value={cliente.telefono!} key={index} />
                ))}
              </datalist>
            </label>
            <button className="btn btn-square" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
      {encontrado == "encontrado" ? (
        <div className="stats stats-vertical lg:stats-horizontal shadow scale-75 lg:scale-100 mt-4">
          <div className="stat">
            <div className="stat-title">Telefono del Cliente</div>
            <div className="stat-value">{telefonoAux}</div>
            <div className="stat-desc"></div>
          </div>

          <div className="stat">
            <div className="stat-title">Estado</div>
            <div className="stat-value">
              {estadoMembresia![0].estado_membresia}
            </div>
            <div className="stat-desc"></div>
          </div>

          <div className="stat">
            <div className="stat-title">Fecha de Activacion</div>
            <div className="stat-value">
              {estadoMembresia![0].fecha_activacion}
            </div>
            <div className="stat-desc"></div>
          </div>
        </div>
      ) : (
        <div className=" text-lg text-center flex flex-col w-full mt-4">
          <div className="divider w-4/5 self-center"></div>

          <h3>No se encontro cliente con membresia activa</h3>
        </div>
      )}
    </div>
  );
}
