"use client"

import { Price, ProductWithPrice } from "@/types";
import Modal from "./Modal";
import Button from "./Button";
import { useUser } from "@/hooks/useuser";
import { useState } from "react";
import toast from "react-hot-toast";
import { postData } from "@/libs/helper";
import { getStripe } from "@/libs/stripeClient";
import userSubscribemodal from "@/hooks/useSubscribemodal";
interface SubscribeModalprops{
    products:ProductWithPrice[]
}

const formatPrice = (price:Price)=>{
    const priceString = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:price.currency,
        minimumFractionDigits:0,
    }).format((price?.unit_amount || 0)/100);

    return priceString;
}
const SubscribeModal:React.FC<SubscribeModalprops> = ({products})=>{

  const subscribemodal = userSubscribemodal();
    const [priceIdloading,setpriceIdloading] = useState<string>()
    const {user,isloading,subscription} = useUser();

    const onChange = (isOpen:boolean)=>{
      if(!isOpen){
        subscribemodal.onClose();
      }
    }
    const handleCheckout = async(price:Price)=>{
        setpriceIdloading(price.id)

        if(!user){
            setpriceIdloading(undefined);
            return toast.error('MUST BE LOGGED IN')
        }
        if(subscription){
            setpriceIdloading(undefined);
            return toast('ALREADY SUBSCRIBED ')
        }

        try{
            const {sessionId}=await postData({
                url:'/api/create-checkout',
                data:{price}
            })
            const stripe = await getStripe();
            stripe?.redirectToCheckout({sessionId});
        }catch (error) {
            return toast.error((error as Error)?.message)
          }finally {
            setpriceIdloading(undefined)
          }
    }
    let content = (<div className="text-center">No Products Available</div>)

    if (products.length) {
        content = (
          <div>
            {products.map(product => {
              if (!product.prices?.length) {
                return <div key={product.id}>No prices available</div>
              }
    
              return product.prices.map(price => (
                <Button
                  key={price.id}
                  onClick={()=>handleCheckout(price)}
                  disabled={isloading || price.id === priceIdloading}
                  className="mb-4">
                  {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                </Button>
              ))
            })}
          </div>
        )
      }

    return(
        <Modal title="Only for premimum users" description="Listen to music with spotify premimum" 
        isOpen={subscribemodal.isOpen} onChange={onChange}>
            {content}
        </Modal>
    )
}
export default SubscribeModal;