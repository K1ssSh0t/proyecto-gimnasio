import { createServerClient } from "../../utils/supabase-server";
import ClasesLista from "./clases";
import EmpleadosLista from "./empleados";

import { Database } from "@/types/supabase";

type db = Database["public"];

export const revalidate = 0;

async function getEmpleados(supabase: any) {
  const { data: empleados, error } = await supabase
    .from("empleados")
    .select("*");

  return empleados;
}

async function getClases(supabase: any) {
  const { data: clase, error } = await supabase.from("clase").select("*");
  return clase;
}

export default async function Empleados() {
  const supabase = createServerClient();

  const empleados = await getEmpleados(supabase);

  const clases = await getClases(supabase);

  return (
    <main>
      <div className=" text-lg text-center text-purple-600">Empleados</div>
      <div className=" ">
        <EmpleadosLista empleados={empleados || []} />
        <ClasesLista clases={clases || []} />
      </div>
    </main>
  );
}
