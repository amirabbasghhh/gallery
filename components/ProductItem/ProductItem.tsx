"use client";

import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { useTranslation } from "react-i18next";
import { useSelectedOption } from "@/app/context/MyContext";
import toast from "react-hot-toast";

type ProductItemProps = {
  image: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

const ProductItem: React.FC<ProductItemProps> = ({
  image,
  id,
  title,
  price,
  description,
  category,
  rating,
}) => {
  const [value, setValue] = useState<number | null>(rating.rate);
  const { t, i18n } = useTranslation("common");
  const { user, logout } = useSelectedOption();
  const cartHandler=()=>{
    if(user){
      toast.success("به سبد خرید اضافه شد")
    }
    else{
      toast.error("ابتدا وارد حساب کاربری خود شوید")
    }
  }

  
  const isPersian = i18n.language === "fa";
  const displayedPrice = isPersian 
    ? (price * 100000).toLocaleString("fa-IR") 
    : price;
  const currency = isPersian ? "تومان" : "$";

  return (
    <div className="shadow-xl p-4">
      <img className="w-[80%] h-42 mx-auto" src={image} alt={title} />
      <div className="flex items-center justify-center my-4">
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
      <p className="overflow-hidden font-bold line-clamp-2 min-h-[60px]">
        {title.length > 20 ? title.slice(0, 20) + "..." : title}
      </p>

      <div className={`mt-5 flex ${isPersian ? "flex-col" : "flex-row"} items-center justify-between`}>
        <p className="p-2 rounded-md bg-green-500 text-white text-center w-full">
          {displayedPrice} {currency}
        </p>
        <p className={`text-xs ${isPersian ? "mt-2 text-center" : "ml-2"}`}>{category}</p>
      </div>

      <button onClick={cartHandler} className="text-white rounded-lg p-2 bg-blue-400 text-center mt-5 w-full">
        {t("Add_to_Cart")}
      </button>
    </div>
  );
};

export default ProductItem;
