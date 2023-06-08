import * as React from "react";
import { Database } from "@/types/supabase";
import { useEffect, useRef, useState } from "react";
import { createBrowserClient } from "@/utils/supabase-browser";
import { useRouter } from "next/navigation";

import { useReactToPrint } from "react-to-print";

type Producto = Database["public"]["Tables"]["producto"]["Row"];

export function DescripcionProductos({
  productos,
  totalDescuento,
  subtotal,
  clienteID,
  empleadoID,
  manejarValores,
}: {
  productos: Producto[];
  totalDescuento: number;
  subtotal: number;
  clienteID: string;
  empleadoID: string;
  manejarValores: () => void;
}) {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Detalles de la venta",
    //onAfterPrint: () => alert("Reporte generado"),
  });

  const [isOpen, setIsOpen] = useState(false);

  // const [idVenta, setIdVenta] = useState<number>();

  const supabase = createBrowserClient();

  const [pagoRecibido, setPagoRecibido] = useState<number>(0);

  const [cambio, setCambio] = useState<number>(0);

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
            total: totalDescuento,
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

  useEffect(() => {
    let pago: number = totalDescuento - pagoRecibido;
    if (isNaN(pago)) {
      setCambio(0);

      return;
    }
    if (pago == null) {
      setCambio(0);
      return;
    }
    if (pagoRecibido < totalDescuento) {
      setCambio(0);
      return;
    }
    setCambio(Math.abs(Number(pago.toFixed(2))));
  }, [pagoRecibido]);

  const printWindow = () => {
    window.print();
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
              className="inline-block align-middle max-w-xs w-full bg-[#8fa1e5] dark:bg-[#4b6de7] rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
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
                <div
                  className="my-3 text-center sm:my-5 overflow-x-auto "
                  ref={componentRef}
                >
                  <div className="flex justify-center flex-col  my-3 items-center">
                    <h3 className="text-3xl font-bold text-center  ">
                      Detalle Venta
                    </h3>
                    <h3 className="text-xl font-bold text-center   my-2 mb-4">
                      Aurobics Fitness Gym
                    </h3>
                  </div>

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
                          <td className="truncate max-w-xs">
                            {producto.nombre}
                          </td>
                          <td>{producto.precio_venta}</td>
                          {/**@ts-ignore */}
                          <th>{producto.cantidad}</th>
                          {}
                          <th>
                            {
                              /**@ts-ignore */
                              (producto.subtotal =
                                /**@ts-ignore */
                                producto.precio_venta! *
                                /**@ts-ignore */
                                producto.cantidad).toFixed(2)
                            }
                          </th>
                        </tr>
                      </tbody>
                    ))}
                  </table>

                  <p className="text-center text-lg">
                    {" "}
                    Subtotal $ {subtotal.toFixed(2)}
                  </p>
                  <p className="text-center text-lg">
                    {" "}
                    Total con Descuento Seleccionado: ${" "}
                    {totalDescuento.toFixed(2)}
                  </p>
                  <div className="flex justify-center flex-row  my-3 items-center">
                    <p className="text-lg font-bold text-center  ">
                      Recibido:{" "}
                    </p>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0.00"
                      className="input input-bordered ml-2 "
                      //value={pagoRecibido}
                      pattern="^\d+\.{0,1}\d{0,2}$"
                      onChange={(e) => {
                        setPagoRecibido(Number(e.target.value));
                      }}
                    />
                  </div>
                  <div className="flex justify-center flex-row  my-3 items-center">
                    <p className="text-lg font-bold text-center  ">
                      Cambio Entregado:{" "}
                    </p>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0.00"
                      className="input input-bordered ml-2 "
                      readOnly
                      value={cambio.toFixed(2)}
                    />
                  </div>
                  <button
                    className="btn btn-info m-2 print:hidden"
                    onClick={handlePrint}
                  >
                    Imprimir
                  </button>
                  <button
                    className="btn btn-info print:hidden"
                    onClick={agregarVenta}
                  >
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
