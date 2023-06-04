import * as React from "react";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/utils/supabase-browser";
import { useRouter } from "next/navigation";

type Producto = Database["public"]["Tables"]["producto"]["Row"];

export function DescripcionProductos({
  productos,
  total,
  clienteID,
  empleadoID,
  manejarValores,
}: {
  productos: Producto[];
  total: number;
  clienteID: string;
  empleadoID: string;
  manejarValores: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // const [idVenta, setIdVenta] = useState<number>();

  const supabase = createBrowserClient();

  const router = useRouter();

  let currentDate = new Date().toJSON().slice(0, 10);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const generarDetallesdeVentas = async (idVenta: number) => {
    productos.map(async (producto) => {
      /** @ts-ignore  */
      let subtotal = producto.precio_venta * producto.cantidad;
      const { data, error } = await supabase.from("detalle_venta").insert([
        {
          /** @ts-ignore  */
          cantidad: producto.cantidad as number,
          subtotal: subtotal as number,
          id_venta: idVenta as number,
          id_producto: producto.id as number,
        },
      ]);
    });
  };

  const agregarVenta = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const generarVenta = async () => {
      //  if (clienteID != undefined && total != 0 && empleadoID != undefined) {
      const { data, error } = await supabase
        .from("venta")
        .insert([
          {
            fecha_venta: currentDate,
            id_cliente: clienteID,
            total: total,
            id_empleado: empleadoID,
          },
        ])
        .select();

      return data;
      // }
    };

    try {
      const ventaGenerada = await generarVenta();
      //await setIdVenta(ventaGenerada![0].id);
      await generarDetallesdeVentas(ventaGenerada![0].id);
    } catch (error) {
      console.log(error);
    } finally {
      manejarValores();
      router.refresh();
    }

    //window.location.reload();
  };
  return (
    <div>
      <button onClick={openModal} className="btn btn-info">
        Ver Detalles
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
              className="inline-block align-middle max-w-xs w-full bg-[#8fa1e5] dark:bg-[#4b6de7] rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
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
                <div className="my-3 text-center sm:my-5 overflow-x-auto">
                  <h3>Detalle Venta</h3>
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th
                          style={{
                            position: "unset",
                            textTransform: "capitalize",
                          }}
                        ></th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th className="truncate">
                          Cantidad <br /> Disponible
                        </th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    {productos.map((producto, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{producto.nombre}</td>
                          <td>{producto.precio_venta}</td>
                          {/**@ts-ignore */}
                          <th>{producto.cantidad}</th>
                          {}
                          <th>
                            {
                              /**@ts-ignore */
                              (producto.subtotal =
                                /**@ts-ignore */
                                producto.precio_venta! * producto.cantidad)
                            }
                          </th>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                  <p className="text-center"> Total con Descuento: $ {total}</p>

                  <button className="btn btn-info" onClick={agregarVenta}>
                    Finalizar Venta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
