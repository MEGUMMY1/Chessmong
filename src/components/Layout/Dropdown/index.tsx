import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { modalState } from "../../../states/modalState";
import { useUploadRequest } from "../../../apis/post/postRequest";
import styles from "./Dropdown.module.scss";
import Icon from "../../../assets/icons/hamburger.png";
import useClickOutside from "../../../hooks/useClickOutside";

interface DropdownProps {
  toggleDropdown: () => void;
}

export default function Dropdown({ toggleDropdown }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const setModal = useSetRecoilState(modalState);
  const { mutate } = useUploadRequest();

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

  const handleSponsor = () => {
    setModal({
      type: "alert",
      title: "후원 안내",
      message:
        "저희는 취업 준비 중인 두 명의 개발자입니다.\n여러분의 소중한 후원은 서버 비용 지원에 큰 도움이 됩니다. \n체스몽에게 큰 힘이 되어 주셔서 감사합니다! \n\n국민은행 임○○ 561801-01-601221",
    });
  };

  const handleHamburgerClick = () => {
    setIsDropdownOpen((prev) => !prev);
    toggleDropdown();
  };

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  });

  return (
    <div ref={dropdownRef} className={styles.container}>
      <div className={styles.hamburger} onClick={handleHamburgerClick}>
        <img src={Icon} width={35} height={35} alt="햄버거 버튼" />
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
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
          <div className={styles.dropdownItem} role="button" tabIndex={0} onClick={handleSponsor}>
            후원 안내
          </div>
        </div>
      )}
    </div>
  );
}
