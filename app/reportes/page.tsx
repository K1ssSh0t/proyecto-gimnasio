"use client";
import * as React from "react";
import { useRef, useEffect, useState } from "react";

//import { createServerClient } from "../../utils/supabase-server";
import { createBrowserClient } from "@/utils/supabase-browser";
import Grafica from "./graficaDePastel";
import { Database } from "@/types/supabase";
import TotalVentaMes from "./total_ventas";
import { VentasMembresias } from "./membresias_vendidas";
import { InscripcionesClases } from "./total_inscripciones_clases";
import { ProductosMenosVendidos } from "./productos_menos_vendidos";

import { useReactToPrint } from "react-to-print";

type Venta = Database["public"]["Tables"]["venta"]["Row"];

type supabase = ReturnType<typeof createBrowserClient>;

type Membresia =
  Database["public"]["Functions"]["obtener_membresias_por_tipo"]["Returns"];

type Clases =
  Database["public"]["Functions"]["obtener_clases_inscripciones"]["Returns"];

type Productos =
  Database["public"]["Functions"]["obtener_productos_mas_vendidos"]["Returns"];

type menos_productos =
  Database["public"]["Functions"]["obtener_productos_menos_vendidos"]["Returns"];

export const revalidate = 0;

export default function InterfazReportes() {
  const supabase = createBrowserClient();

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Reporte de Ventas",
    onAfterPrint: () => alert("Reporte generado"),
  });

  const [isLoading, setLoading] = useState(false);

  const [membresias, setMembresias] = React.useState<
    Membresia | undefined | null
  >();
  const [productos, setProductos] = React.useState<
    Productos | undefined | null
  >();
  const [clases, setClases] = React.useState<Clases | undefined | null>();
  const [menos_productos, setMenosProductos] = React.useState<
    menos_productos | undefined | null
  >();

  const [mes, setMes] = useState(new Date().getMonth() + 1);

  const [anio, setAnio] = useState(new Date().getFullYear());

  async function getMembresiasPorTipo() {
    let { data, error } = await supabase.rpc(
      "obtener_membresias_por_tipo_mes_anio",
      { anio, mes }
    );

    if (error) console.error(error);
    else return data;
  }

  async function getInscripcionesPorClase() {
    let { data, error } = await supabase
      .rpc("obtener_clases_inscripciones")
      .order("cantidad", { ascending: false });

    if (error) console.error(error);
    else return data;
  }

  async function getProductosMasVendidos() {
    let { data, error } = await supabase.rpc("obtener_productos_mas_vendidos", {
      anio,
      mes,
    });
    //.order("cantidad_vendida", { ascending: false });

    if (error) console.error(error);
    else return data;
  }

  async function getProductosMenosVendidos() {
    let { data, error } = await supabase.rpc(
      "obtener_productos_menos_vendidos",
      { anio, mes }
    );
    //.order("cantidad_vendida", { ascending: false });

    if (error) console.error(error);
    else return data;
  }

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setMembresias(await getMembresiasPorTipo());
      setClases(await getInscripcionesPorClase());
      setProductos(await getProductosMasVendidos());
      setMenosProductos(await getProductosMenosVendidos());
      setLoading(false);
    };

    fetchData().catch(console.error);
  }, [, mes, anio]);

  if (isLoading)
    return (
      <div className=" flex flex-col items-center justify-center m-4">
        <p>Cargando...</p>
      </div>
    );
  return (
    <>
      <div className="flex flex-row items-center justify-center my-4 ">
        <select
          className="select w-full max-w-[140px] mx-2 "
          placeholder="Selecciona el Mes"
          onChange={(e) => setMes(parseInt(e.target.value))}
          defaultValue={mes}
        >
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
        <select
          className="select w-full max-w-[100px] mx-2 "
          placeholder="Selecciona el Año"
          onChange={(e) => setAnio(parseInt(e.target.value))}
          defaultValue={anio}
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
      <div
        className="container mx-auto flex flex-col justify-center items-center md:grid md:grid-cols-2 gap-4 m-4 bg-white "
        ref={componentRef}
      >
        <div className=" flex flex-col items-center justify-center ">
          <Grafica productos={productos || []} />
        </div>

        <div className="flex flex-col items-center justify-center  ">
          <ProductosMenosVendidos productos={menos_productos || []} />
        </div>

        <div className=" flex flex-col items-center justify-center lg:w-[600px] lg:h-[400px]">
          <VentasMembresias membresias={membresias || []} />
        </div>
        <div className=" flex flex-col items-center justify-center m-4">
          <InscripcionesClases clases={clases || []} />
        </div>
      </div>
      <div className="flex items-center justify-center m-4 bg-white">
        <button onClick={handlePrint} className="btn btn-info">
          Imprimir Reporte
        </button>
      </div>
    </>
  );
}
