'use client'
import Likebutton from "@/components/Likebutton";
import Mediaitem from "@/components/Mediaitem";
import useOnplay from "@/hooks/useOnplay";
import { useUser } from "@/hooks/useuser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

interface LikedContentprops{
    songs:Song[]
}

const LikedContent:React.FC<LikedContentprops> = ({songs})=>{

    const router = useRouter();
    const{isloading,user}=useUser();
    const onplay = useOnplay(songs);

    useEffect(()=>{
        if(!isloading && !user){
            router.replace('/')
        }
    },[isloading,user,router])

    if(songs.length === 0){
        return(
            <div className=" flex flex-col gap-y-2 w-full px-6  text-neutral-400">
                No Liked Songs 
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-y-2 w-full p-6">
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

export default LikedContent;