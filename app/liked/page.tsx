import getLikedsongs from "@/actions/getLikedsongs";
import Header from "@/components/Header";
import Image from "next/image";
import LikedContent from "./components/likedcontent";

export const revalidate =0;

const Likedsongs = async()=>{
    const songs = await getLikedsongs();

    return(
        <div className="bg-neutral-900   h-full w-full overflow-hidden overflow-y-auto">
            <Header>
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center gap-x-5">
                        <div className="relative w-28 h-28 lg:w-44 lg:h-44">
                            <Image fill className="object-cover" alt="Playlist" src="/images/liked.png"/>
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                            <p className="hidden md:block font-semibold text-2xl text-white ">Playlist </p>
                            <h1 className="text-white text-4xl sm:text-5xl lg:text-5xl font-bold">Liked Songs</h1>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs}/>
        </div>   
    )
}
export default Likedsongs;