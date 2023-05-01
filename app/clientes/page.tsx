import { createServerClient } from "../../utils/supabase-server";
import { MiMembresia } from "./miMembresia";
import MisDatos from "./misdatos";

export const revalidate = 0;

async function getMembresia(supabase: any, userId: string | undefined) {
  let { data: membresia, error } = await supabase
    .from("membresia")
    .select("*")
    .eq("id_cliente", userId);
  return membresia[0];
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

  return session ? (
    <main>
      <div className=" text-lg text-center flex flex-col w-full ">
        <MisDatos cliente={cliente} />
        <div className="divider w-4/5 self-center"></div>

        <MiMembresia membresia={membresia} />
      </div>
    </main>
  ) : (
    <div></div>
  );
}
