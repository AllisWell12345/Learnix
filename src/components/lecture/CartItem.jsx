import "../../pages/student/CartPage.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";
import TrashIcon from "../../assets/img/Icon/TrashIcon.png";
import thumb from "../../assets/img/lectureThumb.png";

function CartItem({ item, onRemove, onApply, disabled = false }) {
  return (
    <div className="cart-card">
      <div className="cart-card-left">
        <img src={thumb} alt="강의 썸네일" className="cart-item-thumb" />
        <div className="cart-item-text">
          <span className="cart-category-badge">{item.category}</span>
          <p className="cart-item-name">{item.title}</p>
          <p className="cart-item-sub">{item.subTitle}</p>
        </div>
      </div>

      <div className="cart-card-center">
        <div className="cart-info-col">
          <span className="cart-info-label">모집 기간</span>
          <span className="cart-info-val">~{item.recruitEnd}</span>
        </div>

        <div className="cart-info-col">
          <span className="cart-info-label">
            <img src={StudentIcon} alt="" className="cart-icon" /> 모집 인원
          </span>
          <span className="cart-info-val">35/{item.members}명</span>
        </div>

        <div className="cart-info-col">
          <span className="cart-info-label">
            <img src={CalendarIcon} alt="" className="cart-icon" /> 학습 기간
          </span>
          <span className="cart-info-val">
            {item.studyStart.slice(2)} ~ {item.studyEnd.slice(2)}
          </span>
        </div>
      </div>

      <div className="cart-card-right">
        <span className="cart-price-tag">{item.price.toLocaleString()}원</span>

        <div className="cart-action-btns">
          <button
            type="button"
            className="cart-apply-btn"
            onClick={() => onApply(item)}
            disabled={disabled}
          >
            신청
          </button>

          <button
            type="button"
            className="cart-btn-del"
            onClick={() => onRemove(item)}
            disabled={disabled}
          >
            <img src={TrashIcon} alt="삭제" className="cart-trash-img" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;