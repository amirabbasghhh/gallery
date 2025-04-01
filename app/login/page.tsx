"use client"
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelectedOption } from "../context/MyContext";

const AuthForm = () => {
  const { t, i18n } = useTranslation("common");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter()
  const{fetchUser}=useSelectedOption()
  
  

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: isRegister
        ? Yup.string().required(t("name_required"))
        : Yup.string(),
      email: Yup.string().email(t("invalid_email")).required(t("email_required")),
      password: Yup.string().min(6, t("password_min")).required(t("password_required")),
    }),
    onSubmit: async (values) => {
        setIsLoading(true); 
        try {
          const url = isRegister ? "/api/register" : "/api/login";
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
      
          const data = await response.json();
      
          if (response.status === 201) {
            toast.success(data.message || "عملیات موفقیت‌آمیز بود!");
            if (isRegister) {
              setIsRegister(false);
              formik.resetForm();
            } else {
              await fetchUser()
              router.push('/');
            }
          } else {
            toast.error(data.message || "خطایی رخ داد!");
          }
        } catch (error) {
          toast.error((error as Error).message || "خطای شبکه!");
        } finally {
          setIsLoading(false); 
        }
      },
      
      
    validateOnChange: true,
    validateOnBlur: true,
  });

  
  const handleFormSwitch = () => {
    setIsRegister(!isRegister);
    formik.resetForm();
  };

  return (
    <div
      className={`flex justify-center items-center mt-10   ${
        i18n.language === "fa" ? "rtl" : "ltr"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-[80%] mx-auto xl:w-full max-w-md p-8 bg-blue-200 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? t("register") : t("login")}
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4 ">
          {isRegister && (
            <div>
              <input
                type="text"
                name="name"
                placeholder={t("name")}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`input-style bg-white ${
                  formik.errors.name && formik.touched.name
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.errors.name && formik.touched.name && (
                <span className="text-red-500 text-sm">
                  {formik.errors.name}
                </span>
              )}
            </div>
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder={t("email")}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`input-style bg-white ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-red-500 text-sm">{formik.errors.email}</span>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder={t("password")}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`input-style bg-white ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.errors.password && formik.touched.password && (
              <span className="text-red-500 text-sm">
                {formik.errors.password}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-blue-600 text-white rounded-md"
          >
              {isLoading ? t("loading") : isRegister ? t("register") : t("login")}
          </button>
        </form>
        <p className="text-center font-bold text-white mt-4">
          {isRegister ? t("have_account") : t("no_account")}{" "}
          <button
            onClick={handleFormSwitch}
            className="text-blue-600 underline"
          >
            {isRegister ? t("login") : t("register")}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
