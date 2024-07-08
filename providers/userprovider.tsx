"use client"

import { Myusercontextprovider } from "@/hooks/useuser";
import React from "react";

interface Userproviderprops{
    children:React.ReactNode;
}

const Userprovider:React.FC<Userproviderprops> =({children})=>{
    return(
        <Myusercontextprovider>
            {children}
        </Myusercontextprovider>
    )
}

export default Userprovider;