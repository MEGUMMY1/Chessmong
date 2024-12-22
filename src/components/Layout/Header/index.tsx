import { useState } from "react";
import styles from "./Header.module.scss";
import Logo from "../../../assets/images/logo.png";
import Dropdown from "../Dropdown";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleReset = () => {
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.title}>
          <img
            src={Logo}
            width={160}
            alt="체스몽"
            style={{ cursor: "pointer" }}
            onClick={handleReset}
          />
          <Dropdown toggleDropdown={toggleDropdown} />
        </div>
      </div>
    </header>
  );
}
