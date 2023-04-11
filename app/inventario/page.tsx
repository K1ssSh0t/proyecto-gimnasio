import { createServerClient } from "../../utils/supabase-server";
import InventoryModule from "./inventario";

export const revalidate = 0;

export default async function Inventario() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: producto, error } = await supabase.from("producto").select("*");

  return (
    <div className=" p-8">
      <main className=" min-h-[100vh]">
        {session ? (
          <>
            <InventoryModule listaProductos={producto || []} />
          </>
        ) : (
          <div>No eres un empleado</div>
        )}
      </main>
    </div>
  );
}
