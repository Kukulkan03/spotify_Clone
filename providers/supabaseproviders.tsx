"use client"
import { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import React, { useState } from "react";

interface Supabaseproviderprops{
    children:React.ReactNode
}

const Supabaseprovider:React.FC<Supabaseproviderprops> =({children})=>{
    const [supabaseclient] = useState(()=>
        createClientComponentClient<Database>()
    )

    return (
        <SessionContextProvider supabaseClient={supabaseclient}>
            {children}
        </SessionContextProvider>
    )

}
export default Supabaseprovider;