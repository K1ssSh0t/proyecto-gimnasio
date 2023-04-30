import * as React from "react";
import { Database } from "@/types/supabase";

type Membresia = Database["public"]["Tables"]["membresia"]["Row"];

export interface IMiMembresiaProps {}

export function MiMembresia({ membresia }: { membresia: Membresia }) {
  return (
    <div className=" flex justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Membresia Actual</h2>
          <p>{membresia.estado_membresia}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
