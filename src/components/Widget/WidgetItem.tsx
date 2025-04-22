import Link from 'next/link';
import { JSX } from 'react';

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
  subtitle: string;
}

export const WidgetItem = ({ path, icon, title, subtitle }: Props) => {
  return (
    <div className="md:col-span-2 lg:col-span-1 cursor-pointer">
      <div className="h-full py-6 px-6 space-y-4 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
        <div>
          <h5 className="text-lg font-medium text-center text-white/90">{title}</h5>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-4xl font-bold text-white">{icon}</div>
            <Link href={path}>
              <span className="flex items-center gap-1 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                Ir allá
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
          <span className="block mt-4 text-center text-sm text-white/70">{subtitle}</span>
        </div>
      </div>
    </div>
  )
}

