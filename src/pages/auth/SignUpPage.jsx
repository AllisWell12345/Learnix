import { useState } from "react";
import "./SignupPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import eyeOn from "../../assets/img/Auth/eyeon.svg";
import eyeOff from "../../assets/img/Auth/eyeoff.svg";
import { logout, signUp } from "../../services/authService";
import { createUser, getUserByUid } from "../../services/userService";
import useModal from "../../hooks/useModal";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/userSlice";

function SignupPage() {
  const navigate = useNavigate();
  const { modal, openModal } = useModal();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birth: "",
    phone: "",
    gender: "",
    active: true,
  });

  const [role, setRole] = useState("student");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // 회원가입 함수
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, birth, phone, gender } = formData;

    setError("");

    if (
      !name ||
      !email ||
      !password ||
      !passwordConfirm ||
      !birth ||
      !phone ||
      !gender
    ) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자리 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    try {
      const authUser = await signUp(email, password);

      const newUser = {
        role: role,
        uid: authUser.uid,
        name,
        email,
        password,
        birth,
        phone,
        gender,
        active: role === "student" ? true : false,
        signupDate: new Date().toISOString().split("T")[0]
      };

      await createUser(newUser);
      const userData = await getUserByUid(authUser.uid);

      dispatch(setCurrentUser(userData));

      await logout();

      openModal("CHECK", {
        mainMsg: "가입이 완료되었습니다!",
        subMsg:
          role === "teacher"
            ? "강사는 관리자의 승인 후 이용이 가능합니다."
            : "환영합니다! 🎉 로그인 후 이용해주세요!",
        onConfirm: () => navigate("/login"),
      });
    } catch (error) {
      let errorMsg = "회원가입 중 오류가 발생했습니다.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg = "올바른 이메일 형식이 아닙니다.";
          break;
        case "auth/email-already-in-use":
          errorMsg = "이미 사용 중인 이메일입니다.";
          break;
        case "auth/weak-password":
          errorMsg = "비밀번호가 너무 약합니다.";
          break;
      }
      openModal("WARNING", {
        mainMsg: "회원가입 실패!",
        subMsg: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">회원가입</h1>

        <div className="signup-tab">
          <button
            className={`signup-tab-btn${role === "student" ? " active" : ""}`}
            onClick={() => setRole("student")}
          >
            수강생
          </button>
          <button
            className={`signup-tab-btn${role === "teacher" ? " active" : ""}`}
            onClick={() => setRole("teacher")}
          >
            강사
          </button>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          {/* 이름 */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="name">
              이름 <span className="signup-required">*</span>
            </label>
            <input
              className="signup-input"
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={handleDataChange}
            />
          </div>

          {/* 이메일 */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="email">
              이메일 <span className="signup-required">*</span>
            </label>
            <input
              className="signup-input"
              id="email"
              type="text"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleDataChange}
            />
          </div>

          {/* 비밀번호 */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="password">
              비밀번호 <span className="signup-required">*</span>
            </label>
            <div className="signup-input-wrap">
              <input
                className="signup-input"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호 입력"
                value={formData.password}
                onChange={handleDataChange}
              />
              <button
                type="button"
                className="signup-eye-btn"
                onClick={() => setShowPassword((v) => !v)}
              >
                <img
                  src={showPassword ? eyeOff : eyeOn}
                  alt=""
                  className="signup-eye-icon"
                />
              </button>
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="passwordConfirm">
              비밀번호 확인 <span className="signup-required">*</span>
            </label>
            <div className="signup-input-wrap">
              <input
                className="signup-input"
                id="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button
                type="button"
                className="signup-eye-btn"
                onClick={() => setShowPasswordConfirm((v) => !v)}
              >
                <img
                  src={showPasswordConfirm ? eyeOff : eyeOn}
                  alt=""
                  className="signup-eye-icon"
                />
              </button>
            </div>
          </div>

          {/* 생년월일 */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="birth">
              생년월일 <span className="signup-required">*</span>
            </label>
            <input
              className="signup-input"
              id="birth"
              type="date"
              value={formData.birth}
              onChange={handleDataChange}
              onClick={(e) => e.target.showPicker()}
            />
          </div>

          {/* 전화번호 */}
          <div className="signup-field">
            <label className="signup-label" htmlFor="phone">
              핸드폰 번호 <span className="signup-required">*</span>
            </label>
            <input
              className="signup-input"
              id="phone"
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={handleDataChange}
            />
          </div>

          {/* 성별 */}
          <div className="signup-field">
            <label className="signup-label">
              성별 <span className="signup-required">*</span>
            </label>
            <div className="signup-gender-row">
              <label className="signup-gender-label">
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  value="M"
                  checked={formData.gender === "M"}
                  onChange={handleDataChange}
                  className="signup-radio"
                />
                남성
              </label>
              <label className="signup-gender-label">
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  value="F"
                  checked={formData.gender === "F"}
                  onChange={handleDataChange}
                  className="signup-radio"
                />
                여성
              </label>
            </div>
          </div>

          {/* 에러 */}
          {error && <p className="signup-error">{error}</p>}

          {/* 버튼 */}
          <button
          type="submit"
            className={`signup-btn${loading ? " loading" : ""}`}
            disabled={loading}
          >
            {loading ? "처리 중..." : "가입하기"}
          </button>

          <div className="signup-login-row">
            <NavLink to="/login" className="signup-login-link">
              로그인 페이지로 돌아가기
            </NavLink>
          </div>
        </form>
      </div>
      {modal}
    </div>
  );
}

export default SignupPage;
