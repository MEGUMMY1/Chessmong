import styles from "./Layout.module.scss";
import { LayoutProps } from "./Layout.types";
import Logo from "../../assets/images/logo.png";

export default function Layout({ children }: LayoutProps) {
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.title}>
          <img
            src={Logo}
            width={160}
            alt="체스몽"
            style={{ cursor: "pointer" }}
            onClick={handleReset}
          />
        </div>
      </div>
      <div className={styles.inner}>{children}</div>
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <p className={styles.reservedTxt}>© CHESSMONG, All rights reserved.</p>
          <a
            className={styles.contactBtn}
            href="mailto:leemhoon000@gmail.com?subject=[체스 문의]&body=안녕하세요,%0A체스 관련해서 문의드립니다."
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
