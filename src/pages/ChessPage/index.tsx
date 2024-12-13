import ChessBoard from "../../components/ChessBoard";
import styles from "./ChessPage.module.scss";

export default function ChessPage() {
  return (
    <div className={styles.container}>
      <section className={styles.sectionContainer}>
        <section className={styles.leftSection}>
          <ChessBoard />
        </section>
        <section className={styles.rightSection}>유튜브 강의목록</section>
      </section>
    </div>
  );
}
