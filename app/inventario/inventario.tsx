"use client";
import { useEffect, useState } from "react";
import { useSupabase } from "../../components/supabase-provider";
import { Database } from "../../types/supabase";

/**TODO: Arreglar este componente para que funcione con supabase */

type Producto = Database["public"]["Tables"]["producto"]["Row"];

function InventoryModule({ listaProductos }: { listaProductos: Producto[] }) {
  const { supabase } = useSupabase();

  const [productos, setProductos] = useState(listaProductos);

  const [productoInicial, setProductoInicial] =
    useState<Producto["inventario_incial"]>();

  const [productoCaducidad, setProductoCaducidad] =
    useState<Producto["feche_caducidad"]>();

  const [productoCosto, setProductoCosto] = useState<Producto["costo"]>();

  const [productoPrecio, setProductoPrcio] =
    useState<Producto["precio_venta"]>();

  const [productoActual, setProductoActual] =
    useState<Producto["inventario_actual"]>();

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

  const handleSummit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("producto").insert({
      costo: productoCosto,
      precio_venta: productoPrecio,
      feche_caducidad: productoCaducidad,
      inventario_incial: productoInicial,
      inventario_actual: productoActual,
    });

    console.log(error);
  };

  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      <div className=" flex justify-center ">
        <form
          onSubmit={handleSummit}
          className=" lg:flex lg:flex-col w-full lg:max-w-3xl "
        >
          <div className="mb-4 w-full">
            <label className="block  font-bold mb-2" htmlFor="product-name">
              Producto Inicial
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="product-name"
              type="number"
              name="name"
              value={productoInicial}
              onChange={(event) => setProductoInicial(event.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <label
              className="block  font-bold mb-2"
              htmlFor="product-description"
            >
              Product caducidad
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="product-description"
              name="description"
              type="date"
              value={productoCaducidad}
              onChange={(event) => setProductoCaducidad(event.target.value)}
            ></input>
          </div>
          <div className="mb-4 w-full">
            <label className="block  font-bold mb-2" htmlFor="product-price">
              Product Costo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="product-price"
              type="number"
              step="0.01"
              name="price"
              value={productoCosto}
              onChange={(event) => setProductoCosto(event.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block  font-bold mb-2" htmlFor="product-price">
              Product Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="product-price"
              type="number"
              step="0.01"
              name="price"
              value={productoPrecio}
              onChange={(event) => setProductoPrcio(event.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block font-bold mb-2" htmlFor="product-quantity">
              Product Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="product-quantity"
              type="number"
              name="quantity"
              value={productoActual}
              onChange={(event) => setProductoActual(event.target.value)}
            />
          </div>
          <div className=" flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-2">Inventory List</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product ID</th>
              <th>Costo</th>
              <th>Precio Venta</th>
              <th>Inventario Actual</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{producto.id}</td>
                <td>{producto.costo}</td>
                <td>{producto.precio_venta}</td>
                <td>{producto.inventario_actual}</td>
                <td className="">
                  <button className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                  <button className=" text-red-500 hover:text-red-700 pl-3">
                    Actualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryModule;
