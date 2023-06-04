"use client";
import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type data =
  | {
      tipo_membresia_nombre: string;
      cantidad: number;
    }[]
  | null;

export function VentasMembresias({ membresias }: { membresias: data }) {
  function obtenerCantidadPorTipoMembresia(arr: data) {
    const tiposMembresia = [
      "Membresía PRO",
      "Membresía Intermedia",
      "Membresía Básica",
    ];
    const cantidadPorTipoMembresia = [0, 0, 0];

    arr!.forEach((elemento) => {
      const index = tiposMembresia.indexOf(elemento.tipo_membresia_nombre);
      if (index !== -1) {
        cantidadPorTipoMembresia[index] = elemento.cantidad;
      }
    });

    return cantidadPorTipoMembresia;
  }

  const resultado = obtenerCantidadPorTipoMembresia(membresias);
  const data = {
    labels: ["PRO", "Intermedia", "Básica"],
    datasets: [
      {
        label: "Cantidad de ventas",
        data: resultado,
        backgroundColor: [
          " rgb(255, 99, 132,0.2)",
          "rgb(128, 0, 128,0.2)",
          "  rgb(34, 139, 34,0.2)",
          "rgb(255, 165, 0,0.2)",
          "rgb(128, 0, 128,0.2)",
          "rgb(255, 255, 0,0.2)",
          "rgb(0, 255, 0,0.2)",
          "rgb(128, 128, 128,0.2)",
          "rgb(0, 0, 255,0.2)",
          "rgb(255, 0, 0,0.2)",
        ],
        borderColor: [
          " rgb(255, 99, 132,1)",
          "rgb(128, 0, 128,1)",
          "  rgb(34, 139, 34,1)",
          "rgb(255, 165, 0,1)",

          "rgb(255, 255, 0,1)",

          "rgb(0, 0, 255,1)",
          "rgb(255, 0, 0,)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
