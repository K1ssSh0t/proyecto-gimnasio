"use client";
import { useEffect, useState } from "react";
import { Database } from "../../types/supabase";
import { ActualizarClase } from "./actualizar_clase";
import AagregarClase from "./agregar_clase";
import EliminarClase from "./eliminar_clase";
import { useSupabase } from "../../components/supabase-provider";

import ReactPaginate from "react-paginate";

type Clase = Database["public"]["Tables"]["clase"]["Row"];

type Props = {
  clasesLista: Clase[];
  listaIdsEmpleados: (string | null)[];
};

const ClasesLista: React.FC<Props> = ({ clasesLista, listaIdsEmpleados }) => {
  const [clases, setClases] = useState(clasesLista);
  const { supabase } = useSupabase();
  //

  const [currentPage, setCurrentPage] = useState(0);
  const [PER_PAGE, SET_PER_PAGE] = useState(5);
  //const PER_PAGE = 5;

  const options = [5, 10, 15];
  const offset = currentPage * PER_PAGE;
  const currentPageData = clases
    .slice(offset, offset + PER_PAGE)
    .map((clase, index) => (
      <tr key={index}>
        <td className="">{clase.id}</td>
        <td className="">{clase.descripcion}</td>
        <td className="">{clase.fecha_inicio}</td>
        <td className="">{clase.fecha_fin}</td>
        <td className="">{clase.hora_inicio}</td>
        <td className="">{clase.hora_fin}</td>
        <td className="">{clase.id_empleado}</td>
        <td className=" flex space-x-4 justify-center">
          <EliminarClase claseId={clase.id} />
          <ActualizarClase
            clase={clase}
            listaIdsEmpleados={listaIdsEmpleados}
            key={clase.id}
          />
        </td>
      </tr>
    ));
  const pageCount = Math.ceil(clases.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }: { selected: number }) {
    setCurrentPage(selectedPage);
  }

  //

  useEffect(() => {
    setClases(clases);
  }, [clases]);

  useEffect(() => {
    const channel = supabase
      .channel("cambio_tabla_clase")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "clase" },
        (payload) => setClases((clases) => [...clases, payload.new as Clase])
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "clase" },
        (payload) =>
          setClases(clases.filter((clase) => clase.id !== payload.old.id))
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "clase" },
        (payload) =>
          setClases(
            clases.map((clase) =>
              clase.id === payload.new.id ? { ...clase, ...payload.new } : clase
            )
          )
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setClases, clases]);

  return (
    <div className=" p-6">
      <div className="flex justify-between mt-1 items-center p-8 ">
        <h2 className="text-2xl font-bold mt-6 mb-2 self-start">
          Lista de Clases
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
      <div className="flex justify-center mb-4 ">
        <AagregarClase listaIdsEmpleados={listaIdsEmpleados} />
      </div>
      <div className="flex justify-center ">
        <div className="  overflow-x-auto w-11/12">
          <table className=" table table-compact w-full">
            <thead>
              <tr className=" text-center [&>th]:capitalize ">
                <th style={{ position: "unset" }}>Clase ID</th>
                <th className=" ">Descripcion</th>
                <th className=" ">Fecha de Inicio</th>
                <th className=" ">Fecha de Fin</th>
                <th className=" ">Hora de Inicio</th>
                <th className=" ">Hora de Fin</th>
                <th className=" ">Id del Empleado</th>
                <th className=" ">Acciones</th>
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
};

export default ClasesLista;
