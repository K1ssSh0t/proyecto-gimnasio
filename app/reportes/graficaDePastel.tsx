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
      id_producto: number;
      nombre: string;
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
      text: "Productos Más Vendidos",
    },
  },
};

export default function Grafica({ productos }: { productos: Productos }) {
  const nombres = productos!.map((producto) => producto.nombre);
  const totalProductos = productos?.map(
    (producto) => producto.cantidad_vendida
  );

  const data = {
    labels: nombres,
    datasets: [
      {
        label: "Cantidad Vendida",
        data: totalProductos,
        borderColor: "rgb(30,144,255)",
        backgroundColor: "rgb(30,144,255,0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
