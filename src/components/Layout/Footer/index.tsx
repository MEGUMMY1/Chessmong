import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
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
  );
}
