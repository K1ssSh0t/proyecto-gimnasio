import { createServerClient } from "../../utils/supabase-server";
import InterfazVentas from "./interfazVentas";

export const revalidate = 0;

async function getProductosNombre(supabase: any) {
  let { data: producto, error } = await supabase.from("producto").select("*");
  return producto;
}

export default async function SalesModule() {
  const supabase = createServerClient();

  const Productos = await getProductosNombre(supabase);

  return (
    <div className="container mx-auto">
      <InterfazVentas productos={Productos} />
    </div>
  );
  /*
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [customer, setCustomer] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promo, setPromo] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { name, quantity, price, customer };
    setProducts([...products, product]);
    sendEmail();
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setQuantity(0);
    setPrice(0);
    setCustomer("");
  };

  const sendEmail = () => {
    // Lógica para enviar correo electrónico
  };

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value);
    setDiscount(value);
  };

  const handlePromoChange = (e) => {
    setPromo(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    // Lógica para actualizar el precio del producto
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Nombre del producto
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="name"
              type="text"
              placeholder="Ingresa el nombre del producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="quantity"
            >
              Cantidad vendida
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="quantity"
              type="number"
              placeholder="Ingresa la cantidad vendida"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="price"
            >
              Precio de venta
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border           border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="price"
              type="number"
              step="0.01"
              placeholder="Ingresa el precio de venta"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="customer"
            >
              Socio a quien fue vendido
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="customer"
              type="text"
              placeholder="Ingresa el nombre del socio"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="discount"
            >
              Descuento
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="discount"
              type="number"
              step="0.01"
              placeholder="Ingresa el descuento (opcional)"
              value={discount}
              onChange={handleDiscountChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="promo"
            >
              Promoción
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="promo"
              value={promo}
              onChange={handlePromoChange}
            >
              <option value="">Selecciona una promoción (opcional)</option>
              <option value="promo1">Promoción 1</option>
              <option value="promo2">Promoción 2</option>
              <option value="promo3">Promoción 3</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Registrar venta
            </button>
          </div>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Registros de ventas</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Precio de venta</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Socio</th>
              <th className="px-4 py-2">Descuento</th>
              <th className="px-4 py-2">Promoción</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
  */
}
