import * as React from "react";

import { createServerClient } from "../../utils/supabase-server";
import Grafica from "./graficaDePastel";
import { Database } from "@/types/supabase";
import TotalVentaMes from "./total_ventas";

type Venta = Database["public"]["Tables"]["venta"]["Row"];

export const revalidate = 0;

async function getProductosVendidos(supabase: any) {
  const { data: producto, error } = await supabase
    .from("producto")
    .select("id,nombre")
    .order("id", { ascending: true });

  return producto;
}

async function getVentas(supabase: any) {
  let { data: venta, error } = await supabase.from("venta").select("*");

  return venta;
}

export default async function InterfazReportes() {
  const supabase = createServerClient();

  const { data: detalle_venta, error } = await supabase
    .from("detalle_venta")
    .select("*");

  const producto = await getProductosVendidos(supabase);
  const venta = await getVentas(supabase);

  return (
    <div className="container mx-auto grid grid-rows-2 gap-4">
      <div className=" flex flex-col items-center justify-center">
        <Grafica
          productosVendidos={detalle_venta || []}
          productos={producto || []}
        />
      </div>

      <div className="flex flex-col items-center justify-center  m-6">
        <h2 className="text-2xl m-4">Ventas del mes</h2>
        <TotalVentaMes mes={5} anio={2023} ventas={venta || []}></TotalVentaMes>
      </div>
    </div>
  );
}
