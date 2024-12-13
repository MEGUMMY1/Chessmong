import { useEffect, useState } from "react";
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

export default function ChessBoard() {
  const [chess, setChess] = useRecoilState(chessState);
  const [turnColor, setTurnColor] = useState<"white" | "black">("white");
  const [history, setHistory] = useState<string[]>([chess.fen()]);

  const changeTurn = () => {
    setTurnColor(turnColor === "white" ? "black" : "white");
  };

  const undoMove = () => {
    if (history.length > 1) {
      const lastFen = history[history.length - 2];
      const newChess = new Chess(lastFen);
      setChess(newChess);
      setHistory(history.slice(0, -1));
    }
  };

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "z") {
        event.preventDefault();
        undoMove();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [history, chess.fen(), undoMove]);

  return (
    <div className={styles.container}>
      <div className={styles.chessContainer}>
        <Chessground key={chess.fen()} config={config} contained={true} />
      </div>
      <div className={styles.buttons}>
        <div onClick={changeTurn} role="button" tabIndex={0}>
          <Button onClick={undoMove}>흑백전환</Button>
        </div>
        <Button onClick={undoMove}>되돌리기</Button>
      </div>
    </div>
  );
}
