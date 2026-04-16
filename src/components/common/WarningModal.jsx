import React from "react";
import WarningIcon from "../../assets/img/Modal/deleteIcon.svg";

/**
 * mainMsg = "메인 메시지", subMsg = "서브 메시지" onConfirm = 핸들러함수
 * @returns
 */
function WarningModal({ mainMsg, subMsg, onConfirm }) {
  return (
    <div className="modal-container">
      <div className="modal-box">
        <img src={WarningIcon} alt="모달 경고 아이콘" className="modal-icon" />
        <p className="mainMsg">{mainMsg}</p>
        <p className="subMsg">{subMsg}</p>
        <button className="modal-delete-btn" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
}

export default WarningModal;
