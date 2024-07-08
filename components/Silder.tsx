"use client"

import * as RadixSlider from "@radix-ui/react-slider";
import React from "react";

interface SilderProps{
    value?:number;
    OnChange?:(value: number)=>void;
}
const Slider:React.FC<SilderProps> =({value = 1,OnChange})=>{

    const Handlechange = (newValue:number[])=>{
        value=1,
        OnChange?.(newValue[0])
    }
    return(
        <RadixSlider.Root className="relative flex items-center select-none touch-none w-full h-10"
        defaultValue={[1]} value={[value]} onValueChange={Handlechange} max={1} step={0.1} aria-label="Volume">
        <RadixSlider.Track className=" bg-neutral-600 relative grow rounded-full h-[3px]">
          <RadixSlider.Range className="  absolute  bg-white rounded-full h-full"/>
        </RadixSlider.Track>
      </RadixSlider.Root>
    )
}
export default Slider;