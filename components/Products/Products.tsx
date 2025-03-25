"use client";
import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import { Skeleton } from "@mui/material";

const Categories = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) => (
  <div className="border-2 border-dashed border-red-500 rounded-md p-4 self-start">
    <p className="font-bold">Categories</p>
    <div>
      {categories.map((category) => (
        <div key={category} className="flex my-4 items-center space-x-2">
          <input
            type="radio"
            id={category}
            checked={selectedCategory === category}
            onChange={() => onCategoryChange(category)}
          />
          <label htmlFor={category} className="text-sm">
            {category}
          </label>
        </div>
      ))}
    </div>
  </div>
);

const ProductList = ({ products }: { products: any[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {products.length > 0 ? (
      products.map((product) => <ProductItem key={product.id} {...product} />)
    ) : (
      <p>Unable to load products. Please try again later.</p>
    )}
  </div>
);

const CategoriesAndProducts = () => {
  const categories = [
    "All",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle category selection change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category); // Ensure only one category is selected
  };

  // Fetch products from API based on selected category
  const fetchProducts = async (category: string) => {
    setLoading(true); // Show loading before fetching data
    try {
      const url =
        category === "All"
          ? "https://fakestoreapi.com/products"
          : `https://fakestoreapi.com/products/category/${category}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Reset products in case of error
    } finally {
      setLoading(false); // Hide loading after fetching is complete
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory); // Fetch products whenever selected category changes
  }, [selectedCategory]);

  return (
    <div className="grid grid-cols-[1fr_auto] px-42 my-20 gap-5 items-start">
      {/* بخش محصولات */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="100%" height={250} />
            ))}
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>

      {/* بخش Categories */}
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );
};

export default CategoriesAndProducts;
