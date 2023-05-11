import * as React from "react";

import { createServerClient } from "../../utils/supabase-server";
import Grafica from "./graficaDePastel";

export const revalidate = 0;

async function getProductosVendidos(supabase: any) {
  const { data: producto, error } = await supabase
    .from("producto")
    .select("id,nombre")
    .order("id", { ascending: true });

  return producto;
}

export default async function InterfazReportes() {
  const supabase = createServerClient();

  const { data: detalle_venta, error } = await supabase
    .from("detalle_venta")
    .select("*");

  const producto = await getProductosVendidos(supabase);

  return (
    <div className="container mx-auto">
      <Grafica
        productosVendidos={detalle_venta || []}
        productos={producto || []}
      />
    </div>
  );
}
