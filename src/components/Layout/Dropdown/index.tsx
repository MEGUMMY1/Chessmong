import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { modalState } from "../../../states/modalState";
import { useUploadRequest } from "../../../apis/post/postRequest";
import styles from "./Dropdown.module.scss";
import Icon from "../../../assets/icons/hamburger.png";
import useClickOutside from "../../../hooks/useClickOutside";
import { useSponsors } from "../../../apis/get/getSponsors";
import { formatCurrency } from "../../../utils/formatCurrency";

interface DropdownProps {
  toggleDropdown: () => void;
}

export default function Dropdown({ toggleDropdown }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const setModal = useSetRecoilState(modalState);
  const { mutate } = useUploadRequest();
  const { data: sponsors, isLoading, isError } = useSponsors();

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
    const sponsorList = isLoading
      ? "후원자 목록을 불러오는 중입니다..."
      : isError || !sponsors
      ? "후원자 목록을 불러오는 데 실패했습니다."
      : sponsors
          .map(
            (sponsor: { name: string; amount: number }) =>
              `${sponsor.name}: ${formatCurrency(sponsor.amount)}원`
          )
          .join("\n");

    setModal({
      type: "alert",
      title: "후원 안내",
      message: `저희는 취업 준비 중인 두 명의 개발자입니다.\n여러분의 소중한 후원은 서버 비용 지원에 큰 도움이 됩니다! \n\n국민은행 임○○ 561801-01-601221\n\n[후원자 목록]\n${sponsorList}\n\n`,
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
