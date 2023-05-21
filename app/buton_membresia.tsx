"use client";
import * as React from "react";
import { Database } from "@/types/supabase";
import { useSupabase } from "@/components/supabase-provider";
import { useRouter } from "next/navigation";

type Membresias = Database["public"]["Tables"]["tipo_membresia"]["Row"];

//TODO : Agregar direccionamineto para crearse una cuenta si no hay una session
export function MembresiaButton({ membresia }: { membresia: Membresias }) {
  const { supabase, session } = useSupabase();
  const router = useRouter();

  const correo = session?.user?.email;
  const handleSubscripscion = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3000/api/create-payment-intent", {
        method: "POST",
        body: JSON.stringify(membresia),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        if (response.status == 401) {
          return router.push("/login");
        }
        if (response.status == 403) {
          //toast ya tinees una membresia
          console.error("ya tienes una membresia");
          return router.push("/clientes");
        }
        response.json().then((data) => {
          console.log(data);
          window.open(data.url, "_blank");
        });
      });

      // const result = await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="btn btn-info" onClick={handleSubscripscion}>
      Inscribirse
    </button>
  );
}
