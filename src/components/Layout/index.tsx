import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.scss";
import { LayoutProps } from "./Layout.types";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
}
