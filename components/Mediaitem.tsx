"use client"

import useLoadimage from "@/hooks/useLoadimage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";

interface Mediaitemprops{
    data:Song,
    onClick?:(id:string)=>void
}
const Mediaitem:React.FC<Mediaitemprops> = ({data,onClick})=>{
    const imageurl = useLoadimage(data);
    const player = usePlayer();
    const handleOnclick=()=>{
        if(onClick){
            return onClick(data.id)
        }

        return player.setId(data.id);
    }
    return(
        <div 
        onClick={handleOnclick}
        className="flex items-center gap-x-3 cursor-pointer  hover:bg-neutral-800/50 w-full p-2 rounded-md">
            <div className="relative rounded-md  min-h-[48px]  min-w-[48px] overflow-hidden">
                <Image fill src={imageurl || "/images/liked.png"} alt="Mediaitem" className="object-cover"/>  
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.title}</p>
                <p className="text-neutral-400 text-sm truncate">By {data.author}</p>
            </div>
            
        </div>
    )
}
export default Mediaitem;