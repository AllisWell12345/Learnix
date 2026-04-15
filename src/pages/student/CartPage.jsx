import { useState, useEffect } from "react";
// import axios from "axios";
import "./CartPage.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";
import TrashIcon from "../../assets/img/Icon/TrashIcon.png";

// 임시 데이터
const CART_LIST = [
  {
    userid: 1,
    lectureId: 1,
    title: "웹 개발 완전 정복 과정",
    subTitle: "기초부터 실전까지 웹 개발의 모든 것",
    category: "프론트엔드",
    price: 120000,
    members: 50,
    recruitEnd: "2026-04-25",
    studyStart: "2026-04-26",
    studyEnd: "2026-07-26",
  },
  {
    userid: 1,
    lectureId: 2,
    title: "React 마스터 클래스",
    subTitle: "고급 훅과 디자인 패턴 익히기",
    category: "프론트엔드",
    price: 150000,
    members: 30,
    recruitEnd: "2026-04-30",
    studyStart: "2026-05-01",
    studyEnd: "2026-08-01",
  },
  {
    userid: 1,
    lectureId: 3,
    title: "React 마스터 클래스",
    subTitle: "고급 훅과 디자인 패턴 익히기",
    category: "프론트엔드",
    price: 150000,
    members: 30,
    recruitEnd: "2026-04-30",
    studyStart: "2026-05-01",
    studyEnd: "2026-08-01",
  },
  {
    userid: 1,
    lectureId: 4,
    title: "React 마스터 클래스",
    subTitle: "고급 훅과 디자인 패턴 익히기",
    category: "프론트엔드",
    price: 150000,
    members: 30,
    recruitEnd: "2026-04-30",
    studyStart: "2026-05-01",
    studyEnd: "2026-08-01",
  },
];

function CartPage() {
  const [cartItems, setCartItems] = useState(CART_LIST);

  const totalCartPrice = cartItems.reduce((acc, cur) => acc + cur.price, 0);

  /*
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("");
        setCartItems(response.data); 
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchCartData();
  }, []);
  */

  return (
    <div className="content">
      <div className="cart-container">
        <div className="cart-header">
          <div className="cart-title-area">
            <div className="cart-title-bar" />
            <p className="cart-title">장바구니 ({cartItems.length})</p>
          </div>
          <button className="cart-clear-all-btn">전체 삭제</button>
        </div>

        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.lectureId} className="cart-card">
              <div className="cart-card-left">
                <div className="cart-item-img" />
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
                    <img src={StudentIcon} alt="" className="cart-icon" /> 모집
                    인원
                  </span>
                  <span className="cart-info-val">35/{item.members}명</span>
                </div>
                <div className="cart-info-col">
                  <span className="cart-info-label">
                    <img src={CalendarIcon} alt="" className="cart-icon" /> 학습
                    기간
                  </span>
                  <span className="cart-info-val">
                    {item.studyStart.slice(2)} ~ {item.studyEnd.slice(2)}
                  </span>
                </div>
              </div>

              <div className="cart-card-right">
                <span className="cart-price-tag">
                  {item.price.toLocaleString()}원
                </span>
                <div className="cart-action-btns">
                  <button className="cart-apply-btn">신청</button>
                  <button className="cart-btn-del">
                    <img
                      src={TrashIcon}
                      alt="삭제"
                      className="cart-trash-img"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-total-section">
          <div className="cart-total-box">
            <span className="cart-total-txt">
              총 가격 : {totalCartPrice.toLocaleString()}원
            </span>
            <button className="cart-final-btn">신청하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
