// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartPage.css";
import CartItem from "../../components/lecture/CartItem";
import { clearCart } from "../../store/cartSlice";

function CartPage() {
  const { items, totalPrice } = useSelector(
    (state) => state.cart,
  );
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="content">
      <div className="cart-container">
        <div className="cart-header">
          <div className="cart-title-area">
            <div className="cart-title-bar" />
            <p className="cart-title">장바구니 ({items.length})</p>
          </div>
          {items.length > 0 && (
            <button className="cart-clear-all-btn" onClick={handleClearCart}>
              전체 삭제
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">장바구니가 비어있습니다</p>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => (
                <CartItem key={item.lectureId} item={item} />
              ))}
            </div>

            <div className="cart-total-section">
              <div className="cart-total-box">
                <span className="cart-total-txt">
                  총 가격 : {totalPrice.toLocaleString()}원
                </span>
                <button className="cart-final-btn">신청하기</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
