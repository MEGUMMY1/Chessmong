import { atom } from "recoil";

export type ModalContent = {
  type: "input" | "alert";
  title: string;
  message?: string;
  placeholder?: string;
  onConfirm?: (inputValue?: string) => void;
};

export const modalState = atom<ModalContent | null>({
  key: "modalState",
  default: null,
});
