'use client'

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { FiUser, FiMail, FiCalendar, FiSettings, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Client Side');
    // Simular carga de datos
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-24 w-24 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-3 w-full">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header con foto y nombre */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <img 
                  src={session?.user?.image || '/default-avatar.png'} 
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white border-opacity-30 shadow-lg"
                />
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                  <FiSettings className="text-indigo-600" />
                </button>
              </div>
              
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {session?.user?.name || 'Usuario'}
                </h1>
                <p className="text-indigo-100 mt-1">{session?.user?.email}</p>
                <div className="mt-3 flex justify-center sm:justify-start gap-2">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-amber-400 text-bold">
                    Usuario Premium
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Sección de información */}
            <div className="p-6 md:p-8 col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FiUser className="text-indigo-500" />
                Información Personal
              </h2>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InfoCard 
                    icon={<FiMail />}
                    title="Correo Electrónico"
                    value={session?.user?.email || 'No disponible'}
                  />
                  <InfoCard 
                    icon={<FiCalendar />}
                    title="Miembro desde"
                    value={new Date().toLocaleDateString()}
                  />
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Acerca de mí</h3>
                  <p className="text-blue-600">
                    Desarrollador Full-Stack a nivel profesional
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar con acciones */}
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FiSettings className="text-indigo-500" />
                Configuración
              </h2>

              <div className="space-y-4">
                {/* <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                  <FiUser className="text-gray-600" />
                  <span className='text-black'>Editar perfil</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                  <FiMail className="text-gray-600" />
                  <span className='text-black'>Configuración de email</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                  <FiSettings className="text-gray-600" />
                  <span  className='text-black'>Preferencias</span>
                </button> */}

                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition mt-8">
                  <FiLogOut className="text-red-500" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Componente auxiliar para mostrar información
const InfoCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
        {icon}
      </div>
      <h3 className="font-medium text-gray-700">{title}</h3>
    </div>
    <p className="text-gray-900 pl-11">{value}</p>
  </div>
);