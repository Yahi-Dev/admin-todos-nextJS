import { cookies } from "next/headers";
import Link from "next/link";
import { CiChat1, CiMenuBurger, CiSearch, CiShoppingBasket } from "react-icons/ci";

export const TopMenu = async () => {

  const cookieStore = await cookies();
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}')

  const getTotalCount = () => {
    let items = 0;
    Object.values( cart ).forEach(value => {
      items+= value as number;
    })


    return items;
  }

  return (
    <div className="px-6 py-4 flex items-center justify-between bg-white shadow-sm border-b border-gray-100">
      {/* Título del Dashboard - ahora más visible */}
      <div className="flex items-center space-x-4">
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 lg:hidden"
          aria-label="Open menu"
        >
          <CiMenuBurger size={24} />
        </button>
        <h5 className="text-2xl font-bold text-gray-800 lg:block">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h5>
      </div>

      {/* Barra de búsqueda y botones de acción */}
      <div className="flex items-center space-x-4">
        {/* Barra de búsqueda mejorada */}
        <div className="hidden md:block w-64 xl:w-80">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-blue-500">
              <CiSearch size={20} />
            </span>
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full pl-12 pr-4 py-2.5 rounded-xl text-sm text-gray-700 outline-none border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            />
          </div>
        </div>

        {/* Botón de búsqueda móvil */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          aria-label="Search"
        >
          <CiSearch size={20} />
        </button>

        {/* Botones de acción con mejor visibilidad */}
        <div className="flex space-x-2">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors cursor-pointer"
            aria-label="Chat"
          >
            <CiChat1 size={22} />
          </button>
          <Link
            href={'/dashboard/cart'}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <span className='text-sm text-red-600 text-bold'>{getTotalCount()}</span>
            <CiShoppingBasket size={22} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};
