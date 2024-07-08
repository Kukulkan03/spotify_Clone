import { create } from "zustand";


interface Uploadmodalstore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}
 
const useUploadmodal = create<Uploadmodalstore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useUploadmodal;