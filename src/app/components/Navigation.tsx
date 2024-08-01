"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

type NavigationProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  favorites?: string[];
};

const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  setCurrentTab,
}) => {
  const router = useRouter();

  const handleNavigation = (tab: string) => {
    setCurrentTab(tab);
    router.push(tab === "home" ? "/" : "/favorites");
  };

  return (
    <nav className={styles.navigation}>
      <button
        onClick={() => handleNavigation("home")}
        className={currentTab === "home" ? styles.active : ""}
      >
        Головна
      </button>
      <button
        onClick={() => handleNavigation("favorites")}
        className={currentTab === "favorites" ? styles.active : ""}
      >
        Улюблене
      </button>
    </nav>
  );
};

export default Navigation;
