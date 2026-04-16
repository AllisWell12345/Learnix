import { useState } from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import eyeOn from "../../assets/img/Auth/eyeon.svg";
import eyeOff from "../../assets/img/Auth/eyeoff.svg";
import useModal from "../../hooks/useModal";
import { login, logout } from "../../services/authService";
import { getUserByUid } from "../../services/userService";

function LoginPage() {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [isSaved, setIsSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { modal, openModal } = useModal();

  const handleDataChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value,
    });
  };

  // 로그인 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginForm;

    setError("");

    if (!email || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      const authUser = await login(email, password);
      const loginUser = await getUserByUid(authUser.uid);

      if (loginUser.active === false) {
        await logout();
        openModal("CHECK", {
          mainMsg: "가입 승인 대기중입니다.",
          subMsg: "관리자의 승인을 기다려주세요.",
          onConfirm: () => {
            setLoginForm({
              email: "",
              password: "",
            });
            setError("");
            setShowPassword(false);
            setIsSaved(false);
          },
        });
      } else {
        openModal("CHECK", {
          mainMsg: "로그인 성공!",
          subMsg: "확인 버튼을 클릭하면 홈페이지로 이동합니다!",
          onConfirm: () => navigate(`/${loginUser.role}`),
        });
      }
    } catch (error) {
      let errorMsg = "로그인 중 오류가 발생했습니다.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg = "올바른 이메일 형식이 아닙니다.";
          break;
        case "auth/invalid-credential":
          errorMsg = "등록된 계정이 아닙니다.";
          break;
        case "auth/too-many-requests":
          errorMsg =
            "너무 많은 로그인 시도가 있습니다. 잠시 후 다시 시도해주세요.";
          break;
      }
      openModal("WARNING", {
        mainMsg: "로그인 실패",
        subMsg: errorMsg,
        onConfirm: () => {
          setLoginForm({
            email: "",
            password: "",
          });
          setError("");
          setShowPassword(false);
          setIsSaved(false);
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-top">
          <h1 className="login-title">로그인</h1>
          <p className="login-subtitle">Learnix에 오신 것을 환영합니다</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {/* 아이디 */}
          <div className="login-field">
            <label className="login-label" htmlFor="email">
              이메일
            </label>
            <input
              className="login-input"
              id="email"
              type="text"
              placeholder="이메일을 입력하세요"
              value={loginForm.email}
              onChange={handleDataChange}
            />
          </div>

          {/* 비밀번호 */}
          <div className="login-field">
            <label className="login-label" htmlFor="password">
              비밀번호
            </label>
            <div className="login-input-wrap">
              <input
                className="login-input"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={loginForm.password}
                onChange={handleDataChange}
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="비밀번호 보기"
              >
                {showPassword ? (
                  <img
                    src={eyeOff}
                    alt="비밀번호 숨기기"
                    className="login-eye-icon"
                  />
                ) : (
                  <img
                    src={eyeOn}
                    alt="비밀번호 보기"
                    className="login-eye-icon"
                  />
                )}
              </button>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && <p className="login-error">{error}</p>}

          {/* 이메일 저장 */}
          <label className="login-checkbox-label">
            <input
              type="checkbox"
              className="login-checkbox"
              checked={isSaved}
              onChange={() => setIsSaved(!isSaved)}
            />
            <span className="login-checkbox-custom" />
            이메일 저장
          </label>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className={`login-btn${loading ? " loading" : ""}`}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
          {/* 회원가입 */}
          <div className="login-signup">
            <NavLink to="/signup">회원가입</NavLink>
          </div>
        </form>
      </div>

      {modal}
    </div>
  );
}

export default LoginPage;
