import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadimage =(song:Song)=>{
    const supabaseclient = useSupabaseClient();
    if(!song){
        return null;
    }

    const {data:imagedata} = supabaseclient
    .storage
    .from('images')
    .getPublicUrl(song.image_path);

    return imagedata.publicUrl;

}

export default useLoadimage;