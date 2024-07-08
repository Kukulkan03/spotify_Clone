"use Client"

import userAuthmodal from "@/hooks/useAuthmodal";
import useUploadmodal from "@/hooks/useUploadmodal";
import { useUser } from "@/hooks/useuser";
import { Song } from "@/types";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import Mediaitem from "./Mediaitem";
import useOnplay from "@/hooks/useOnplay";
import userSubscribemodal from "@/hooks/useSubscribemodal";

interface Libraryprops{
    songs:Song[]
}
const Library:React.FC<Libraryprops> = ({songs})=>{
    const authmodal =  userAuthmodal();
    const uploadmodal = useUploadmodal();
    const {user,subscription} = useUser();
    const subscribemodal = userSubscribemodal();

    const onplay = useOnplay(songs);

    const onClick = ()=>{
        if(!user){
            return authmodal.onOpen();
        }
        if(!subscription){
            return subscribemodal.onOpen()
        }

        return uploadmodal.onOpen();
    }
    return(
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400 " size={26} />
                    <p className="text-neutral-400 font-medium text-md">
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus onClick={onClick} size={26} className="text-neutral-400
                cursor-pointer hover:text-white transition" />
            </div>
            <div className=" text-neutral-400 flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item)=>(
                 <Mediaitem onClick={(id:string)=> onplay(id)} data={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}
export default Library;