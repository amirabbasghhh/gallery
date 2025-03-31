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
    <div className=" px-5 md:px-24 lg:px-36  mx-auto flex flex-col  gap-3 lg:flex-row-reverse ">
      <div
        dir={i18n.language === "fa" ? "rtl" : "ltr"}
        className="border-2 bg-white  flex flex-col gap-y-5  items-start w-full lg:w-auto  rounded-lg border-blue-500 self-start"
      >
        <p className="text-center text-white bg-blue-500 w-full py-2">{t("cart")}</p>
        <div className="text-nowrap flex gap-x-2 px-4 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
            />
          </svg>
          {t("total count")} :{" "}
          <p className="text-blue-500 font-bold">{displayedCount}</p>
        </div>
        <div className="text-nowrap flex gap-x-2 px-4 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          {t("total price")} :
          <p className="text-blue-500 gap-x-4 font-bold">
            {displayedPrice} {currency}
          </p>
        </div>
        <div className="text-nowrap flex gap-x-2 px-4 pt-1 pb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
          {t("status")} :
          <p className="text-blue-500 gap-x-4 font-bold">{t("pending")}</p>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-lg w-[80%] mx-auto mb-2">checkout</button>
      </div>

      {cart.length === 0 ? (
        <p className="text-center text-4xl font-extrabold">
      {t("Your cart is empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 w-full">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-2 border-gray-400 border-dashed rounded-xl justify-between gap-4 p-3 "
            >
              <img src={item.image} alt={item.title} className="w-20" />
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-700 text-center mt-4">
                  {isPersian
                    ? (item.price * 100000).toLocaleString("fa-IR")
                    : item.price.toLocaleString()}{" "}
                  {currency}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-3">
                <button
                  className=" w-8 h-8 flex items-center justify-center px-3 py-1 bg-blue-400 text-white rounded-lg"
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </button>
                <p className="font-bold text-blue-600">{item.count}</p>
                {item.count > 0 && (
                  <button
                    className=" w-8 h-8 flex items-center justify-center px-3 py-1 bg-blue-400 text-white rounded-lg"
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
