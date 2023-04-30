import { createServerClient } from "../../utils/supabase-server";
import { MiMembresia } from "./miMembresia";
import MisDatos from "./misdatos";

async function getMembresia(supabase: any, userId: string | undefined) {
  let { data: membresia, error } = await supabase
    .from("membresia")
    .select("*")
    .eq("id_cliente", userId);
  return membresia;
}
export default async function Clientes() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user.id;

  const { data: clientes, error } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", userId);

  const cliente = clientes![0];

  const membresia = await getMembresia(supabase, userId);

  return (
    <main>
      <div className=" text-lg text-center text-purple-600">
        <MisDatos cliente={cliente} />
        <MiMembresia membresia={membresia} />
      </div>
    </main>
  );
}
