"use client";
import * as React from "react";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { DescribcionProductos } from "./descripcionProductos";
import { useSupabase } from "../../components/supabase-provider";
import { useRouter } from "next/navigation";

type Producto = Database["public"]["Tables"]["producto"]["Row"];

type Venta = Database["public"]["Tables"]["venta"]["Row"];

type Correos = {
  email: string | undefined;
  id: string | undefined;
};

export default function InterfazVentas({
  productos,
  correos,
}: {
  productos: Producto[];
  correos: Correos[];
}) {
  const [nombreBusqueda, setNombreBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>();
  const [cantidad, setCantidad] = useState(0);
  const [productosAgregados, setProductosAgregados] = useState<Producto[]>([]);
  const [total, setTotal] = useState(0);
  const [clienteID, setClienteID] = useState<string>();
  const [correoCliente, setCorreoCliente] = useState<string>();
  const { supabase, session } = useSupabase();
  const [descuento, setDescuento] = useState(0);
  const [totalDescuento, setTotalDescuento] = useState(0);
  //  TODO: Hacer que el descuento sea de acuerdo a la memebresia del cliente
  // TODO: Hacer que te mande a una nueva interfaz de venta cuando se haga el pago donde se muestren el detalle venta
  const router = useRouter();

  const [idVenta, setIdVenta] = useState<number>();

  const empleadoID = session?.user?.id;

  let currentDate = new Date().toJSON().slice(0, 10);

  const calcularDescuento = async () => {
    let totalDescuento = (total * descuento) / 100;

    return total - totalDescuento;
  };

  // Funcion que calcula el descuento sobre el total de la venta, si se ha seleccionado un descuento

  useEffect(() => {
    let cantidadDescuento = (total * descuento) / 100;
    //setTotalDescuento(total - totalDescuento);
    console.log(cantidadDescuento);

    setTotalDescuento(total - cantidadDescuento);

    console.log(totalDescuento);
  }, [descuento]);

  React.useEffect(() => {
    let cantidadDescuento = (total * descuento) / 100;
    //setTotalDescuento(total - totalDescuento);
    console.log(cantidadDescuento);

    if (cantidadDescuento != 0) {
      setTotalDescuento(total - cantidadDescuento);
    }
    setTotalDescuento(total);

    console.log(totalDescuento);
  }, [total]);

  //Funcion que saca el id del cliente segun el correo seleccionado
  useEffect(() => {
    const encontrar = async () => {
      const encontrado = correos.find(
        (correo) => correo.email === correoCliente
      );
      setClienteID(encontrado?.id);
    };
    encontrar();
    //  console.log(clienteID);
  }, [correoCliente]);

  // Funcion que genera los detalles de venta cuando se ha creado una nueva venta
  useEffect(() => {
    const generarDetallesdeVentas = async () => {
      productosAgregados.map(async (producto) => {
        /** @ts-ignore  */
        let subtotal = producto.precio_venta * producto.cantidad;
        const { data, error } = await supabase.from("detalle_venta").insert([
          {
            /** @ts-ignore  */
            cantidad: producto.cantidad as number,
            subtotal: subtotal as number,
            id_venta: idVenta as number,
            id_producto: producto.id as number,
          },
        ]);
      });
    };

    generarDetallesdeVentas();
    setTotal(0);
    setProductosAgregados([]);
    setCorreoCliente("");
    setCantidad(0);
    router.refresh();
  }, [idVenta]);

  // Funcion que genera la venta en la base de datos
  // y asigna el id de la venta a la variable idVenta para que se pueda generar los detalles de la venta
  const agregarVenta = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const generarVenta = async () => {
      if (clienteID != undefined && total != 0 && empleadoID != undefined) {
        const { data, error } = await supabase
          .from("venta")
          .insert([
            {
              fecha_venta: currentDate,
              id_cliente: clienteID,
              total: totalDescuento,
              id_empleado: empleadoID,
            },
          ])
          .select();

        return data;
      }
    };

    const ventaGenerada = await generarVenta();

    setIdVenta(ventaGenerada![0].id);
    /* if (clienteID != undefined && total != 0 && empleadoID != undefined) {
      const { data, error } = await supabase
        .from("venta")
        .insert([
          {
            fecha_venta: currentDate,
            id_cliente: clienteID,
            total: totalDescuento,
            id_empleado: empleadoID,
          },
        ])
        .select();

      if (data != null) {
        setIdVenta(data[0].id);
      }
      console.log(error);
    }*/
  };

  const handleCorreoCliente = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const correo = (e.target as HTMLInputElement).value;
    setCorreoCliente(correo);
    const encontrado = correos.find((correo) => correo.email === correoCliente);
    setClienteID(encontrado?.id);
  };

  // Funcion que calcula el total
  function calcularTotal(productosAgregados: Producto[]) {
    let total = 0;

    productosAgregados.forEach((producto) => {
      /** @ts-ignore  */
      total += producto.precio_venta! * producto.cantidad;
    });

    return total;
  }

  // Funcion que calcula el total cada vez que se agrega un producto a la lista de productos agregados
  React.useEffect(() => {
    setTotal(calcularTotal(productosAgregados));
  }, [productosAgregados]);

  // Funcion que se encarga de agregar un producto a la lista de productos agregados
  // asegurandose que hay un producto seleccionado y que la cantidad es mayor a 0
  // y que si el producto ya se encuentra agregado la suma la cantidad que selecciono
  const handleArgregarProducto = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (productoSeleccionado != null && cantidad > 0) {
      const index = productosAgregados.findIndex(
        (producto) => producto === productoSeleccionado
      );

      if (index !== -1) {
        /** @ts-ignore */
        productosAgregados[index].cantidad += cantidad;
        setProductosAgregados([...productosAgregados]);
      } else {
        /** @ts-ignore */
        productoSeleccionado.cantidad = cantidad;
        setProductosAgregados([...productosAgregados, productoSeleccionado]);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center pt-4">
        <div className="form-control">
          <div className="input-group">
            <label>
              <input
                type="text"
                placeholder="Buscar producto…"
                className="input input-bordered"
                list="productos"
                value={nombreBusqueda}
                onChange={(e) => setNombreBusqueda(e.target.value)}
              />
              <datalist id="productos">
                {productos.map((producto, index) => (
                  <option value={producto.nombre!} key={index} />
                ))}
              </datalist>
            </label>
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-1 gap-4 mt-12 lg:grid-cols-3 mx-4">
        <div className=" flex flex-col w-full items-center justify-start overflow-x-auto border-solid border-2 border-sky-500  aspect-square">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Precio</th>
                <th className="truncate">
                  Cantidad <br /> Disponible
                </th>
                <th></th>
              </tr>
            </thead>
            {productos
              .filter((producto) =>
                producto.nombre
                  ?.toLowerCase()
                  .includes(nombreBusqueda.toLowerCase())
              )
              .map((productoFiltered, index) => (
                <tbody key={index}>
                  <tr>
                    <th>{index + 1}</th>
                    <td>{productoFiltered.nombre}</td>
                    <td>{productoFiltered.precio_venta}</td>
                    <td>{productoFiltered.inventario_actual}</td>
                    <th>
                      <label>
                        <input
                          type="radio"
                          name="radio-1"
                          className="radio"
                          onChange={() =>
                            setProductoSeleccionado(productoFiltered)
                          }
                        />
                      </label>
                    </th>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
        <div className="w-full flex flex-col justify-start items-center  border-solid border-2 border-sky-500  aspect-square gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Correo del Cliente</span>
            </label>
            <label className="input-group">
              <input
                type="email"
                placeholder="ejemplo@email.com"
                className="input input-bordered"
                list="correos"
                value={correoCliente}
                onChange={(e) => setCorreoCliente(e.target.value)}
              />
              <datalist id="correos">
                {correos.map((correo, index) => (
                  <option value={correo.email} key={index} />
                ))}
              </datalist>
              <span>Correo</span>
            </label>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Cantidad de Productos</span>
            </label>
            <label className="input-group">
              <input
                type="number"
                placeholder="0"
                className="input input-bordered"
                inputMode="numeric"
                min={0}
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
              />
              <span>pza</span>
            </label>
          </div>
          <button className=" btn btn-info" onClick={handleArgregarProducto}>
            <span className="">Agregar</span>
          </button>
        </div>
        <div className="w-full  border-solid border-2 border-sky-500  aspect-square">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th></th>
              </tr>
            </thead>
            {productosAgregados.map((producto, index) => (
              <tbody key={index}>
                <tr>
                  <th>{index + 1}</th>
                  <td>{producto.nombre}</td>
                  <td>{producto.precio_venta}</td>
                  {/**@ts-ignore */}
                  <th>{producto.cantidad}</th>
                  <th>
                    <button
                      className="btn btn-error"
                      onClick={(e) => (
                        e.preventDefault(),
                        setProductosAgregados(
                          productosAgregados.filter(
                            (viejo) => viejo.id !== producto.id
                          )
                        )
                      )}
                    >
                      🗑️
                    </button>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <div className=" flex flex-row justify-center lg:justify-end items-center mt-4 ">
        <div className="flex flex-col w-2/4  lg:w-96 lg:mr-16 gap-4">
          <div className="form-control">
            <div className="input-group mb-4">
              <span>Descuento</span>
              <select
                className="select select-bordered"
                // onChange={(e) => setDescuento(parseInt(e.target.value))}
                /// value={descuento}
              >
                <option onClick={(e) => setDescuento(0)}>Sin Descuento</option>
                <option onClick={(e) => setDescuento(10)}>10%</option>
                <option onClick={(e) => setDescuento(20)}>20%</option>
              </select>
              <span>Total con descuento {totalDescuento}</span>
            </div>
            <label className="input-group">
              <span>Total</span>
              <input
                type="text"
                placeholder="0"
                className="input input-bordered"
                inputMode="numeric"
                readOnly
                value={total}
              />
              <span>MXN</span>
            </label>
          </div>
          <button className="btn btn-info" onClick={agregarVenta}>
            Finalizar Venta
          </button>
        </div>
      </div>
    </>
  );
}
