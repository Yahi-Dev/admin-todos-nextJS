import { UserGreeting, WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { LuListTodo } from "react-icons/lu";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


const widgetItems = [
  {
    path: "/dashboard/rest-todos",
    icon: <LuListTodo size={20} />,
    title: "Todos",
    subtitle: "Visualizacion",
  },
];


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="space-y-6">
      {/* Encabezado de bienvenida */}
      <div className="bg-white p-6 rounded-xl shadow mt-2">
        <div className="flex items-center space-x-4">
          {/* Avatar del usuario */}
          <div className="flex-shrink-0">
            <img
              className="h-16 w-16 rounded-full object-cover border-2 border-indigo-100"
              src={session.user?.image || "/default-avatar.png"}
              alt="User profile"
            />
          </div>

          {/* Información principal */}
          <UserGreeting name={session.user?.name} />
        </div>
      </div>

      {/* Widgets y detalles del usuario */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {widgetItems.map((item) => (
          <WidgetItem key={item.path} {...item} />
        ))}

        {/* Tarjeta de información del usuario */}
        <div className="bg-white p-6 rounded-xl shadow col-span-full lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Tu información
          </h2>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Nombre completo
              </p>
              <p className="text-gray-800">
                {session.user?.name || "No disponible"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Correo electrónico
              </p>
              <p className="text-gray-800">
                {session.user?.email || "No disponible"}
              </p>
            </div>

            {session.user?.role && (
              <div>
                <p className="text-sm font-medium text-gray-500">Rol</p>
                <p className="text-gray-800 capitalize">{session.user.role}</p>
              </div>
            )}

            {session.user?.createdAt && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Miembro desde
                </p>
                <p className="text-gray-800">
                  {new Date(session.user.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
