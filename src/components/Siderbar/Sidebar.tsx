import Image from "next/image";
import Link from "next/link";
import { IoBrowsersOutline, IoListOutline } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { SidebarItem } from "./SidebarItem";

const menuItems = [
  {
    path: "/dashboard",
    icon: <IoBrowsersOutline size={20} />,
    title: "Dashboard",
    subtitle: "Visualizacion",
  },
  {
    path: "/dashboard/rest-todos",
    icon: <LuListTodo size={20} />,
    title: "Rest Todos",
    subtitle: "Visualizacion",
  },
  {
    path: "/dashboard/server-todos",
    icon: <IoListOutline size={20} />,
    title: "Server Actions",
    subtitle: "Visualizacion",
  },
];

export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4 border-b border-gray-200">
          <Link href="#" title="home" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-white">
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
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">TaskFlow</span>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src="https://www.cdeportiva.com/wp-content/uploads/2020/09/Ja-Morant-1200x800.jpg"
            alt="Foto de perfil de Yahinniel Vasquez"
            className="w-20 h-20 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={112} // Tamaño máximo (lg)
            height={112}
            priority={true}
            unoptimized={true} // Opcional: si persisten problemas
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            Yahinniel Vasquez
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>
        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <li key={item.path}>
              <SidebarItem {...item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
};
