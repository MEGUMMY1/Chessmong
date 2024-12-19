import styles from "./Layout.module.scss";
import { LayoutProps } from "./Layout.types";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {children}
        <footer className={styles.footer}>
          <p className={styles.reservedTxt}>© CHESSMONG, All rights reserved.</p>
          <a
            className={styles.contactBtn}
            href="mailto:leemhoon000@gmail.com?subject=[체스 문의]&body=안녕하세요,%0A체스 관련해서 문의드립니다."
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </footer>
      </div>
    </div>
  );
}
