import { createServerClient } from "../../utils/supabase-server";
import { MiMembresia } from "./miMembresia";
import MisDatos from "./misdatos";
import Stripe from "stripe";

export const revalidate = 0;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

async function getMembresia(supabase: any, userId: string | undefined) {
  let { data: membresia, error } = await supabase
    .from("membresia")
    .select("*")
    .eq("id_cliente", userId);
  return membresia[0];
}

const agregarMemrbreia = async (
  supabase: any,
  userId: string,
  sessionId: string,
  membresia_tipo: string
) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  let currentDate = new Date().toJSON().slice(0, 10);

  if (session && session.status == "complete") {
    const { data, error } = await supabase
      .from("membresia")
      .insert([
        {
          estado_membresia: "activa",
          fecha_activacion: currentDate,
          id_cliente: userId,
          id_tipo_membresia: membresia_tipo,
        },
      ])
      .select()
      .single();

    return { data };
  }
  throw new Error("You should not be able to access this page");
};
export default async function Clientes({
  searchParams,
}: {
  searchParams: {
    session_id?: string;
    success?: boolean;
    cancelled?: boolean;
    membresia_tipo?: string;
  };
}) {
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

  if (searchParams.session_id == undefined) {
    if (membresia == null) {
      return (
        <main>
          <div className=" text-lg text-center flex flex-col w-full ">
            <MisDatos cliente={cliente} />
            <div className="divider w-4/5 self-center"></div>

            <h3>No tienes una membresia activa</h3>
          </div>
        </main>
      );
    }
    return (
      <main>
        <div className=" text-lg text-center flex flex-col w-full ">
          <MisDatos cliente={cliente} />
          <div className="divider w-4/5 self-center"></div>

          <MiMembresia membresia={membresia} />
        </div>
      </main>
    );
  }

  if (searchParams.success) {
    const session_id = searchParams.session_id;

    if (!session_id) throw new Error("No se encontro session_id");

    const membreias_tipo = searchParams.membresia_tipo;

    const { data } = await agregarMemrbreia(
      supabase,
      userId!,
      session_id,
      membreias_tipo!
    );

    return (
      <main>
        <div className=" text-lg text-center flex flex-col w-full ">
          <MisDatos cliente={cliente} />
          <div className="divider w-4/5 self-center"></div>

          <MiMembresia membresia={data} />
        </div>
      </main>
    );
  }
}
