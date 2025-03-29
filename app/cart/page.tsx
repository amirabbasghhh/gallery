"use client";

import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, addToCart } = useCart();
  const { t, i18n } = useTranslation("common");
  const isPersian = i18n.language === "fa";
  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = parseFloat(
    cart.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2)
  );
  
  const displayedPrice = isPersian
    ? (totalPrice * 100000).toLocaleString("fa-IR")
    : totalPrice;
    const displayedCount = isPersian
    ? totalCount.toLocaleString("fa-IR")
    : totalCount;
  const currency = isPersian ? "تومان" : "$";
  

  return (
    <div className="px-32 mx-auto flex gap-x-3 flex-row-reverse ">
      <div dir={i18n.language ==="fa" ?"rtl":"ltr"} className="border flex flex-col gap-y-5  items-start  py-3 px-6 rounded-lg border-blue-500 self-start">
        <p>{t("cart")}</p>
        <div className="text-nowrap flex gap-x-2">
          {t("total count")} : <p className="text-red-500 font-bold">{displayedCount}</p>
        </div>
        <div className="text-nowrap flex gap-x-2">
          {t("total price")} :<p className="text-blue-500 gap-x-4 font-bold">{displayedPrice} {currency}</p> 
        </div>
      </div>

      {cart.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 w-full">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center  justify-between gap-4 p-3 border"
            >
              <img src={item.image} alt={item.title} className="w-20" />
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-700 text-center mt-4">
                  {isPersian
                    ? (item.price * 100000).toLocaleString("fa-IR")
                    : item.price.toLocaleString()} {currency}

                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-3">
                <button
                  className=" w-8 h-8 flex items-center justify-center px-3 py-1 bg-red-400 text-white rounded-lg"
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </button>
                <p>{item.count}</p>
                {item.count > 0 && (
                  <button
                    className=" w-8 h-8 flex items-center justify-center px-3 py-1 bg-black text-white rounded-lg"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
