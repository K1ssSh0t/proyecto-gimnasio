import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@/utils/supabase-server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

export const revalidate = 0;

export async function POST(req: NextRequest) {
  let data = await req.json();

  const { stripe_id, id } = data;

  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const correo_cliente = session?.user.email;

  let { data: membresia, error } = await supabase
    .from("membresia")
    .select("*")
    .eq("id_cliente", session?.user.id);

  if (membresia!.length > 0) {
    return NextResponse.json(
      { error: "Ya tienes una membresia" },
      { status: 403 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: stripe_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.nextUrl.origin}/clientes?success=true&session_id={CHECKOUT_SESSION_ID}&membresia_tipo=${id}`,
      cancel_url: `${req.nextUrl.origin}/clientes?canceled=true`,
      customer_email: correo_cliente,
    });
    const loginUrl = new URL(session.url!, req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    //  return NextResponse.redirect(loginUrl)
    return NextResponse.json(session);
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
