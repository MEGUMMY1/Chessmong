import { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { chessState } from "../../states/chessState";
import Chessground from "@react-chess/chessground";
import "../../assets/chessground.base.css";
import "../../assets/chessground.brown.css";
import "../../assets/chessground.cburnett.css";
import { Chess, SQUARES, Square } from "chess.js";
import { Key } from "chessground/types";
import Button from "../Button";
import styles from "./ChessBoard.module.scss";
import { useLectures } from "../../apis/get/getLecturesList";
import Spinner from "../Layout/Spinner";
import { Lecture } from "../../types/types";
import { timeAgo } from "../../utils/timeAgo";

export default function ChessBoard() {
  const [chess, setChess] = useRecoilState(chessState);
  const [turnColor, setTurnColor] = useState<"white" | "black">("white");
  const [history, setHistory] = useState<string[]>([chess.fen()]);
  const [lectures, setLectures] = useState<any[]>([]);
  const { data, isLoading } = useLectures(chess.fen());

  const changeTurn = useCallback(() => {
    setTurnColor(turnColor === "white" ? "black" : "white");
  }, [turnColor]);

  const undoMove = useCallback(() => {
    if (history.length > 1) {
      const lastFen = history[history.length - 2];
      const newChess = new Chess(lastFen);
      setChess(newChess);
      setHistory(history.slice(0, -1));
    }
  }, [history, setChess]);

  const toDests = (chessInstance: typeof chess) => {
    const dests = new Map();
    SQUARES.forEach((s) => {
      const ms = chessInstance.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to)
        );
    });
    return dests;
  };

  const config = {
    fen: chess.fen(),
    orientation: turnColor,
    turnColor: turnColor,
    highlight: {
      lastMove: true,
      check: true,
    },
    movable: {
      free: false,
      color: "both" as const,
      dests: toDests(chess),
    },
    events: {
      move: (orig: Key, dest: Key) => {
        const move = chess.move({
          from: orig as Square,
          to: dest as Square,
          promotion: "q",
        });
        if (move) {
          setHistory([...history, chess.fen()]);
          setChess(new Chess(chess.fen()));
        }
      },
    },
    premovable: {
      enabled: true,
      showDests: true,
    },
    draggable: {
      enabled: true,
      distance: 10,
      showGhost: true,
    },
  };

  useEffect(() => {
    if (data) {
      setLectures(data);
    }
  }, [data]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        event.preventDefault();
        undoMove();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undoMove]);

  const handleLectureClick = (link: string) => {
    window.open(link, "_blank");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <section className={styles.sectionContainer}>
        <section className={styles.section}>
          <div className={styles.chessContainer}>
            <Chessground key={chess.fen()} config={config} contained={true} />
          </div>
          <div className={styles.buttons}>
            <div onClick={changeTurn} role="button" tabIndex={0}>
              <Button onClick={undoMove}>흑백전환</Button>
            </div>
            <Button onClick={undoMove}>되돌리기</Button>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.listContainer}>
            {lectures.length > 0 ? (
              <div className={styles.innerContainer}>
                <ul className={styles.lectures}>
                  {lectures.map((lecture: Lecture, index: number) => (
                    <li key={index}>
                      <div
                        className={styles.lectureWrapper}
                        onClick={() => handleLectureClick(lecture.link)}
                      >
                        <img
                          className={styles.image}
                          src={lecture.image}
                          alt={lecture.title}
                          width={100}
                          height={80}
                        />
                        <div className={styles.lectureInfo}>
                          <h3 className={styles.title}>{lecture.title}</h3>
                          <div className={styles.subtitle}>
                            <p>{lecture.channelName}</p>
                            <p>·</p>
                            <p>{timeAgo(new Date(lecture.publishedAt))}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={styles.noResult}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/11610/11610982.png"
                  width={120}
                  height={120}
                  alt="결과 없음"
                />
                <p>현재 상태로 등록된 강의가 없습니다.</p>
              </div>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
