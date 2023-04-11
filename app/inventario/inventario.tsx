"use client";
import { useEffect, useState } from "react";
import { useSupabase } from "../../components/supabase-provider";
import { Database } from "../../types/supabase";

/**TODO: Arreglar este componente para que funcione con supabase */

type Producto = Database["public"]["Tables"]["producto"]["Row"];

function InventoryModule({ listaProductos }: { listaProductos: Producto[] }) {
  const { supabase } = useSupabase();

  const [productos, setProductos] = useState(listaProductos);

  useEffect(() => {
    setProductos(productos);
  }, [productos]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "producto" },
        (payload) =>
          setProductos((productos) => [...productos, payload.new as Producto])
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "producto" },
        (payload) =>
          setProductos(
            productos.filter((producto) => producto.id !== payload.old.id)
          )
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "producto" },
        (payload) =>
          setProductos(
            productos.map((producto) =>
              producto.id === payload.new.id
                ? { ...producto, ...payload.new }
                : producto
            )
          )
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setProductos, productos]);

  /**                   */

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      <form
      //onSubmit={}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="product-name"
          >
            Product Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-name"
            type="text"
            name="name"
            // value={newProduct.name}
            // onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-description"
            name="description"
            ///   value={newProduct.description}
            //  onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="product-price"
          >
            Product Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-price"
            type="number"
            step="0.01"
            name="price"
            // value={newProduct.price}
            //  onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="product-quantity"
          >
            Product Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-quantity"
            type="number"
            name="quantity"
            //   value={newProduct.quantity}
            //  onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Product
        </button>
      </form>
      <h2 className="text-2xl font-bold mt-6 mb-2">Inventory List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">Costo</th>
            <th className="px-4 py-2">Precio Venta</th>
            <th className="px-4 py-2">Inventario Actual</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{producto.id}</td>
              <td className="border px-4 py-2">{producto.costo}</td>
              <td className="border px-4 py-2">{producto.precio_venta}</td>
              <td className="border px-4 py-2">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="quantity"
                  // value={product.quantity}
                  // onChange={(e) => handleInventoryUpdate(index, e.target.value)}
                />
              </td>
              <td className="border px-4 py-2">
                <button className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryModule;
