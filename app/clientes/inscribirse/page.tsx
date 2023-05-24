import * as React from "react";
import { createServerClient } from "@/utils/supabase-server";

import { Database } from "@/types/supabase";
import { ClasesDisponibles } from "./clasesDisponibles";

type supabase = ReturnType<typeof createServerClient>;

export const revalidate = 0;

async function getClases(supabase: supabase) {
  let { data: clase, error } = await supabase
    .from("clase")
    .select("*")
    .order("id");

  if (error) throw error;

  return clase;
}

async function getClasesInscritas(supabase: supabase) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userID = session?.user.id;

  let { data: inscripciones, error } = await supabase
    .from("clase")
    .select("*,inscripciones(*)")
    .eq("inscripciones.id_cliente", userID)
    .order("id");

  if (error) throw error;

  const ClasesInscritas = inscripciones!.filter((clase) => {
    const inscripciones = clase.inscripciones;
    return (
      inscripciones !== null &&
      (Array.isArray(inscripciones) ? inscripciones.length > 0 : true)
    );
  });

  return ClasesInscritas;
}

export default async function Membresia() {
  const supabase = createServerClient();

  const clases = await getClases(supabase);

  const inscripciones = await getClasesInscritas(supabase);

  return (
    <main>
      <div className=" flex justify-center items-center flex-col my-8 gap-4">
        <h2 className=" text-3xl  lg:text-5xl font-bold">
          Inscribirse a una clase
        </h2>
      </div>
      <ClasesDisponibles
        clases={clases || []}
        inscripciones={inscripciones || []}
      />
    </main>
  );
}
