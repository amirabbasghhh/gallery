"use client";
import React, { useEffect, useRef, useState } from "react";
import AppLanguageSelector from "../LanguageSelector/AppLanguageSelector";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useSelectedOption } from "@/app/context/MyContext";

interface User {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const Header = () => {
  const { t,i18n } = useTranslation("common");
  
  const { setSelectedOption } = useSelectedOption();
  const { user, logout } = useSelectedOption();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="fixed px-20 z-20 top-0 right-0 left-0 flex items-center justify-between text-white bg-blue-500 mx-auto py-5  w-[100%]">
        <Link
          href="/"
          className="font-bold text-xl"
          onClick={() => setSelectedOption("all")}
        >
          {t("shop")}
        </Link>
        <AppLanguageSelector />

        <div className="flex item-center gap-x-10">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 p-2 bg-white text-gray-500 rounded-lg"
              >
                {user.name}
                <span className="text-lg">▼</span>
              </button>

              {isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute p-4 right-0 mt-1 w-70 bg-white border rounded-lg shadow-lg"
                >
                  <div className="flex items-center justify-between text-black  border-b border-gray-300 pb-4 mb-3">
                    <div className="flex flex-col gap-y-2">
                      <p className="text-lg">{user.name}</p>
                      <p className="text-green-500">موجودی : 0 تومان</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                  <div
                    className={`flex flex-col items-${
                      i18n.language === "fa" ? "end" : "start"
                    } gap-y-2 border-b border-gray-300 pb-3 text-black`}
                    dir={i18n.language === "fa" ? "rtl" : "ltr"}
                  >
                    <div className="flex justify-end flex-row-reverse gap-x-3 w-full p-2 rounded-lg hover:bg-blue-500 hover:text-white">
                      <p>{t("dashboard")}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-end flex-row-reverse gap-x-3 w-full p-2 rounded-lg hover:bg-blue-500 hover:text-white">
                      <p>{t("cart")}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-end flex-row-reverse gap-x-3 w-full p-2 rounded-lg hover:bg-blue-500 hover:text-white">
                      <p>{t("account detail")}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    dir={i18n.language === "gb" ? "rtl" : "ltr"}
                    className="flex items-center justify-end mt-2 gap-x-3 text-right w-full p-2 text-black rounded-lg hover:bg-red-500 hover:text-white "
                  >
                    <p>{t("sign out")}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              className="flex items-center gap-x-3 bg-white text-gray-600 rounded-lg px-2 py-1"
              href="/login"
            >
              {t("sign in")} | {t("sign up")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-7"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}
          <Link href="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
