import { createServerClient } from "../../utils/supabase-server";
import InterfazVentas from "./interfazVentas";

export const revalidate = 0;

async function getProductosNombre(supabase: any) {
  let { data: producto, error } = await supabase.from("producto").select("*");
  return producto;
}

async function getClientes(supabase: any) {
  let { data: clientes, error } = await supabase
    .from("clientes")
    .select("telefono,id");

  return clientes;
}

export default async function SalesModule() {
  const supabase = createServerClient();

  const Productos = await getProductosNombre(supabase);

  const correos = await getClientes(supabase);

  return (
    <div className="container mx-auto">
      <InterfazVentas productos={Productos} correos={correos} />
    </div>
  );
}
