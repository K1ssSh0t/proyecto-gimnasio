"use client";
import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Database } from "@/types/supabase";

type Detalle_Venta = Database["public"]["Tables"]["detalle_venta"]["Row"];
type Productos = Database["public"]["Tables"]["producto"]["Row"];

ChartJS.register(ArcElement, Tooltip, Legend);

function calcularTotalProductos(detalleVenta: Detalle_Venta[]): number[] {
  const totalProductos: { [id: number]: number } = {};

  for (const detalle of detalleVenta) {
    if (detalle.id_producto !== null) {
      if (detalle.id_producto in totalProductos) {
        totalProductos[detalle.id_producto]++;
      } else {
        totalProductos[detalle.id_producto] = 1;
      }
    }
  }

  const sortedIds = Object.keys(totalProductos)
    .map(Number)
    .sort((a, b) => a - b);

  const resultados: number[] = [];

  for (const id of sortedIds) {
    resultados.push(totalProductos[id] || 0);
  }

  return resultados;
}
export default function Grafica({
  productosVendidos,
  productos,
}: {
  productosVendidos: Detalle_Venta[];
  productos: Productos[];
}) {
  const nombres = productos.map((producto) => producto.nombre);
  console.log(nombres);
  const totalProductos = calcularTotalProductos(productosVendidos);
  console.log(totalProductos);

  const data = {
    labels: nombres,
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
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
      <Doughnut data={data} />;
    </div>
  );
}
