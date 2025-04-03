"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface User {
  name: string;
  email: string;
}

type SelectedOptionContextType = {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<string>("all"); // مقدار پیش‌فرض
  const router = useRouter();
  const { t } = useTranslation();
  

    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    }
    useEffect(()=>{
       fetchUser()
    },[])

  // Logout function
  async function logout() {
    const toastId = toast.loading(t("loading"));
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setUser(null);
      toast.dismiss(toastId);
      toast.success(data.message);
      router.push("/login");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error in logging out");
    }
  }


  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const categoryFromUrl = searchParams.get("category") || "all";
      setSelectedOption(
        localStorage.getItem("selectedOption") || categoryFromUrl
      );
    }
  }, []);

  // ذخیره selectedOption در localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedOption", selectedOption);
    }
  }, [selectedOption]);

  const contextValue = useMemo(
    () => ({
      selectedOption,
      setSelectedOption,
      user,
      setUser,
      fetchUser,
      logout,
    }),
    [selectedOption, user]
  );

  return (
    <SelectedOptionContext.Provider value={contextValue}>
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
