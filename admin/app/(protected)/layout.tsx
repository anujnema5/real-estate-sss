"use client";
import { ModeToggle } from "@/components/theme-selector";
import AuthProvider from "../providers/auth-provider";
import { Icons } from "@/components/icons";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { BarChartIcon, CalendarIcon, HomeIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons";
import { useLogOutMutation } from "@/features/api/authApiSlice";
import Header from "@/components/sections/Header/header";
import { useLogout } from "@/hooks/useLogout";

const MenuItems = [
  {
    title: 'Home',
    active: true,
    href: '/dashboard',
    icon: <Icons.home />,
  },
  {
    title: 'Users',
    active: false,
    href: '/dashboard/user',
    icon: <Icons.wallet />,
  },

  {
    title: 'Vendors',
    href: '/dashboard/vendor',
    icon: <PersonIcon />,
  },

  {
    title: 'Properties',
    href: '/dashboard/property',
    icon: <HomeIcon />,
  },

  {
    title: 'Subscription',
    href: '/dashboard/subscription',
    icon: <CalendarIcon />,
  },

  {
    title: 'Package',
    href: '/dashboard/package',
    icon: <RocketIcon />,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { handleLogout, isLoading } = useLogout();


  const handleMenuClick = (item: any) => {
    router.push(item.href);
  };

  return (
    <main className="overflow-x-hidden">
      <Header/>
      <div className="flex border-t relative">
      <aside className='sticky top-0 min-h-screen min-w-64 border-r text-gray-800 p-4 flex flex-col justify-between'>
        <div>
          <nav className='space-y-2'>
            {MenuItems.map((item) => (
              <button
                className={`w-full flex items-center space-x-2 text-gray-800 dark:text-gray-200 dark:hover:bg-zinc-800 hover:bg-zinc-200 py-2 px-2 rounded-lg  ${pathname === item.href ? 'dark:bg-zinc-800 bg-zinc-100' : ''
                  }`}
                key={item.title}
                onClick={() => handleMenuClick(item)}
              >
                {item.icon}
                <span className='text-sm font-medium'>{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
        <Button onClick={handleLogout}  variant={'default'}>
          
          {isLoading ? <Icons.spinner className='mr-2 h-4 w-4 animate-spin' /> : "Logout"}
        </Button>
      </aside>

      <div className=" ">
        {children}
      </div>
      </div>
    </main>
  );
}
