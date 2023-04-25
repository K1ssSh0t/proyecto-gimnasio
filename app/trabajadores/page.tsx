import { createServerClient } from "../../utils/supabase-server";
import ClasesLista from "./clases";
import EmpleadosLista from "./empleados";

import { Database } from "@/types/supabase";

type Empleado = Database["public"]["Tables"]["empleados"]["Row"];

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

  const listaIdsEmpleados: (string | null)[] = empleados.map(
    (empleado: Empleado) => empleado.id
  );

  return (
    <main>
      <div className=" text-3xl text-center font-bold">Modulo de Empleados</div>
      <div className=" ">
        <EmpleadosLista empleadosLista={empleados || []} />
        <ClasesLista
          clasesLista={clases || []}
          listaIdsEmpleados={listaIdsEmpleados}
        />
      </div>
    </main>
  );
}
