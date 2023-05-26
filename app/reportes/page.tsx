import * as React from "react";

import { createServerClient } from "../../utils/supabase-server";
import Grafica from "./graficaDePastel";
import { Database } from "@/types/supabase";
import TotalVentaMes from "./total_ventas";
import { VentasMembresias } from "./membresias_vendidas";
import { InscripcionesClases } from "./total_inscripciones_clases";
import { ProductosMenosVendidos } from "./productos_menos_vendidos";

type Venta = Database["public"]["Tables"]["venta"]["Row"];

type supabase = ReturnType<typeof createServerClient>;

export const revalidate = 0;

async function getMembresiasPorTipo(supabase: supabase) {
  let { data, error } = await supabase.rpc("obtener_membresias_por_tipo");

  if (error) console.error(error);
  else return data;
}

async function getInscripcionesPorClaset(supabase: supabase) {
  let { data, error } = await supabase
    .rpc("obtener_clases_inscripciones")
    .order("clase_id", { ascending: true });

  if (error) console.error(error);
  else return data;
}

async function getProductosMasVendidos(supabase: supabase) {
  let { data, error } = await supabase
    .rpc("obtener_productos_mas_vendidos")
    .order("producto_id", { ascending: true });

  if (error) console.error(error);
  else return data;
}

async function getProductosMenosVendidos(supabase: supabase) {
  let { data, error } = await supabase
    .rpc("obtener_productos_menos_vendidos")
    .order("producto_id", { ascending: true });

  if (error) console.error(error);
  else return data;
}

export default async function InterfazReportes() {
  const supabase = createServerClient();

  const { data: detalle_venta, error } = await supabase
    .from("detalle_venta")
    .select("*");

  const membresias = await getMembresiasPorTipo(supabase);

  const clases = await getInscripcionesPorClaset(supabase);

  const productos = await getProductosMasVendidos(supabase);

  const menos_productos = await getProductosMenosVendidos(supabase);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center md:grid md:grid-cols-2 gap-4 m-4 bg-[#daffff] ">
      <div className=" flex flex-col items-center justify-center ">
        <Grafica productos={productos || []} />
      </div>

      <div className="flex flex-col items-center justify-center  ">
        <ProductosMenosVendidos productos={menos_productos || []} />
      </div>

      <div className=" flex flex-col items-center justify-center">
        <VentasMembresias membresias={membresias || []} />
      </div>
      <div className=" flex flex-col items-center justify-center m-4">
        <InscripcionesClases clases={clases || []} />
      </div>
    </div>
  );
}
