import { Song } from "@/types";
import usePlayer from "./usePlayer";
import userAuthmodal from "./useAuthmodal";
import { useUser } from "./useuser";
import userSubscribemodal from "./useSubscribemodal";

const useOnplay = (songs:Song[])=>{
    const player = usePlayer();
    const authmodal =userAuthmodal();
    const {user,subscription} = useUser();
    const subscribemodal = userSubscribemodal();
   
    const onPlay = (id:string)=>{
        if(!user){
            return authmodal.onOpen();
        }
        if(!subscription){
            return subscribemodal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song)=>song.id))
    }
    return onPlay;
}

export default useOnplay;