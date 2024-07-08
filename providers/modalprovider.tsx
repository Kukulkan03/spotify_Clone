"use client";

import Authmodal from "@/components/Authmodal";
import Modal from "@/components/Modal";
import SubscribeModal from "@/components/Subscribemodal";
import Uploadmodal from "@/components/Uploadmodal";
import { ProductWithPrice } from "@/types";
import { useEffect, useState } from "react";


interface Modalprops{
    products:ProductWithPrice[]
}
const Modalprovider:React.FC<Modalprops> = ({products})=>{
    const[ismounted,setismounted] = useState(false);


    useEffect(()=>{
        setismounted(true)
    },[])

    if(!ismounted){
        return null 
    }
    return(
        <>
        <Authmodal/>
        <Uploadmodal/>
        <SubscribeModal products={products}/>
        </>
       
        
    )
}

export default Modalprovider;