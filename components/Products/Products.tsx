"use client";

import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";
import Skeletons from "../skeleton/Skeleton";

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
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const BASE_URL = "https://fakestoreapi.com/products";
      const res = await fetch(BASE_URL);
      const data: product[] = await res.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value === selectedOption ? "" : value);
  };

  return (
    <div className="px-48 flex item-center gap-x-5 ">
      {loading ? (
        <Skeletons />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </div>
      )}
      <div className="border-2 border-blue-500 self-start rounded-lg">
        <p className="mb-3 font-bold text-center text-white bg-blue-500 py-2">
          categories
        </p>
        <FormGroup className="p-3">
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === "all"}
                onChange={handleChange}
                value="all"
              />
            }
            label="all"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === "electronics"}
                onChange={handleChange}
                value="electronics"
              />
            }
            label="electronics"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === "jewelery"}
                onChange={handleChange}
                value="jewelery"
              />
            }
            label="jewelery"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === "mens_clothing"}
                onChange={handleChange}
                value="mens_clothing"
              />
            }
            label="mens_clothing"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === "womens_clothing"}
                onChange={handleChange}
                value="womens_clothing"
              />
            }
            label="womens_clothing"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default Products;
