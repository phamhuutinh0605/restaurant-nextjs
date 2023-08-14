"use client";

import { ProductType } from "@/types";
import { useCartStore } from "@/utils/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  product:ProductType;
};

const Price = ({product }: Props) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  
  useEffect(() => {
    setTotal(
      quantity * (product.options?.length ? Number(product.price) + Number( product.options[selected]?.additionalPrice) : product.price)
    );
  }, [quantity, selected, product.options, product.price]);

  const {addToCart}=useCartStore();
  const handleCart=()=>{
    addToCart({
      id:product.id.toString(),
      title:product.title,
      img:product.img,
      price: total,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }),
      quantity: quantity,
   })
   toast.success('Add to cart success!',{
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  })
  }
   //save to localStorage
   useEffect(()=>{
    useCartStore.persist.rehydrate()
  },[])
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total.toString().slice(0, 6)}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.map((option, index) => (
          <button
            key={option.title}
            className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
            style={{
              background: selected === index ? "rgb(248 113 113)" : "white",
              color: selected === index ? "white" : "red",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500" onClick={handleCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
