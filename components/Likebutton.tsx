"use client"

import userAuthmodal from "@/hooks/useAuthmodal";
import { useUser } from "@/hooks/useuser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikebuttonProps{
    songsId:string;
}

const Likebutton:React.FC<LikebuttonProps> =({songsId})=>{

    const router = useRouter();
    const {supabaseClient} = useSessionContext();
    const authmodal = userAuthmodal();
    const{user} = useUser();
    const[isliked,setisliked]=useState(false)

    useEffect(()=>{
        if(!user?.id){
            return
        }
        const fetchdata = async()=>{
            const{data,error} = await supabaseClient
            .from("liked_songs")
            .select("*")
            .eq("user_id",user.id)
            .eq("songs_id",songsId)
            .single()

            if(!error && data){
                setisliked(true)
            }
        }
        
        fetchdata();
        
    },[songsId,supabaseClient,user?.id])

    const Icon = isliked ?AiFillHeart : AiOutlineHeart;

    const handlelike =async ()=>{
        if(!user){
            return authmodal.onOpen()
        }

        if(isliked){
            const {error}= await supabaseClient
            .from("liked_songs")
            .delete()
            .eq('user_id',user.id)
            .eq('songs_id',songsId)

            if(error){
                toast.error(error.message)
            }
            else{
                setisliked(false)
            }
        }else{
            const {error} = await supabaseClient
            .from("liked_songs")
            .insert({
                songs_id:songsId,
                user_id:user.id
            })
            if(error){
                toast.error(error.message)
            }
            else{
                setisliked(true)
                toast.success('Liked !!!')
            }
        }
        router.refresh()
    }
    
    return(
        <button className="cursor-pointer hover:opacity-75 transition" onClick={handlelike}> 
            <Icon color={isliked?"#22c55e" :"white"} size={25}/>
        </button>
    )
}
export default Likebutton;