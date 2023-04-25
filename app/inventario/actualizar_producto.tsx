"use client";

import { useState } from "react";
import { Database } from "@/types/supabase";
import { useSupabase } from "@/components/supabase-provider";

type Producto = Database["public"]["Tables"]["producto"]["Row"];

export function Modal({ producto }: { producto: Producto }) {
  const [isOpen, setIsOpen] = useState(false);

  const { supabase } = useSupabase();

  const [productoInicial, setProductoInicial] = useState<
    Producto["inventario_incial"] | string
  >(producto.inventario_incial);

  const [productoCaducidad, setProductoCaducidad] = useState<
    Producto["feche_caducidad"] | string
  >(producto.feche_caducidad);

  const [productoCosto, setProductoCosto] = useState<
    Producto["costo"] | string
  >(producto.costo);

  const [productoPrecio, setProductoPrcio] = useState<
    Producto["precio_venta"] | string
  >(producto.precio_venta);

  const [productoActual, setProductoActual] = useState<
    Producto["inventario_actual"] | string
  >(producto.inventario_actual);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function actualizarProducto(e: React.SyntheticEvent) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("producto")
      .update({
        inventario_actual: productoActual,
        inventario_incial: productoInicial as number,
        feche_caducidad: productoCaducidad,
        costo: productoCosto as number,
        precio_venta: productoPrecio as number,
      })
      .eq("id", producto.id);

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
                    onSubmit={actualizarProducto}
                    className=" lg:flex lg:flex-col w-full lg:max-w-3xl "
                  >
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-name"
                      >
                        Producto Inicial
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="product-name"
                        type="number"
                        name="name"
                        value={productoInicial as number}
                        onChange={(event) =>
                          setProductoInicial(event.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-description"
                      >
                        Product caducidad
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        id="product-description"
                        name="description"
                        type="date"
                        value={productoCaducidad as string}
                        onChange={(event) =>
                          setProductoCaducidad(event.target.value)
                        }
                      ></input>
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-price"
                      >
                        Product Costo
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        id="product-price"
                        type="number"
                        step="0.01"
                        name="price"
                        value={productoCosto as number}
                        onChange={(event) =>
                          setProductoCosto(event.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block  font-bold mb-2"
                        htmlFor="product-price"
                      >
                        Product Price
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        id="product-price"
                        type="number"
                        step="0.01"
                        name="price"
                        value={productoPrecio as number}
                        onChange={(event) =>
                          setProductoPrcio(event.target.value)
                        }
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block font-bold mb-2"
                        htmlFor="product-quantity"
                      >
                        Product Quantity
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="product-quantity"
                        type="number"
                        name="quantity"
                        value={productoActual as string}
                        onChange={(event) =>
                          setProductoActual(event.target.value)
                        }
                      />
                    </div>
                    <div className=" flex justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                        type="submit"
                      >
                        Actualizar Producto
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
