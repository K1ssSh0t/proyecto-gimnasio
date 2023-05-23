import * as React from "react";
import { createServerClient } from "../../utils/supabase-server";
import { InterfazIngresos } from "./interfazIngresos";

export const revalidate = 0;

async function getClientes(supabase: any) {
  let { data: clientes, error } = await supabase
    .from("clientes")
    .select("id,telefono");

  return clientes;
}

export default async function Ingreso() {
  const clientes = await getClientes(createServerClient());
  return (
    <div className="container flex flex-col items-center ">
      <InterfazIngresos clientes={clientes} />
    </div>
  );
}
