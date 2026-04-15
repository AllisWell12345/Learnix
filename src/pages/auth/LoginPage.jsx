import React, { useState } from "react";
import "./LoginPage.css";
// import { login } from "../../services/authService.js";
import { NavLink, useNavigate } from "react-router-dom";
import eyeOn from "../../assets/img/Auth/eyeon.svg";
import eyeOff from "../../assets/img/Auth/eyeoff.svg";

function LoginPage() {

  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveId, setSaveId] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
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
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-top">
          <h1 className="login-title">로그인</h1>
          <p className="login-subtitle">Learnix에 오신 것을 환영합니다</p>
        </div>

        <div className="login-form">
          {/* 아이디 */}
          <div className="login-field">
            <label className="login-label">아이디</label>
            <input
              className="login-input"
              type="email"
              placeholder="아이디를 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* 비밀번호 */}
          <div className="login-field">
            <label className="login-label">비밀번호</label>
            <div className="login-input-wrap">
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
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

          {/* 아이디 저장 */}
          <label className="login-checkbox-label">
            <input
              type="checkbox"
              className="login-checkbox"
              checked={saveId}
              onChange={(e) => setSaveId(e.target.checked)}
            />
            <span className="login-checkbox-custom" />
            아이디 저장
          </label>

          {/* 로그인 버튼 */}
          <button
            className={`login-btn${loading ? " loading" : ""}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>

          {/* 회원가입 */}
          <div className="login-signup">
            <NavLink to="/signup">회원가입</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
