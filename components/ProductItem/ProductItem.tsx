"use client";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { useTranslation } from "react-i18next";

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
  const{t}=useTranslation("common")

  return (
    <div className="shadow-xl p-4">
      <img className="w-[80%] h-42 mx-auto " src={image} alt={title} />
      <div className="flex items-center justify-center my-4">
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
        />

      </div>
      <p className=" overflow-hidden font-bold line-clamp-3 min-h-[60px]">{title.split(" ").slice(0, 5).join(" ")}</p>

      <div className="flex items-center justify-between mt-5">
        <p className="p-2 rounded-md bg-green-500 text-white text-center w-20">{price} $</p>
        <p>{category}</p>
      </div>
      <button className="text-white rounded-lg p-2 bg-blue-400 text-center mt-5 w-full">{t("Add_to_Cart")}</button>
    </div>
  );
};

export default ProductItem;
