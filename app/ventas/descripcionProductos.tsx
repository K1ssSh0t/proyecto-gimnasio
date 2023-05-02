import * as React from "react";
import { Database } from "@/types/supabase";

type Producto = Database["public"]["Tables"]["producto"]["Row"];

export function DescribcionProductos({
  producto,
  index,
}: {
  producto: Producto;
  index: number;
}) {
  return (
    <>
      <tbody>
        <tr>
          <th>{index}</th>
          <td>{producto.nombre}</td>
          <td>{producto.precio_venta}</td>

          <th>
            <label>
              <input type="radio" name="radio-1" className="radio" />
            </label>
          </th>
        </tr>
      </tbody>
    </>
  );
}
