"use client"

import Songitem from "@/components/Songitem";
import useOnplay from "@/hooks/useOnplay";
import { Song } from "@/types";


interface Pagecontentprops{
    songs:Song[]
}
const Pagecontent:React.FC<Pagecontentprops> = ({songs})=>{

    const Onplay = useOnplay(songs);
    
    if(songs.length === 0){
        return(
            <div className="mt-4 text-neutral-400">
                No Songs Available
            </div>
        )
    }
    
    return(
        <div className=" grid grid-cols-2  sm:grid-cols-3 
        md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
        2xl:grid-cols-8 gap-4 mt-4">
            {songs.map((item)=>(
                <Songitem key={item.id} onClick={(id:string)=>Onplay(id)}  data ={item} />
            ))}
        </div>
    )
}

export default Pagecontent;