"use client"

import useUploadmodal from "@/hooks/useUploadmodal"
import Modal from "./Modal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./input";
import Button from "./Button";
import { useUser } from "@/hooks/useuser";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const Uploadmodal = ()=>{
    const[isLoading,setloading] = useState(false);
    const uploadmodal = useUploadmodal();
    const {user} = useUser();
    const supabaseclient = useSupabaseClient();
    const router = useRouter();

    const {register,handleSubmit,reset} = useForm<FieldValues>({
        defaultValues:{
            author:'',
            titlt:'',
            song:null,
            image:null
        }
    })
    const OnChange = (open:boolean)=>{
        if(!open){
            reset();
            return uploadmodal.onClose()
        }

    }
    
    const onSubmit:SubmitHandler<FieldValues>= async(values)=>{
        try{
        setloading(true)
        const imagefile = values.image?.[0];
        const songfile = values.song?.[0];

        if(!imagefile || !songfile || !user){
            toast.error("Missing Feilds");
            return;
        }
        const uniqueId = uniqid();
        const{data:songdata,error:songerror} = await supabaseclient.storage
          .from("songs")
          .upload(`song-${values.title}-${uniqueId}`,songfile,{
            cacheControl:"3600",
            upsert:false
          })
          if(songerror){
            setloading(false)
            return toast.error("Failed Song Upload")
          }

          const{data:imagedata,error:imageerror} = await supabaseclient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}`,imagefile,{
            cacheControl:"3600",
            upsert:false
          })
          if(imageerror){
            setloading(false)
            return toast.error("Failed image upload")
          }
          const{error:supabaseerror} = await supabaseclient.from("songs").insert({
            user_id: user.id,
            title: values.title,
            author: values.author,
            image_path: imagedata.path,
            song_path: songdata.path,
          })

          if(supabaseerror){
            return toast.error(supabaseerror.message)
          }
          router.refresh()
          setloading(false)
          toast.success("Song Created !!")
          reset()
          uploadmodal.onClose()

    }catch(error){
        toast.error("Something went wrong")
    }

    }
    return(
        <Modal title="Add a Song "
        description="Upload an mp3 file "
        isOpen={uploadmodal.isOpen}
        onChange={OnChange}>
        
        <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-y-4">
            <Input id="title" disabled={isLoading} {...register("title", { required: true })} placeholder="Song title" />
            <Input id="author" disabled={isLoading} {...register("author", { required: true })} placeholder="Song author" />
            <div>
                <div className="pb-1">
                    Select a song file
                </div>
                <Input id="song" type="file" disabled={isLoading} accept=".mp3"{...register('song',{required:true})}/>
            </div>
            <div>
                <div className="pb-1">
                    Select a image 
                </div>
                <Input id="image" type="file" disabled={isLoading} accept=".mpimage/*"{...register('image',{required:true})}/>
            </div>
            <Button disabled={isLoading} type="submit">Create</Button>
        </form>

        </Modal>
    )
}

export default Uploadmodal;