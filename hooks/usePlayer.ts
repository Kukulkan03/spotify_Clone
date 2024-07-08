import { create } from "zustand";

interface PlayerStore{
    ids:string[];
    activatedId?:string;
    setId:(id:string)=>void;
    setIds:(id:string[])=>void;
    reset:()=>void
};

const usePlayer = create<PlayerStore>((set)=>({
ids:[],
activatedId:undefined,
setId:(id:string)=> set({activatedId:id}),
setIds:(ids:string[])=>set({ids:ids}),
reset:()=>set({ids:[],activatedId:undefined})

}))

export default usePlayer;