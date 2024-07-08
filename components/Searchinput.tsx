"use client"
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./input";

const SearchInput = ()=>{

const router = useRouter();
const[value,setvalue] = useState<string>("");
const debounse = useDebounce<string>(value,500);

useEffect(()=>{
    const query = {
        title:debounse,
    }
const url = qs.stringifyUrl({
    url:'/search',
    query:query
})
router.push(url)

},[debounse ,router])
    return(
        <Input className="text-white" placeholder="What would you like to Listen?" value={value} onChange= {(e)=>setvalue(e.target.value)}/>
    )
}
export default SearchInput;