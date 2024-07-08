"use client"

import Likebutton from "@/components/Likebutton";
import Mediaitem from "@/components/Mediaitem";
import useOnplay from "@/hooks/useOnplay";
import { Song } from "@/types"
import React from "react";

interface Searchcontentprops{
    songs:Song[];
}

const Searchcontent:React.FC<Searchcontentprops>= ({songs})=>{

    const onplay = useOnplay(songs);

    if(songs.length === 0){
        return(
            <div className="flex flex-col gap-y-2 w-full px-6  text-neutral-400">
                No Songs Found !!!
            </div>
        )
    }
    return(
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song)=>(
                <div key={song.id} className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <Mediaitem onClick={(id:string)=>onplay(id)} data={song}/>
                    </div>
                    <Likebutton songsId={song.id}/>
                </div>
            ))}

        </div>
    )
}
export default Searchcontent;