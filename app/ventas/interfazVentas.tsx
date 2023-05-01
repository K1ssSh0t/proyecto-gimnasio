import * as React from "react";

export default function InterfazVentas() {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center pt-4">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Buscar producto…"
              className="input input-bordered"
            />
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
      <div className=" grid grid-cols-1 gap-4 mt-12 lg:grid-cols-3">
        <div className="w-full  border-solid border-2 border-sky-500  aspect-square">
          Productos
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
              />
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
                step={1}
                className="input input-bordered"
                min={0}
              />
              <span>U</span>
            </label>
          </div>
          <button className=" btn btn-info">
            <span className="">Agregar</span>
          </button>
        </div>
        <div className="w-full  border-solid border-2 border-sky-500  aspect-square">
          Comprados
        </div>
      </div>
      <div className=" flex flex-row justify-center lg:justify-end items-center mt-4 ">
        <div className="flex flex-col w-2/4  lg:w-96 lg:mr-16 gap-4">
          <button className=" btn btn-info">Agregar</button>
          <button className="btn btn-info">Finalizar Venta</button>
        </div>
      </div>
    </>
  );
}
