import { create } from "zustand";


interface Authmodalstore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}
 
const userAuthmodal = create<Authmodalstore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default userAuthmodal;