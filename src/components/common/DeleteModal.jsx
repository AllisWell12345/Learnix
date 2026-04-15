import React from "react";
import DeleteIcon from "../../assets/img/Modal/deleteIcon.svg";
import "../common/Modal.css";

/**
 * mainMsg = "메인 메시지", subMsg = "서브 메시지", onDelete = 핸들러 함수
 * @returns
 */
function DeleteModal({ mainMsg, subMsg, onDelete, onClose }) {
  return (
    <div className="modal-container" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <img src={DeleteIcon} alt="모달 삭제 아이콘" className="modal-icon" />
        <p className="mainMsg">{mainMsg}</p>
        <p className="subMsg">{subMsg}</p>
        <div className="two-btn-container">
          <button className="modal-delete-btn" onClick={onDelete}>확인</button>
          <button className="modal-cancle-btn" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
