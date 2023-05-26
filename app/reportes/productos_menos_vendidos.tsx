"use client";
import * as React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

type Productos =
  | {
      producto_id: number;
      producto_nombre: string;
      cantidad_vendida: number;
    }[]
  | null;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Productos Menos Vendidos",
    },
  },
};

export function ProductosMenosVendidos({
  productos,
}: {
  productos: Productos;
}) {
  const nombres = productos!.map((producto) => producto.producto_nombre);
  const totalProductos = productos?.map(
    (producto) => producto.cantidad_vendida
  );
  const data = {
    labels: nombres,
    datasets: [
      {
        label: "Cantidad Vendida",
        data: totalProductos,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
