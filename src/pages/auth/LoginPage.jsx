import React, { useState } from "react";
import './LoginPage.css'
// import { login } from "../../services/authService.js";
import { NavLink } from "react-router-dom";

function LoginPage() {
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
      navigate("/")
    } catch (err) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
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
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
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
          className={`login-btn-login${loading ? " loading" : ""}`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        {/* 회원가입 */}
        <div className="login-signup-row">
          <NavLink to="/signup">회원가입</NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
