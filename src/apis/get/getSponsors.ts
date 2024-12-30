import { useQuery } from "react-query";
import BASE_URL from "../../constants/BASEURL";

const fetchSponsors = async () => {
  const response = await BASE_URL.get(`/sponsors`);

  if (response.status !== 200) {
    throw new Error("후원자 목록을 불러오는 데 실패했습니다.");
  }

  return response.data;
};

export const useSponsors = () => {
  return useQuery(["sponsors"], () => fetchSponsors());
};
