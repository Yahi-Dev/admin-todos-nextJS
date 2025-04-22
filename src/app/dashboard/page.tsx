import { WidgetItem } from "@/components";
import { LuListTodo } from "react-icons/lu";

const widgetItems = [
  {
    path: "/dashboard/rest-todos",
    icon: <LuListTodo size={20} />,
    title: "Todos",
    subtitle: "Visualizacion",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow mt-2">
        <h1 className="text-2xl font-bold text-gray-800">Bienvenido, Yahinniel</h1>
        <p className="text-gray-600">Aquí tienes un resumen de tu actividad</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {widgetItems.map((item) => (
          <WidgetItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
}
