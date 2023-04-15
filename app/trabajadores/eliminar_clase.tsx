"use client";

import { Database } from "@/types/supabase";
import { useSupabase } from "@/components/supabase-provider";

type Clase = Database["public"]["Tables"]["clase"]["Row"];

export default function EliminarClase({ claseId }: { claseId: number }) {
  const { supabase } = useSupabase();

  async function borrar(e: React.SyntheticEvent) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("clase")
      .delete()
      .eq("id", claseId);

    error ? console.log(error) : null;
  }

  return (
    <>
      <button onClick={borrar} className=" btn btn-error">
        Eliminar{" "}
      </button>
    </>
  );
}
