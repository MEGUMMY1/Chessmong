import { useSetRecoilState } from "recoil";
import { modalState } from "../states/modalState";

export const useModal = () => {
  const setModal = useSetRecoilState(modalState);

  const openInputModal = (title: string, onConfirm: () => void) => {
    setModal({
      type: "input",
      title,
      onConfirm,
    });
  };

  const openAlertModal = (title: string, message: string) => {
    setModal({
      type: "alert",
      title,
      message,
    });
  };

  return { openInputModal, openAlertModal };
};
