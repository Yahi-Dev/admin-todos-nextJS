import { TabBar } from "../../../components/TabBar/TabBar";
import { cookies } from 'next/headers'

export const metadata = {
  title: "Cookies Page",
  description: "SEO Title",
};

export default async function CookiesPage() {
  const cookieStore = await cookies()
  const cookieTab = Number(cookieStore.get('selectedTab')?.value) || 1

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={cookieTab} tabOptions={[1, 2, 3, 4, 5]} />
      </div>
    </div>
  );
}