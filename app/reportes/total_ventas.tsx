import React from "react";

type Venta = {
  id: number;
  total: number;
  id_empleado: string;
  id_cliente: string;
  fecha_venta: string;
};

function calcularTotalVentasEnMes(
  ventas: Venta[],
  mes: number,
  anio: number
): number {
  // Filtrar las ventas del mes y año especificados
  const ventasDelMes = ventas.filter((venta) => {
    const fechaVenta = new Date(venta.fecha_venta!);
    return (
      fechaVenta.getMonth() === mes - 1 && fechaVenta.getFullYear() === anio
    );
  });

  // Sumar los totales de las ventas del mes
  const totalVentas = ventasDelMes.reduce(
    (acumulado, venta) => acumulado + venta.total!,
    0
  );

  return totalVentas;
}

export default function TotalVentaMes({
  ventas,
  mes,
  anio,
}: {
  ventas: Venta[];
  mes: number;
  anio: number;
}) {
  const totalVentas = calcularTotalVentasEnMes(ventas, mes, anio);

  return (
    <div className=" overflow-x-auto">
      <table className=" table w-full">
        <thead>
          <tr>
            <th>Mes</th>
            <th>Anio</th>
            <th>Total Vendido</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`${mes}`}</td>
            <td>{`${anio}`}</td>
            <td>${totalVentas}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
