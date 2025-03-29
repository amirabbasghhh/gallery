"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
interface User {
  name: string;
  email: string;
}

type SelectedOptionContextType = {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const SelectedOptionContext = createContext<
  SelectedOptionContextType | undefined
>(undefined);

export const SelectedOptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  async function fetchUser() {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUser(data.user);
  }

  async function logout() {
    const toastId = toast.loading("صبر کنید ...");
    const response = await fetch("/api/logout", { method: "POST" });
    const data = await response.json();
    setUser(null);
    if (response.status === 200) {
      toast.dismiss(toastId); 
      toast.success(data.message);
      router.push("/login");
    } else {
      toast.dismiss(toastId); 
      toast.error("Error in logging out");
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "all";
  const [selectedOption, setSelectedOption] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedOption") || categoryFromUrl;
    }
    return categoryFromUrl;
  });

  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption);
  }, [selectedOption]);

  return (
    <SelectedOptionContext.Provider
      value={{ selectedOption, setSelectedOption, user, fetchUser, logout }}
    >
      {children}
    </SelectedOptionContext.Provider>
  );
};

export const useSelectedOption = (): SelectedOptionContextType => {
  const context = useContext(SelectedOptionContext);
  if (!context) {
    throw new Error(
      "useSelectedOption must be used within a SelectedOptionProvider"
    );
  }
  return context;
};
