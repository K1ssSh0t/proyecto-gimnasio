import * as React from "react";
import { createServerClient } from "@/utils/supabase-server";

type supabase = ReturnType<typeof createServerClient>;

//Funcion que me regresa todos los alumnos de las clases
async function getAlumnos(supabase: supabase) {
  let { data, error } = await supabase.rpc("obtener_clientes_inscritos");

  if (error) console.error(error);
  else return data;
}

//Funcion que me regresa todos los alumnos de las clases inscritos por empleado
async function getAlumonsPorEmeplado(supabase: supabase, userId: string) {
  let { data, error } = await supabase.rpc(
    "obtener_clientes_inscritos_por_empleado",
    {
      p_empleado_id: userId,
    }
  );

  if (error) console.error(error);
  else return data;
}

//Funcion que me devuelve si el usuario actual es un instructor
async function getEsInstructor(supabase: supabase, userId: string) {
  let { data, error } = await supabase.rpc("es_instructor", {
    employee_id: userId,
  });
  if (error) console.error(error);
  else return data;
}

export default async function MisAlumnos() {
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.getSession();

  const session = data.session;

  const id = session?.user.id;

  const Alumnos = await getAlumnos(supabase);

  const Instructor = await getEsInstructor(supabase, id!);

  if (Instructor) {
    const Alumnos = await getAlumonsPorEmeplado(supabase, id!);
    return (
      <div className="container mx-auto">
        <div className=" flex  justify-center items-center my-4">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID Clase</th>
                  <th>Nombre de la Clase</th>
                  <th>Nombre Cliente</th>
                  <th>Teléfono Cliente</th>
                </tr>
              </thead>
              <tbody>
                {Alumnos?.map((alumno, index) => (
                  <tr key={index}>
                    <th>{alumno.clase_id}</th>
                    <td>{alumno.clase_descripcion}</td>
                    <td>{`${alumno.cliente_nombre} ${alumno.cliente_apellidos}`}</td>
                    <td>{alumno.cliente_telefono}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className=" flex  justify-center items-center my-4">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID Clase</th>
                <th>Nombre de la Clase</th>
                <th>Nombre Cliente</th>
                <th>Teléfono Cliente</th>
              </tr>
            </thead>
            <tbody>
              {Alumnos?.map((alumno, index) => (
                <tr key={index}>
                  <th>{alumno.clase_id}</th>
                  <td>{alumno.clase_descripcion}</td>
                  <td>{`${alumno.cliente_nombre} ${alumno.cliente_apellidos}`}</td>
                  <td>{alumno.cliente_telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
