"use client";

import { Database } from "@/types/supabase";
import { useSupabase } from "@/components/supabase-provider";

type Producto = Database["public"]["Tables"]["producto"]["Row"];

export const BorrarProducto = ({ producto }: { producto: Producto }) => {
  const { supabase } = useSupabase();

  const productoId = producto.id;

  async function borrar(e: React.SyntheticEvent) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("producto")
      .delete()
      .eq("id", productoId);

    error ? console.log(error) : null;
  }

  return (
    <>
      <button onClick={borrar} className=" btn btn-error">
        Eliminar{" "}
      </button>
    </>
  );
};
