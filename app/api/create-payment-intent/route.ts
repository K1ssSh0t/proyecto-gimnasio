import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  let data = await req.json();
  //const { amount } = data;
  console.log(data);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1N8BxjEe8nszRY3zmu7d5PkD",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.nextUrl.origin}/clientes`,
      cancel_url: `${req.nextUrl.origin}/`,
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
