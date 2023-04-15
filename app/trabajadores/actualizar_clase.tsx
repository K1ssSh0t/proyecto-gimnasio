"use client";

import { useState } from "react";
import { Database } from "@/types/supabase";
import { useSupabase } from "@/components/supabase-provider";
import React from "react";

type Clase = Database["public"]["Tables"]["clase"]["Row"];

type Props = {
  clase: Clase;
  listaIdsEmpleados: (string | null)[];
};

const ActualizarClase: React.FC<Props> = ({ clase, listaIdsEmpleados }) => {
  const { supabase } = useSupabase();

  const [isOpen, setIsOpen] = useState(false);

  const [claseDescripcion, setClaseDescripcion] = useState<
    Clase["descripcion"] | string
  >(clase.descripcion);

  const [claseFechaInicio, setClaseFechaInicio] = useState<
    Clase["fecha_inicio"] | string
  >(clase.fecha_inicio);

  const [claseFechaFin, setClaseFechaFin] = useState<
    Clase["fecha_fin"] | string
  >(clase.fecha_fin);

  const [claseHoraInicio, setClaseHoraInicio] = useState<
    Clase["hora_inicio"] | string
  >(clase.hora_inicio);

  const [claseHoraFin, setClaseHoraFin] = useState<Clase["hora_fin"] | string>(
    clase.hora_fin
  );

  const [claseEmpleado, setClaseEmpleado] = useState<
    Clase["id_empleado"] | string
  >(clase.id_empleado);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function actualizarClase(e: React.SyntheticEvent) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("clase")
      .update({
        descripcion: claseDescripcion,
        fecha_fin: claseFechaFin,
        fecha_inicio: claseFechaInicio,
        hora_inicio: claseHoraInicio,
        hora_fin: claseHoraFin,
        id_empleado: claseEmpleado,
      })
      .eq("id", clase.id);

    console.log(error);
  }

  return (
    <div>
      <button onClick={openModal} className="btn btn-warning">
        Actualizar Clase
      </button>
      {isOpen ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-middle max-w-xs w-full bg-zinc-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className=" ">
                <div className="grid justify-end ">
                  <button onClick={closeModal}>
                    <div className=" flex items-center justify-center  h-12 w-12 rounded-full bg-red-100  ">
                      <svg
                        className="h-6 w-6 text-red-600 "
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="my-3 text-center sm:my-5">
                  <form
                    onSubmit={actualizarClase}
                    className=" lg:flex lg:flex-col w-full lg:max-w-3xl "
                  >
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-name"
                      >
                        Descripcion
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="product-name"
                        type="text"
                        name="name"
                        value={claseDescripcion as string}
                        onChange={(event) =>
                          setClaseDescripcion(event.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-description"
                      >
                        Fechas de Inicio
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        id="product-description"
                        name="description"
                        type="date"
                        value={claseFechaInicio as string}
                        onChange={(event) =>
                          setClaseFechaInicio(event.target.value)
                        }
                      ></input>
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-price"
                      >
                        Fecha de Fin
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        id="product-price"
                        type="date"
                        name="price"
                        value={claseFechaFin as string}
                        onChange={(event) =>
                          setClaseFechaFin(event.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-price"
                      >
                        Hora de Inicio
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        id="product-price"
                        type="time"
                        name="price"
                        value={claseHoraInicio as string}
                        onChange={(event) =>
                          setClaseHoraInicio(event.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block font-bold mb-2"
                        htmlFor="product-quantity"
                      >
                        Hora de Fin
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="product-quantity"
                        type="time"
                        name="quantity"
                        value={claseHoraFin as string}
                        onChange={(event) =>
                          setClaseHoraFin(event.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block font-bold mb-2"
                        htmlFor="product-quantity"
                      >
                        Id Empleado
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="product-quantity"
                        type="text"
                        name="quantity"
                        value={claseEmpleado as string}
                        onChange={(event) =>
                          setClaseEmpleado(event.target.value)
                        }
                        list="empleados-lista"
                      />
                      <datalist id="empleados-lista">
                        {listaIdsEmpleados?.map((empleado, key) => (
                          <option key={key} value={empleado!} />
                        ))}
                      </datalist>
                    </div>
                    <div className=" flex justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                        type="submit"
                      >
                        Actualizar Clase
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ActualizarClase;
