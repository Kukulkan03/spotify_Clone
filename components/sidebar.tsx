
"use client"
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import {HiHome} from "react-icons/hi";
import Box from "./box";
import Sidebaritem from "./sidebaritem";
import Library from "./library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface sidebarprops{
    children:React.ReactNode;
    songs:Song[];
}

const Sidebar:React.FC<sidebarprops> = ({children,songs})=>{

    const pathname = usePathname();
    const player = usePlayer();
     
    const routes = useMemo(()=>[
        {   
            icons: HiHome,
            label:'Home',
            active:pathname !== '/search',
            href : '/'
        },{ 
            icons:BiSearch,
            label:'Search',
            active:pathname ==='/search',
            href:'/search',
        }
    ],[pathname])
    return(
        <div className={twMerge(`flex h-full`,player.activatedId && "h-[cal(100%-80px)]")}>
            <div className="hidden 
            md:flex flex-col
            gap-y-2 bg-black
            h-full w-[300px] p-2">
                <Box>
                   <div className="flex flex-col gap-y-5 px-5 py-4">
                    {routes.map((item)=>(
                        <Sidebaritem 
                        key={item.label}
                        {...item} />
                    ))}
                   </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                  <Library songs={songs} />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                    {children}
            </main>
        </div>
    )
}
export default Sidebar;