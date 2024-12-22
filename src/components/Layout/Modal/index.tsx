import { useRecoilState } from "recoil";
import styles from "./Modal.module.scss";
import { useState, useEffect } from "react";
import { modalState } from "../../../states/modalState";
import useClickOutside from "../../../hooks/useClickOutside";
import Close from "../../../assets/icons/close-icon.svg";

export default function Modal() {
  const [modal, setModal] = useRecoilState(modalState);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const modalRef = useClickOutside<HTMLDivElement>(() => {
    setModal(null);
  });

  // URL 검증 함수
  const validateURL = (url: string) => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    return urlPattern.test(url);
  };

  useEffect(() => {
    if (inputValue && !validateURL(inputValue)) {
      setErrorMessage("유효한 유튜브 URL을 입력해주세요.");
    } else {
      setErrorMessage("");
    }
  }, [inputValue]);

  if (!modal) return null;

  const handleClose = () => {
    setModal(null);
    setInputValue("");
    setErrorMessage("");
  };

  const handleConfirm = () => {
    if (!inputValue) {
      setErrorMessage("유효한 값을 입력해주세요.");
      return;
    }

    if (modal.onConfirm) {
      modal.onConfirm(inputValue);
    }

    setModal(null);
    setInputValue("");
    setErrorMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!errorMessage && e.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <h2 className={styles.title}>{modal.title}</h2>
        <div className={styles.closeBtn} onClick={handleClose}>
          <img src={Close} width={30} alt="닫기" />
        </div>
        {modal.type === "input" ? (
          <div className={styles.wrapper}>
            <div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`${styles.input} ${errorMessage && styles.errorOutline}`}
                placeholder={modal.placeholder}
              />
              {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            </div>
            <button
              onClick={handleConfirm}
              className={`${styles.confirmButton} ${!!errorMessage && styles.disabled}`}
              disabled={!!errorMessage}
            >
              제출
            </button>
          </div>
        ) : (
          <p className={styles.message}>{modal.message}</p>
        )}
      </div>
    </div>
  );
}
