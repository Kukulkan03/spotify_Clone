import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getsongs from "./getsongs";


const getsongsByTitle = async(title:string):Promise<Song[]>=>{
    const supabase = createServerComponentClient({
        cookies:cookies, 
    })
    if(!title){
        const allsongs = getsongs();
        return allsongs;
    }
    const{data,error} = await supabase
    .from('songs')
    .select('*')
    .ilike("title",`%${title}%`)
    .order('created_at',{ascending:false})

    if(error){
        console.log(error)
    }
    return (data as any)|| []

} 
export default getsongsByTitle;