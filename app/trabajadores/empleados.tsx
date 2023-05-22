"use client";
import { Database } from "../../types/supabase";
import { ActualizarEmpleado } from "./actualizar_empleado";
import { useEffect, useState } from "react";
import { useSupabase } from "../../components/supabase-provider";

import ReactPaginate from "react-paginate";

type Empleado = Database["public"]["Tables"]["empleados"]["Row"];

export default function EmpleadosLista({
  empleadosLista,
}: {
  empleadosLista: Empleado[];
}) {
  const { supabase } = useSupabase();

  const [empleados, setEmpleados] = useState(empleadosLista);

  //

  const [currentPage, setCurrentPage] = useState(0);
  const [PER_PAGE, SET_PER_PAGE] = useState(5);
  //const PER_PAGE = 5;

  const options = [5, 10, 15];
  const offset = currentPage * PER_PAGE;
  const currentPageData = empleados
    .slice(offset, offset + PER_PAGE)
    .map((empleado, index) => (
      <tr key={index}>
        <td className="">{empleado.id}</td>
        <td className="">{empleado.nombre}</td>
        <td className="">{empleado.apellido_p}</td>
        <td className="">{empleado.apellido_m}</td>
        <td className="">{empleado.telefono}</td>
        <td className="">{empleado.email}</td>
        <td className="">{empleado.tipo_empleado}</td>
        <td className="">{empleado.direccion}</td>
        <td className=" flex space-x-4 justify-center">
          <ActualizarEmpleado empleado={empleado} key={empleado.id} />
        </td>
      </tr>
    ));
  const pageCount = Math.ceil(empleados.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }: { selected: number }) {
    setCurrentPage(selectedPage);
  }

  //

  useEffect(() => {
    setEmpleados(empleados);
  }, [empleados]);

  useEffect(() => {
    const channel = supabase
      .channel("cambio_tabla_empleados")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "empleados" },
        (payload) =>
          setEmpleados((empleados) => [...empleados, payload.new as Empleado])
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "empleados" },
        (payload) =>
          setEmpleados(
            empleados.filter((empleado) => empleado.id !== payload.old.id)
          )
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "empleados" },
        (payload) =>
          setEmpleados(
            empleados.map((empleado) =>
              empleado.id === payload.new.id
                ? { ...empleado, ...payload.new }
                : empleado
            )
          )
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setEmpleados, empleados]);

  return (
    <div className=" p-6">
      <div className="flex justify-between mt-1 items-center p-8 ">
        <h2 className="text-2xl font-bold mt-6 mb-2 self-start">
          Lista de Empleados
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
      <div className="flex justify-center">
        <div className="  overflow-x-auto w-11/12">
          <table className=" table table-compact w-full">
            <thead>
              <tr className=" text-center  ">
                <th style={{ position: "unset", textTransform: "capitalize" }}>
                  Empleado ID
                </th>
                <th className=" capitalize ">Nombre</th>
                <th className=" capitalize">Apellido Paterno</th>
                <th className=" capitalize ">Apellido Materno</th>
                <th className=" capitalize ">Telefono</th>
                <th className=" capitalize">Correo</th>
                <th className="capitalize ">Puesto</th>
                <th className="capitalize ">Direccion</th>
                <th className=" capitalzie">Acciones</th>
              </tr>
            </thead>
            <tbody>{currentPageData}</tbody>
          </table>
          <div className=" flex justify-center text-center">
            <ReactPaginate
              previousLabel={"← Anterior"}
              nextLabel={"Siguiente →"}
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
    </div>
  );
}
