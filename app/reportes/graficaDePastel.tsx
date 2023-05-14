"use client";
import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Database } from "@/types/supabase";

type Detalle_Venta = Database["public"]["Tables"]["detalle_venta"]["Row"];
type Productos = Database["public"]["Tables"]["producto"]["Row"];

ChartJS.register(ArcElement, Tooltip, Legend);

function obtenerTotalVentasPorProducto(
  detalleVentas: Detalle_Venta[],
  productos: Productos[]
): number[] {
  const totalVentas: number[] = [];

  // Inicializar el arreglo con ceros para cada producto
  for (const producto of productos) {
    totalVentas[producto.id] = 0;
  }

  // Calcular el total de ventas por producto
  for (const detalleVenta of detalleVentas) {
    if (detalleVenta.id_producto !== null) {
      totalVentas[detalleVenta.id_producto] += 1;
    }
  }

  // Eliminar elementos vacíos y convertir a números
  return totalVentas
    .filter((item) => item !== undefined && item !== null)
    .map(Number);
}

export default function Grafica({
  productosVendidos,
  productos,
}: {
  productosVendidos: Detalle_Venta[];
  productos: Productos[];
}) {
  const nombres = productos.map((producto) => producto.nombre);
  const totalProductos = obtenerTotalVentasPorProducto(
    productosVendidos,
    productos
  );

  const data = {
    labels: nombres,
    datasets: [
      {
        label: "Cantidad de ventas",
        data: totalProductos,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      {" "}
      <Doughnut data={data} />
    </div>
  );
}
