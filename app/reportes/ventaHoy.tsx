import * as React from "react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

type Ventas =
  | {
      nombre_producto: string;
      cantidad_vendida: number;
      subtotal: number;
    }[]
  | null;

export function VentasHoy({ ventas }: { ventas: Ventas }) {
  const [isOpen, setIsOpen] = useState(false);

  let currentDate = new Date().toJSON().slice(0, 10);

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Reporte de Ventas",
    onAfterPrint: () => alert("Reporte generado"),
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function calcularTotalSubtotales(): number {
    if (ventas === null || ventas.length === 0) {
      return 0;
    }

    return ventas.reduce((total, venta) => total + venta.subtotal, 0);
  }
  return (
    <div>
      <button onClick={openModal} className="btn btn-info">
        Venta de Hoy
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
                <div className="my-3 text-center sm:my-5" ref={componentRef}>
                  <div className="flex justify-center flex-col  my-3 items-center">
                    <h3 className="text-3xl font-bold text-center  ">
                      Ventas de Hoy
                    </h3>
                    <h3 className="text-xl font-bold text-center   my-2 mb-4">
                      {currentDate}
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ventas?.map((venta, index) => (
                          <tr key={index}>
                            <td>{venta.nombre_producto}</td>
                            <td>{venta.cantidad_vendida}</td>
                            <td>$ {venta.subtotal.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <h2 className="text-xl font-bold text-center   my-2 mb-4">
                    Total: $ {calcularTotalSubtotales().toFixed(2)}
                  </h2>
                  <div className="flex items-center justify-center m-4 print:hidden">
                    <button onClick={handlePrint} className="btn btn-info">
                      Imprimir Reporte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
