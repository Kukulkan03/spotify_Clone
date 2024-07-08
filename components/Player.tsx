"use client"

import useGetSongByid from "@/hooks/useGetsongbyiId";
import useLoadSongurl from "@/hooks/useLoadSongurl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./Playercontent";

const Player = ()=>{
    const player = usePlayer();
    const {song} = useGetSongByid(player.activatedId)
    const songurl  = useLoadSongurl(song!)

    if (!song || !songurl || !player.activatedId) {
        return null
      }
    return(
        <div className="fixed  bottom-0  bg-black  w-full  py-2  h-[80px]  px-4 text-white">
           <PlayerContent key={songurl} song={song} songUrl={songurl}/>
        </div>
    )
}
export default Player;