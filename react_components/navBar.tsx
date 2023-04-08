import Link from "next/link";

const NavigationMenu = () => {
  return (
    <div className="flex flex-auto justify-between items-center bg-black shadow-lg py-4 px-6">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Inicio
        </Link>
      </div>
      <ul className="flex items-center">
        <li>
          <Link
            href="/clientes"
            className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md"
          >
            Clientes
          </Link>
        </li>
        <li>
          <Link
            href="/inventario"
            className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md"
          >
            Inventario
          </Link>
        </li>
        <li>
          <Link
            href="/trabajadores"
            className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md"
          >
            Trabajadores
          </Link>
        </li>
        <li>
          <Link
            href="/ventas"
            className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md"
          >
            Ventas
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationMenu;
