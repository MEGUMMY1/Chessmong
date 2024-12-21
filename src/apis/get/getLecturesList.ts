import { useQuery } from "react-query";
import BASE_URL from "../../constants/BASEURL";

const fetchLectures = async (fen: string, channelNames?: string) => {
    const response = await BASE_URL.get(`/lectures`, {
        params: { fen, channelNames },
    });

    if (response.status !== 200) {
        throw new Error("강의 목록을 불러오는 데 실패했습니다.");
    }

    return response.data;
};

export const useLectures = (fen: string, channelNames?: string) => {
    return useQuery(["lectures", fen, channelNames], () => fetchLectures(fen, channelNames), {
        enabled: !!fen,
    });
};
