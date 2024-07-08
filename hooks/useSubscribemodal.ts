import { create } from "zustand";


interface SubscribeModalstore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}
 
const userSubscribemodal = create<SubscribeModalstore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default userSubscribemodal;