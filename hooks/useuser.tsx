import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs"
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useEffect, useState,useContext } from "react";

type Usercontexttype = {
    acesstoken:string|null;
    user:User |null;
    userdetails:UserDetails|null;
    isloading:boolean;
    subscription:Subscription|null;
}

export const Usercontext  = createContext<Usercontexttype | undefined>(
    undefined
);

export interface Props{
    [propsname:string]:any;
};

export const Myusercontextprovider = (props:Props)=>{
    const {session,
        isLoading:isLoadingUser,
        supabaseClient:supabase
    } = useSessionContext();

    const user = useSupaUser();
    const acesstoken = session?.access_token ?? null;
    const[isLoadingData,setisloading] = useState(false);
    const[userdetails,setdetails] = useState<UserDetails | null >(null);
    const[subscription,setsubscription] = useState<Subscription|null>(null);
    
    const getuserdetails = ()=>supabase.from('users').select('*').single();
    const getsubscription = ()=> supabase.from('subscriptions').select('*,prices(*,products(*))')
    .in('status',['trialing','active']).single();
    
    useEffect(()=>{
        if(user && !isLoadingData && !userdetails && !subscription){
            setisloading(true)
            Promise.allSettled([getuserdetails(),getsubscription()]).then(results =>{
                const userdetailspromise = results[0];
                const subscriptionpromise = results[1];

                if(userdetailspromise.status === 'fulfilled') 
                setdetails(userdetailspromise.value.data as UserDetails)
            if(subscriptionpromise.status === 'fulfilled')
                setsubscription(subscriptionpromise.value.data as Subscription)
            
            setisloading(false)
            })
        }
        else if(!user && !isLoadingData && !isLoadingUser )
            setdetails(null);
            setsubscription

    },[user,isLoadingUser])

    const value = {
        acesstoken,
        user,
        userdetails,
        isloading: isLoadingUser || isLoadingData,
        subscription
    }
    return <Usercontext.Provider value={value} {...props} />
    }
    
    export const useUser = () => {
        const context = useContext(Usercontext)
        if (context === undefined) {
          throw new Error(`useUser must be used within a MyUserContextProvider.`)
        }
        return context;
      
}