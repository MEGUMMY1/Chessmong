import { useMutation } from "react-query";
import BASE_URL from "../../constants/BASEURL";

const uploadRequest = async (link: string): Promise<void> => {
  const response = await BASE_URL.post("/lectures/upload-request", link);

  if (response.status !== 201) {
    throw new Error(response.data?.message || "유효성 검사에 실패했습니다.");
  }
};

export const useUploadRequest = () => {
  return useMutation(uploadRequest);
};
