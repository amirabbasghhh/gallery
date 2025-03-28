"use client";

import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Checkbox from "@mui/material/Checkbox";
import Skeletons from "../skeleton/Skeleton";
import { usePathname, useRouter } from "next/navigation";
import { useSelectedOption } from "@/app/context/MyContext";
import { useTranslation } from "react-i18next";

type product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const Products = () => {
  const [products, setProducts] = useState<product[]>([]);
  const { selectedOption, setSelectedOption } = useSelectedOption();
  const [loading, setLoading] = useState<boolean>(true);
  const router=useRouter()
  const {t}=useTranslation("common")

  useEffect(() => {
    setLoading(true)
    const fetchProducts = async () => {
      const BASE_URL = "https://fakestoreapi.com/products";
      let URL
      if(selectedOption==="all"){
        URL=BASE_URL
      }
      else{
        URL=BASE_URL+`/category/${selectedOption}`
      }
      const res = await fetch(URL);
      const data: product[] = await res.json();
      setProducts(data);
      setLoading(false);
    };
    

    fetchProducts();
  }, [selectedOption]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if(value !="all"){
      router.push(`?category=${value}`)
    }
    else{
      router.push('/')
    }
    setSelectedOption( value);
  };

  return (
    <div className="px-48 flex item-center gap-x-5">
      {loading ? (
        <Skeletons />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </div>
      )}
      <div className=" border-2 border-blue-500 self-start rounded-lg w-[200px] ">
        <p className="w-[200px] mb-3 font-bold text-center text-white bg-blue-500 py-2">
          {t("Categories")}
        </p>
        <div className="p-3 space-y-3 w-[200px]">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedOption === "all"}
              onChange={handleChange}
              value="all"
              id="all"
              className="mr-2"
            />
            <label htmlFor="all">{t("all")}</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedOption === "electronics"}
              onChange={handleChange}
              value="electronics"
              id="electronics"
              className="mr-2"
            />
            <label htmlFor="electronics">{t("electronics")}</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedOption === "jewelery"}
              onChange={handleChange}
              value="jewelery"
              id="jewelery"
              className="mr-2"
            />
            <label htmlFor="jewelery">{t("jewelery")}</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedOption === "men's clothing"}
              onChange={handleChange}
              value="men's clothing"
              id="men's clothing"
              className="mr-2"
            />
            <label className="whitespace-nowrap" htmlFor="mens_clothing">{t("mens_clothing")}</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedOption === "women's clothing"}
              onChange={handleChange}
              value="women's clothing"
              id="women's clothing"
              className="mr-2"
            />
            <label className="whitespace-nowrap" htmlFor="womens_clothing">{t("womens_clothing")}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
