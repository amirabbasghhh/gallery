"use client";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";

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

  return (
    <div className="border border-dashed p-4">
      <img className="w-[80%] h-48 mx-auto " src={image} alt={title} />
      <div className="flex items-center justify-center my-4">
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
        />

      </div>
      <p className=" overflow-hidden line-clamp-3 min-h-[60px]">{title.split(" ").slice(0, 5).join(" ")}</p>

      <div className="flex items-center justify-between mt-5">
        <p>{price}$</p>
        <p>{category}</p>

      </div>
    </div>
  );
};

export default ProductItem;
