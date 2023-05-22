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

  const [productoNombre, setProductoNombre] = useState<Producto["nombre"]>(
    producto.nombre
  );

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
        nombre: productoNombre,
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
              className="inline-block align-middle max-w-xs w-full bg-[#8fa1e5] dark:bg-[#4b6de7] file:rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
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
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Nombre</span>
                      </label>

                      <input
                        className="input input-bordered w-full "
                        id="producto-nombre"
                        type="text"
                        name="producto-nombre"
                        value={productoNombre as string}
                        onChange={(event) =>
                          setProductoNombre(event.target.value)
                        }
                        required
                      />
                      <label className="label">
                        <span className="label-text">Producto Inicial</span>
                      </label>

                      <input
                        className="input input-bordered w-full "
                        id="producto-inicial"
                        type="number"
                        name="producto-inicial"
                        value={productoInicial as number}
                        onChange={(event) =>
                          setProductoInicial(event.target.value)
                        }
                        min={0}
                        required
                      />

                      <label className="label">
                        <span className="label-text">Caducidad</span>
                      </label>
                      <input
                        className="input input-bordered w-full "
                        id="product-description"
                        name="description"
                        type="date"
                        value={productoCaducidad as string}
                        onChange={(event) =>
                          setProductoCaducidad(event.target.value)
                        }
                        required
                      ></input>
                      <label className="label">
                        <span className="label-text">Costo</span>
                      </label>
                      <input
                        className="input input-bordered w-full "
                        id="product-costo"
                        type="number"
                        step="0.01"
                        name="costo"
                        value={productoCosto as number}
                        onChange={(event) =>
                          setProductoCosto(event.target.value)
                        }
                        min={0}
                        required
                      />
                      <label className="label">
                        <span className="label-text">Precio</span>
                      </label>
                      <input
                        className="input input-bordered w-full"
                        id="producto-precio"
                        type="number"
                        step="0.01"
                        name="precio"
                        value={productoPrecio as number}
                        onChange={(event) =>
                          setProductoPrcio(event.target.value)
                        }
                        min={0}
                        required
                      />
                      <label className="label">
                        <span className="label-text">Cantidad</span>
                      </label>
                      <input
                        className="input input-bordered w-full"
                        id="product-quantity"
                        type="number"
                        name="quantity"
                        value={productoActual as string}
                        onChange={(event) =>
                          setProductoActual(event.target.value)
                        }
                        min={0}
                        required
                      />
                    </div>
                    <div className=" flex justify-center mt-4">
                      <button className="btn btn-info" type="submit">
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
