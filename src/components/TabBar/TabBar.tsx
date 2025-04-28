'use client'

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
    currentTab?: number;
    tabOptions: number[];
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4, 5], currentTab = 1 }: Props) => {
    const [selectedTab, setSelectedTab] = useState(currentTab);

    const router = useRouter();

    // Sincronizar el estado con el valor inicial
    useEffect(() => {
        setSelectedTab(currentTab);
    }, [currentTab]);

    const onTabSelected = (tab: number) => {
        setSelectedTab(tab);
        setCookie('selectedTab', tab.toString(), {
            path: '/',
            maxAge: 60 * 60 * 24 * 30 // 30 días
        });
        router.refresh();
    }

    return (
        <div className="w-full p-4">
            <div className={`grid w-full rounded-lg bg-gray-100 p-1 grid-cols-${tabOptions.length}`}>
                {tabOptions.map((tab) => (
                    <div key={tab}>
                        <input
                            type="radio"
                            id={tab.toString()}
                            checked={selectedTab === tab}
                            onChange={() => {}}
                            className="peer hidden"
                            aria-label={`Tab ${tab}`}
                        />
                        <label
                            htmlFor={tab.toString()}
                            onClick={() => onTabSelected(tab)}
                            className={`
                                block cursor-pointer select-none rounded-md p-2 text-center 
                                transition-colors duration-200
                                peer-checked:bg-indigo-600 peer-checked:text-white
                                hover:bg-gray-200
                                ${selectedTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-700'}
                            `}
                        >
                            {tab}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};