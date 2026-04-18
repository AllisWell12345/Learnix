import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import "./CartPage.css";
import CartItem from "../../components/lecture/CartItem";
import { getCartsByUserId, deleteCart } from "../../services/cartService";
import {
  createAttending,
  getAttendingsByUserId,
  getAttendingByUserAndLecture,
} from "../../services/attendingService";
import useModal from "../../hooks/useModal";

function CartPage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { modal, openModal } = useModal();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);

        if (!currentUser) {
          setItems([]);
          return;
        }

        const myCartItems = await getCartsByUserId(currentUser.userId);
        const myAttendings = await getAttendingsByUserId(currentUser.userId);

        const appliedIds = myAttendings.map((a) => Number(a.lectureId));

        // 이미 신청된 강의 제거 (DB + UI)
        const invalidItems = myCartItems.filter((item) =>
          appliedIds.includes(Number(item.lectureId)),
        );

        if (invalidItems.length > 0) {
          await Promise.all(
            invalidItems.map((item) => deleteCart(item.cartId)),
          );
        }

        const validItems = myCartItems.filter(
          (item) => !appliedIds.includes(Number(item.lectureId)),
        );

        setItems(validItems);
      } catch (error) {
        console.error(error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [currentUser]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.price || 0), 0);
  }, [items]);

  // ===================== 개별 삭제 =====================
  const handleRemoveItem = (item) => {
    openModal("CONFIRM", {
      mainMsg: "삭제하시겠습니까?",
      subMsg: "장바구니에서 해당 강의가 삭제됩니다.",
      onConfirm: async () => {
        try {
          setProcessing(true);

          await deleteCart(item.cartId);

          setItems((prev) => prev.filter((i) => i.cartId !== item.cartId));

          openModal("CHECK", {
            mainMsg: "삭제되었습니다.",
          });
        } catch (error) {
          console.error(error);
        } finally {
          setProcessing(false);
        }
      },
    });
  };

  // ===================== 개별 신청 =====================
  const handleApplyItem = (item) => {
    openModal("CONFIRM", {
      mainMsg: "신청하시겠습니까?",
      subMsg: "해당 강의를 신청합니다.",
      onConfirm: async () => {
        try {
          setProcessing(true);

          const already = await getAttendingByUserAndLecture(
            item.userId,
            item.lectureId,
          );

          if (!already) {
            await createAttending({
              userId: item.userId,
              lectureId: item.lectureId,
              title: item.title,
              subTitle: item.subTitle,
              season: item.season,
              category: item.category,
              members: item.members,
              studyStart: item.studyStart,
              studyEnd: item.studyEnd,
              status: "playing"
            });
          }

          await deleteCart(item.cartId);

          setItems((prev) => prev.filter((i) => i.cartId !== item.cartId));

          openModal("CHECK", {
            mainMsg: "신청되었습니다.",
          });
        } catch (error) {
          console.error(error);
        } finally {
          setProcessing(false);
        }
      },
    });
  };

  // ===================== 전체 삭제 =====================
  const handleClearCart = () => {
    openModal("CONFIRM", {
      mainMsg: "강의를 삭제하시겠습니까?",
      subMsg: "장바구니가 모두 삭제됩니다.",
      onConfirm: async () => {
        try {
          setProcessing(true);

          await Promise.all(items.map((item) => deleteCart(item.cartId)));

          setItems([]);

          openModal("CHECK", {
            mainMsg: "삭제되었습니다.",
          });
        } catch (error) {
          console.error(error);
        } finally {
          setProcessing(false);
        }
      },
    });
  };

  // ===================== 전체 신청 =====================
  const handleApplyAll = () => {
    openModal("CONFIRM", {
      mainMsg: "강의를 신청하시겠습니까?",
      subMsg: "장바구니의 모든 강의를 신청합니다.",
      onConfirm: async () => {
        try {
          setProcessing(true);

          for (const item of items) {
            const already = await getAttendingByUserAndLecture(
              item.userId,
              item.lectureId,
            );

            if (!already) {
              await createAttending({
                userId: item.userId,
                lectureId: item.lectureId,
                title: item.title,
                subTitle: item.subTitle,
                season: item.season,
                category: item.category,
                members: item.members,
                studyStart: item.studyStart,
                studyEnd: item.studyEnd,
                status: "playing"
              });
            }

            await deleteCart(item.cartId);
          }

          setItems([]);

          openModal("CHECK", {
            mainMsg: "신청되었습니다.",
          });
        } catch (error) {
          console.error(error);
        } finally {
          setProcessing(false);
        }
      },
    });
  };

  // ===================== UI =====================
  if (loading) return <div className="cart-loading">로딩중...</div>;

  return (
    <>
      {modal}

      <div className="content">
        <div className="cart-container">
          <div className="cart-header">
            <p className="cart-title">장바구니 ({items.length})</p>

            {items.length > 0 && (
              <button
                className="cart-btn-del"
                onClick={handleClearCart}
                disabled={processing}
              >
                전체 삭제
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="empty-cart">장바구니가 비어있습니다.</p>
          ) : (
            <>
              <div className="cart-list">
                {items.map((item) => (
                  <CartItem
                    key={item.cartId}
                    item={item}
                    onRemove={handleRemoveItem}
                    onApply={handleApplyItem}
                    disabled={processing}
                  />
                ))}
              </div>

              <div className="cart-total-section">
                <div className="cart-total-box">
                  <span className="cart-total-txt">
                    총 가격 : {totalPrice.toLocaleString()}원
                  </span>

                  <button
                    className="cart-final-btn"
                    onClick={handleApplyAll}
                    disabled={processing}
                  >
                    신청하기
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
