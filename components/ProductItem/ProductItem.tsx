"use client";

import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { useTranslation } from "react-i18next";
import { useSelectedOption } from "@/app/context/MyContext";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

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
  const { user } = useSelectedOption();
  const { cart, addToCart, removeFromCart } = useCart();
  const isProduct = cart.find((product) => product.id === id);
  const cartHandler = () => {
    if (user) {
      addToCart({ id, title, price, image });
      toast.success(t("Added to cart"));
    } else {
      toast.error(t("first login"));
    }
  };

  const isPersian = i18n.language === "fa";
  const displayedPrice = isPersian
    ? (price * 100000).toLocaleString("fa-IR")
    : price;
  const currency = isPersian ? "تومان" : "$";

  return (
    <div className="border-[2px] rounded-lg bg-white border-dashed border-gray-300 p-4">
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

      <div
        className={`mt-5 flex ${
          isPersian ? "flex-col" : "flex-row"
        } items-center justify-between`}
      >
        <p className="">
          {displayedPrice} {currency}
        </p>
        <p className={`text-xs ${isPersian ? "mt-2 text-center" : "ml-2"}`}>
          {category}
        </p>
      </div>
      <div className="flex items-center justify-between w-full  mt-8 mb-5">
        <Link href={`/${id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8 text-blue-400"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM15.375 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                clipRule="evenodd"
              />
            </svg>
        </Link>

        <div className="flex items-center gap-x-3">
          {!isProduct && (
            <div
              onClick={cartHandler}
              className="text-blue-400  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          {isProduct && (
            <button
              onClick={() => addToCart({ id, title, price, image })}
              className="w-7 h-7 flex items-center justify-center text-white rounded-lg p-2 bg-blue-400 text-center  "
            >
              +
            </button>
          )}
          {isProduct && <p className="font-bold text-blue-600">{isProduct.count}</p>}
          {isProduct && (
            <button
              onClick={() => removeFromCart(id)}
              className="w-7 h-7 flex items-center justify-center text-white rounded-lg p-2 bg-blue-400 text-center "
            >
              -
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
