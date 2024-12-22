import { useState } from "react";
import styles from "./Header.module.scss";
import Logo from "../../../assets/images/logo.png";
import Icon from "../../../assets/icons/hamburger.png";
import useClickOutside from "../../../hooks/useClickOutside";
import { useSetRecoilState } from "recoil";
import { modalState } from "../../../states/modalState";
import { useUploadRequest } from "../../../apis/post/postRequest";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const setModal = useSetRecoilState(modalState);
  const { mutate } = useUploadRequest();

  const handleReset = () => {
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  });

  const handleUploadRequest = () => {
    setModal({
      title: "업로드 요청",
      type: "input",
      placeholder: "유튜브 링크를 입력하세요",
      onConfirm: (link?: string) => {
        mutate(link!, {
          onSuccess: () => {
            setModal(null);
          },
          onError: () => {
            setModal({
              title: "업로드 요청",
              type: "input",
              placeholder: "유튜브 링크를 입력하세요",
              onConfirm: () => {},
              message: "유효한 유튜브 URL을 제출하세요.",
            });
          },
        });
      },
    });
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
          <div className={styles.hamburger} onClick={toggleDropdown}>
            <img src={Icon} width={35} alt="햄버거 버튼" />
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdown} ref={dropdownRef}>
              <div
                className={styles.dropdownItem}
                role="button"
                tabIndex={0}
                onClick={handleUploadRequest}
              >
                업로드 요청
              </div>
              <a
                className={styles.dropdownItem}
                href="mailto:leemhoon000@gmail.com?subject=[체스 문의]&body=안녕하세요,%0A체스 관련해서 문의드립니다."
                target="_blank"
                rel="noopener noreferrer"
              >
                기능 요청
              </a>
              <div className={styles.dropdownItem} role="button" tabIndex={0}>
                후원 문의
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
