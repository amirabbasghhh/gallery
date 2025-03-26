"use client";
import React from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./LanguageContext";
import { Language } from "./types";

const languageMap: Record<
  string,
  { key: Language; label: string; flag: string }
> = {
  gb: { key: "gb", label: "English", flag: "GB" },
  fa: { key: "fa", label: "فارسی", flag: "IR" },
};

export default function AppLanguageSelector() {
  const { i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang: string) => {
    const selected = languageMap[lang as keyof typeof languageMap];
    setSelectedLanguage(selected);
    i18n.changeLanguage(lang);
    handleClose(); 
  };

  return (
    <div>
      <button onClick={handleClick} color="inherit">
        <img
          alt={selectedLanguage.label}
          className="rounded-full object-cover"
          height="40"
          src={`https://flagcdn.com/w80/${selectedLanguage.flag.toLowerCase()}.png`}
          style={{ width: "35px", height: "35px", objectFit: "cover" }}
        />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 200,
          },
        }}
      >
        {Object.values(languageMap).map(({ key, label, flag }) => (
          <MenuItem
            key={key}
            onClick={() => changeLanguage(key)}
            selected={selectedLanguage.key === key}
          >
            <img
              alt={`${label} Flag`}
              className="rounded-full object-cover"
              src={`https://flagcdn.com/w80/${flag.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w80/${flag.toLowerCase()}.png 2x`}
              style={{ width: "25px", height: "25px", objectFit: "cover", marginRight: 10 }}
            />
            {label}
            {selectedLanguage.key === key && (
              <span style={{ marginLeft: "auto" }}>✔️</span>
            )}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
