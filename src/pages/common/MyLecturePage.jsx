import useModal from "../../hooks/useModal";

function MyLecturePage() {
  const { modal, openModal } = useModal();

  const handleDeleteTest = () => {
    openModal("DELETE", {
    mainMsg: "강의를 삭제하시겠습니까?",
    subMsg: "삭제 후엔 되돌릴 수 없습니다.",
    onDelete: () => console.log('삭제 모달 테스트')
  });
  }
  const handleTwoTest = () => {
    openModal("CONFIRM", {
    mainMsg: "강의를 신청하시겠습니까?",
    subMsg: "신청 완료 시 내 강의 페이지로 이동합니다.",
    onConfirm: () => console.log('투버튼 모달 테스트')
  });
  }
  const handleOneTest = () => {
    openModal("CHECK", {
    mainMsg: "강의가 신청되었습니다.",
    subMsg: "내 강의 페이지로 이동합니다.",
    onConfirm: () => console.log('원버튼 모달 테스트')
  });
  }

  return (
    <div>
      <button onClick={handleDeleteTest}>삭제모달테스트</button>
      <button onClick={handleTwoTest}>투버튼모달테스트</button>
      <button onClick={handleOneTest}>원버튼모달테스트</button>
      {modal}
    </div>
  );
}

export default MyLecturePage;
