"use client";

import { useState } from "react";
import { Database } from "@/types/supabase";
import { useSupabase } from "@/components/supabase-provider";
import React from "react";

type Empleado = Database["public"]["Tables"]["empleados"]["Row"];

type Props = {
  empleado: Empleado;
};

export function ActualizarEmpleado({ empleado }: Props) {
  const { supabase } = useSupabase();

  const [isOpen, setIsOpen] = useState(false);

  const [empleadoNombre, setEmpleadoNombre] = useState<
    Empleado["nombre"] | string
  >(empleado.nombre);

  const [empleadoApellidoP, setEmpleadoApellidoP] = useState<
    Empleado["apellido_p"] | string
  >(empleado.apellido_p);

  const [empleadoApellidoM, setEmpleadoApellidoM] = useState<
    Empleado["apellido_m"] | string
  >(empleado.apellido_m);

  const [empleadoTelefono, setEmpleadoTelefono] = useState<
    Empleado["telefono"] | string
  >(empleado.telefono);

  const [empleadoEmail, setEmpleadoEmail] = useState<
    Empleado["email"] | string
  >(empleado.email);

  const [empleadoTipoEmpleado, setEmpleadoTipoEmpleado] = useState<
    Empleado["tipo_empleado"] | string
  >(empleado.tipo_empleado);

  const [empleadoDireccion, setEmpleadoDireccion] = useState<
    Empleado["direccion"] | string
  >(empleado.direccion);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function actualizarEmpleado(e: React.SyntheticEvent) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("empleados")
      .update({
        nombre: empleadoNombre,
        apellido_p: empleadoApellidoP,
        apellido_m: empleadoApellidoM,
        telefono: empleadoTelefono,
        email: empleadoEmail,
        tipo_empleado: empleadoTipoEmpleado as number,
        direccion: empleadoDireccion,
      })
      .eq("id", empleado.id);

    console.log(data);

    console.log(error);
  }

  return (
    <div>
      <button onClick={openModal} className="btn btn-info">
        Actualizar
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
                    onSubmit={actualizarEmpleado}
                    className=" lg:flex lg:flex-col w-full lg:max-w-3xl "
                  >
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-name"
                      >
                        Nombre
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="product-name"
                        type="text"
                        name="name"
                        value={empleadoNombre as string}
                        onChange={(event) =>
                          setEmpleadoNombre(event.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-description"
                      >
                        Apellido Paterno
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        id="product-description"
                        name="description"
                        type="text"
                        value={empleadoApellidoP as string}
                        onChange={(event) =>
                          setEmpleadoApellidoP(event.target.value)
                        }
                      ></input>
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-price"
                      >
                        Apellido Materno
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        id="product-price"
                        type="text"
                        name="price"
                        value={empleadoApellidoM as string}
                        onChange={(event) =>
                          setEmpleadoApellidoM(event.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-price"
                      >
                        Telefono
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        id="product-price"
                        type="tel"
                        name="price"
                        value={empleadoTelefono as string}
                        onChange={(event) =>
                          setEmpleadoTelefono(event.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block font-bold mb-2"
                        htmlFor="product-quantity"
                      >
                        Correo Electronico
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="product-quantity"
                        type="email"
                        name="quantity"
                        value={empleadoEmail as string}
                        onChange={(event) =>
                          setEmpleadoEmail(event.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block font-bold mb-2"
                        htmlFor="product-quantity"
                      >
                        Puesto
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="product-quantity"
                        type="text"
                        name="quantity"
                        value={empleadoTipoEmpleado as string}
                        onChange={(event) =>
                          setEmpleadoTipoEmpleado(event.target.value)
                        }
                        list="empleados-lista"
                      />
                      <datalist id="empleados-lista">
                        {
                          //listaIdsEmpleados?.map((empleado, key) => (
                          //  <option key={key} value={empleado!} />
                          //  ))
                          // TODO: Agregar puestos a la lista
                        }
                      </datalist>
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block font-bold mb-2"
                        htmlFor="product-quantity"
                      >
                        Direccion
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="product-quantity"
                        type="text"
                        name="quantity"
                        value={empleadoDireccion as string}
                        onChange={(event) =>
                          setEmpleadoDireccion(event.target.value)
                        }
                      />
                    </div>
                    <div className=" flex justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                        type="submit"
                      >
                        Actualizar Empleado
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
}
