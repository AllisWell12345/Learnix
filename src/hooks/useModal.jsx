import { useState } from "react";
import DeleteModal from "../components/common/DeleteModal";
import OneButtonModal from "../components/common/OneButtonModal";
import TwoButtonModal from "../components/common/TwoButtonModal";

function useModal() {
  const [modal, setModal] = useState(null);

  const closeModal = () => setModal(null);

  /**
   *
   * @param {String} type DELETE = 삭제, CHECK = 원버튼, CONFIRM = 투버튼
   * @param {Object} props {mainMsg: "", subMsg: "", onConfirm: 원버튼or투버튼 핸들러 함수 | onDelete: 삭제 핸들러 함수}
   */
  const openModal = (type, props = {}) => {
    switch (type) {
      case "DELETE":
        setModal(
          <DeleteModal
            {...props}
            onClose={closeModal}
            onDelete={() => {
              props.onDelete?.();
              closeModal();
            }}
          />,
        );
        break;

      case "CHECK":
        setModal(
          <OneButtonModal
            {...props}
            onConfirm={() => {
              props.onConfirm?.();
              closeModal();
            }}
          />,
        );
        break;

      case "CONFIRM":
        setModal(
          <TwoButtonModal
            {...props}
            onClose={closeModal}
            onConfirm={() => {
              props.onConfirm?.();
              closeModal();
            }}
          />,
        );
        break;

      default:
        break;
    }
  };

  return { modal, openModal, closeModal };
}

export default useModal;
