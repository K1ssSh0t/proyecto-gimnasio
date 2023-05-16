import { createServerClient } from "../utils/supabase-server";
import { Membresias } from "./membresiasDatos";
import { Clases } from "./clasesDatos";

export const revalidate = 0;

async function getMembresias(supabase: any) {
  let { data: tipo_membresia, error } = await supabase
    .from("tipo_membresia")
    .select("*");

  return tipo_membresia;
}

async function getClases(supabase: any) {
  let { data: clase, error } = await supabase.from("clase").select("*");

  return clase;
}

export default async function Home() {
  const supabase = createServerClient();
  const membresias = await getMembresias(supabase);
  const clases = await getClases(supabase);
  return (
    <main>
      <div className=" text-lg text-center flex flex-col w-full ">
        <Membresias membresias={membresias} />
        <div className="divider w-4/5 self-center"></div>
        <Clases clases={clases} />
      </div>
    </main>
  );
}
