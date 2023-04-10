import { createServerClient } from "../../utils/supabase-server";
import InventoryModule from "./inventario";

export default async function Inventario() {
  const supabase = createServerClient();

  const { data: user } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = user.user?.id;

  let { data, error } = await supabase.rpc("es_empleado", {
    employee_id: userId,
  });

  if (error) console.error(error);
  else console.log(data);

  return (
    <div className=" p-8">
      <main className=" min-h-[100vh]">
        {data ? (
          <>
            <InventoryModule />
          </>
        ) : (
          <div>No eres un empleado</div>
        )}
      </main>
    </div>
  );
}
