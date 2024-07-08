"use client"

import { Song } from "@/types"
import React, { useEffect, useState } from "react";
import Mediaitem from "./Mediaitem";
import Likebutton from "./Likebutton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Silder";
import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";

interface Playercontentprops{
    song:Song;
    songUrl:string;
}

const PlayerContent:React.FC<Playercontentprops> = ({song,songUrl})=>{

    const Player = usePlayer();
    const [volume,setVolume] = useState(1);
    const [isPlaying,setisPlaying] = useState(false);

    const Icon = isPlaying? BsPauseFill: BsPlayFill;
    const Volumeicon = volume === 0? HiSpeakerXMark : HiSpeakerWave;
    const onPlaynext = ()=>{
        if(Player.ids.length === 0){
            return;
        }
        const currentindex = Player.ids.findIndex((id)=>id === Player.activatedId);
        const nextsong = Player.ids[currentindex+1];

        if(!nextsong){
            return Player.setId(Player.ids[0])
        }
        Player.setId(nextsong)
    }

    const onPlayprevious = ()=>{
        if(Player.ids.length === 0){
            return;
        }
        const currentindex = Player.ids.findIndex((id)=>id === Player.activatedId);
        const previoussong = Player.ids[currentindex-1];

        if(!previoussong){
            return Player.setId(Player.ids[Player.ids.length-1])
        }
        Player.setId(previoussong)
    }

    const [play,{pause,sound}] = useSound(songUrl,{
        volume:volume,onplay:()=>setisPlaying(true),
        onend:()=>{setisPlaying(false)
            onPlaynext()
        },
        onpause:()=>setisPlaying(false),
        format:["mp3"]
    })

    useEffect(()=>{
        sound?.play()

        return ()=>{sound?.unload()}
    },[sound])

    const handlePlay = () => {
        if (!isPlaying) {
          play()
        } else {
          pause()
        }
      }
      const toggleMute = () => {
        if (volume === 0) {
          setVolume(1)
        } else {
          setVolume(0)
        }
      }

    return(
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <Mediaitem data={song} />
                    <Likebutton songsId={song.id} />
                </div>
            </div>
            <div onClick={handlePlay} className="flex md:hidden col-auto w-full justify-end items-center">
                <div className=" h-10 w-10 flex items-center justify-center rounded-full  bg-white p-1 cursor-pointer">
                    <Icon size={30} className="text-black" />
                </div>
            </div>

            <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                <AiFillStepBackward size={30} className="text-neutral-400 cursor-pointer hover:text-white transition"
                onClick={onPlayprevious}/>
                    <div onClick={handlePlay} className="flex items-center justify-center h-10 w-10 rounded-full  bg-white  p-1 cursor-pointer">
                            <Icon size={30} className="text-black" />
                        </div>  
                 <AiFillStepForward size={30} className="text-neutral-400 cursor-pointer  hover:text-white transition"
                 onClick={onPlaynext}/>        
            </div>
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <Volumeicon onClick={toggleMute}
                        className="cursor-pointer" size={34}/>
                        <Slider value={volume} OnChange={value => setVolume(value)} />
                </div>
            </div>
        </div>
    )
}

export default PlayerContent;