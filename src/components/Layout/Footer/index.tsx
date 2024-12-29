import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.footerWrapper}>
        <a href="https://hits.seeyoufarm.com">
          <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fchessmong.com&count_bg=%232A3A47&title_bg=%232A3A47&icon=&icon_color=%23E7E7E7&title=views&edge_flat=true" />
        </a>
        <p className={styles.reservedTxt}>© CHESSMONG, All rights reserved.</p>
      </div>
    </footer>
  );
}
