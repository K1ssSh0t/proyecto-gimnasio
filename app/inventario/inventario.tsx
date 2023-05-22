"use client";
import { useEffect, useState } from "react";
import { useSupabase } from "../../components/supabase-provider";
import { Database } from "../../types/supabase";
import { BorrarProducto } from "./borrar_producto";
import { Modal } from "./actualizar_producto";

import ReactPaginate from "react-paginate";

type Producto = Database["public"]["Tables"]["producto"]["Row"];

function InventoryModule({ listaProductos }: { listaProductos: Producto[] }) {
  const { supabase } = useSupabase();

  const [productos, setProductos] = useState(listaProductos);

  //
  const [currentPage, setCurrentPage] = useState(0);

  const [PER_PAGE, SET_PER_PAGE] = useState(5);
  //const PER_PAGE = 5;

  const options = [5, 10, 15];

  const offset = currentPage * PER_PAGE;
  const currentPageData = productos
    .slice(offset, offset + PER_PAGE)
    .map((producto, index) => (
      <tr key={index}>
        <td className="">{producto.id}</td>
        <td className="">{producto.nombre}</td>
        <td className="">{producto.costo}</td>
        <td className="">{producto.precio_venta}</td>
        <td className="">{producto.inventario_actual}</td>
        <td className=" flex space-x-4 justify-center">
          <BorrarProducto producto={producto} />
          <Modal producto={producto} key={producto.id} />
        </td>
      </tr>
    ));
  const pageCount = Math.ceil(productos.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }: { selected: number }) {
    setCurrentPage(selectedPage);
  }
  //
  const [productoInicial, setProductoInicial] = useState<
    Producto["inventario_incial"] | string
  >();

  const [productoCaducidad, setProductoCaducidad] = useState<
    Producto["feche_caducidad"] | string
  >();

  const [productoCosto, setProductoCosto] = useState<
    Producto["costo"] | string
  >();

  const [productoPrecio, setProductoPrcio] = useState<
    Producto["precio_venta"] | string
  >();

  const [productoActual, setProductoActual] = useState<
    Producto["inventario_actual"] | string
  >();

  const [productoNombre, setProductoNombre] = useState<
    Producto["nombre"] | string
  >();

  let currentDate = new Date().toJSON().slice(0, 10);

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
      costo: productoCosto as number,
      precio_venta: productoPrecio as number,
      feche_caducidad: productoCaducidad,
      inventario_incial: productoInicial as number,
      inventario_actual: productoActual,
      nombre: productoNombre,
    });

    console.log(error);
  };

  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-6">Módulo de Inventario</h1>
      <div className=" flex justify-center ">
        <form
          onSubmit={handleSummit}
          className=" lg:flex lg:flex-col w-full lg:max-w-3xl "
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Nombre</span>
            </label>

            <input
              className="input input-bordered w-full "
              id="producto-nombre"
              type="text"
              name="producto-nombre"
              value={productoNombre as string}
              onChange={(event) => setProductoNombre(event.target.value)}
              required
            />
            <label className="label">
              <span className="label-text">Producto Inicial</span>
            </label>

            <input
              className="input input-bordered w-full "
              id="producto-inicial"
              type="number"
              name="producto-inicial"
              value={productoInicial as number}
              onChange={(event) => setProductoInicial(event.target.value)}
              required
            />

            <label className="label">
              <span className="label-text">Caducidad</span>
            </label>
            <input
              className="input input-bordered w-full "
              id="product-description"
              name="description"
              type="date"
              value={productoCaducidad as string}
              min={currentDate}
              onChange={(event) => setProductoCaducidad(event.target.value)}
              required
            ></input>
            <label className="label">
              <span className="label-text">Costo</span>
            </label>
            <input
              className="input input-bordered w-full "
              id="product-costo"
              type="number"
              step="0.01"
              name="costo"
              value={productoCosto as number}
              onChange={(event) => setProductoCosto(event.target.value)}
              required
            />
            <label className="label">
              <span className="label-text">Precio</span>
            </label>
            <input
              className="input input-bordered w-full"
              id="producto-precio"
              type="number"
              step="0.01"
              name="precio"
              value={productoPrecio as number}
              onChange={(event) => setProductoPrcio(event.target.value)}
              required
            />
            <label className="label">
              <span className="label-text">Cantidad</span>
            </label>
            <input
              className="input input-bordered w-full"
              id="product-quantity"
              type="number"
              name="quantity"
              value={productoActual as string}
              onChange={(event) => setProductoActual(event.target.value)}
              required
            />
          </div>
          <div className=" flex justify-center mt-4">
            <button className="btn btn-info" type="submit">
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-between  mt-4 items-center">
        <h2 className="text-2xl font-bold mt-6 mb-2 self-start">
          Lista de Inventario
        </h2>
        <div className="form-control w-1/12 max-w-xs">
          <label className="label">
            <span className="label-text">Paginacion</span>
          </label>
          <select
            className="select select-ghost w-full max-w-xs"
            onChange={(e) => SET_PER_PAGE(parseInt(e.target.value))}
            defaultValue=""
          >
            <option disabled value="">
              Default
            </option>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className=" table  w-full">
          <thead>
            <tr className=" text-center [&>th]:capitalize [&>th]:text-lg ">
              <th style={{ position: "unset" }}>Product ID</th>
              <th className=" ">Nombre</th>
              <th className=" ">Costo</th>
              <th className=" ">Precio Venta</th>
              <th className=" ">Inventario Actual</th>
              <th className=" ">Acciones</th>
            </tr>
          </thead>
          <tbody>{currentPageData}</tbody>
        </table>
        <div className=" flex justify-center text-center">
          <ReactPaginate
            previousLabel={"← Anterior"}
            nextLabel={"Siguiente  →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            disabledClassName="btn-disabled "
            activeClassName="[&>a]:btn-active "
            pageLinkClassName="btn rounded-none"
            className=" btn-group "
            nextClassName="btn rounded-r-lg  "
            previousClassName=" btn rounded-l-lg "
            nextLinkClassName="link link-hover"
            previousLinkClassName="link link-hover "
          />
        </div>
      </div>
    </div>
  );
}

export default InventoryModule;
