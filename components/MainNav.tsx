"use client";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function MainNav ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const routes = [
        {
            href:  `/${params.storeId}`,
            label: 'Overview',
            active: pathname === `/${params.storeId}`
        },
        {
            href:  `/${params.storeId}/orders`,
            label: 'Orders',
            active: pathname === `/${params.storeId}/orders`
        },
        {
            href:  `/${params.storeId}/billboards`,
            label: 'Billboards',
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            href:  `/${params.storeId}/categories`,
            label: 'Categories',
            active: pathname === `/${params.storeId}/categories`
        },
        {
            href:  `/${params.storeId}/cases`,
            label: 'Cases',
            active: pathname === `/${params.storeId}/cases`
        },
        {
            href:  `/${params.storeId}/bracelets`,
            label: 'Bracelets',
            active: pathname === `/${params.storeId}/bracelets`
        },
        {
            href:  `/${params.storeId}/movements`,
            label: 'Movements',
            active: pathname === `/${params.storeId}/movements`
        },
        {
            href:  `/${params.storeId}/products`,
            label: 'Products',
            active: pathname === `/${params.storeId}/products`
        },
        {
            href:  `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`
        },
    ];
    
    return (
        <nav className={cn("flex w-full lg:items-center space-x-4 lg:space-x-6", className)}>
            <nav className={cn("hidden lg:flex items-center space-x-4 lg:space-x-6", className)}>
                {routes.map((route) => (
                    <Link 
                    key={route.href} 
                    href={route.href} 
                    className={cn("text-sm font-medium transition-colors hover:text-primary",
                    route.active ? "text-black dark:text-white" : "text-muted-foreground" 
                    )}
                    >
                        {route.label}
                    </Link>
                ))}
            </nav>


<div className="flex w-full place-content-end">
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
            <Menu color="black" className="HAMBURGER-ICON space-y-2 animate-pulse w-8 h-8" onClick={() => setIsNavOpen((prev) => !prev)}/>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> 
          <div className="w-full border-b flex h-16 items-center place-content-end px-4">
            <X className="CROSS-ICON animate-pulse w-8 h-8" onClick={() => setIsNavOpen(false)} />
          </div>
            
            <ul className="MENU-LINK-MOBILE-OPEN flex-1 flex flex-col mt-4 w-full pl-6">
                {routes.map((route) => (
                        <Link 
                        key={route.href} 
                        href={route.href}
                        onClick={() => setIsNavOpen((prev) => !prev)}
                        className={cn("text-xl font-medium transition-colors hover:text-primary my-1",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground" 
                        )}
                        >
                            {route.label}
                        </Link>
                    ))}
            </ul>
          </div>
        </section>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>



        </nav>
    );
};
