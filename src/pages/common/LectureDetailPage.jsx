import LectureItem from "../../components/lecture/LectureItem";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function LectureDetailPage() {
  const { lectureId } = useParams();
  const { lectures } = useSelector((state) => state.lecture);
  const item = lectures.find((l) => l.lectureId === Number(lectureId));

  if (!item) return <div>강의를 찾을 수 없습니다.</div>;

  return <LectureItem item={item} mode="detail" />;
}

export default LectureDetailPage;
