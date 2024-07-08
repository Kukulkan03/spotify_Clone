"use client"


import Button from "@/components/Button";
import userSubscribemodal from "@/hooks/useSubscribemodal";
import { useUser } from "@/hooks/useuser";
import { postData } from "@/libs/helper";
import { redirect, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Accountcontent = ()=>{
    const router = useRouter();
    const subscribemodal =userSubscribemodal();
    const {isloading,subscription,user} =  useUser();
    const [loading,setloading] =  useState(false);
    
    useEffect(()=>{
        if(!isloading && !user){
            router.replace('/');
        }
    },[isloading,user,router])

    const Redirecttocustomerportal = async()=>{
        setloading(true);
        try{
            const {url,error} = await postData({
                url:'/api/create-portal-link'
            });
            window.location.assign(url);
        }catch(error){
            if(error){
                toast.error((error as Error).message)
            }
        }
        setloading(false);
    }
    return(
        <div className="mb-7 px-6">
            {!subscription &&
            <div className="flex flex-col gap-y-4">
               <p> NO Active Plan</p>
               <Button onClick={subscribemodal.onOpen}
               className="w-[300px]"
               >
                    Subscribe
               </Button>
            </div>}
        {subscription &&
        <div className="flex flex-col gap-y-4">
            <p>You are currently on <b>{subscription?.prices?.products?.name}</b> plan </p>
        <Button disabled={loading||isloading} onClick={Redirecttocustomerportal} className="w-[300px]">
            Open Customer portal 
        </Button>
        </div>}

        </div>
    )
}
export default Accountcontent;