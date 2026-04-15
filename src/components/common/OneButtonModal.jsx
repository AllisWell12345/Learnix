import React from "react";
import CheckIcon from "../../assets/img/Modal/checkIcon.svg";
import "../common/Modal.css";

/**
 * mainMsg = "메인 메시지", subMsg = "서브 메시지" onConfirm = 핸들러함수
 * @returns
 */
function OneButtonModal({ mainMsg, subMsg, onConfirm }) {
  return (
    <div className="modal-container">
      <div className="modal-box">
        <img src={CheckIcon} alt="모달 체크 아이콘" className="modal-icon" />
        <p className="mainMsg">{mainMsg}</p>
        <p className="subMsg">{subMsg}</p>
        <button className="modal-check-btn" onClick={onConfirm}>확인</button>
      </div>
    </div>
  );
}

export default OneButtonModal;
