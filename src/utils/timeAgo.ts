export function timeAgo(timestamp: Date): string {
  try {
    const now = new Date();
    const past = new Date(timestamp);

    if (isNaN(past.getTime())) {
      throw new Error("Invalid timestamp format");
    }

    const diff = (now.getTime() - past.getTime()) / 1000;
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (minutes < 1) {
      return "방금 전";
    } else if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days < 7) {
      return `${days}일 전`;
    } else if (days < 30) {
      return `${Math.floor(days / 7)}주 전`;
    } else if (months < 12) {
      return `${months}개월 전`;
    } else {
      return `${years}년 전`;
    }
  } catch (error) {
    console.error("timeAgo error:", error);
    return "시간 계산 오류";
  }
}
