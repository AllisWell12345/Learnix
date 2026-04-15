import React, { useState } from "react";
import "./SignupPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import eyeOn from "../../assets/img/Auth/eyeon.svg";
import eyeOff from "../../assets/img/Auth/eyeoff.svg";

function SignupPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("수강생");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [idChecked, setIdChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: 중복 확인 로직
  const handleIdCheck = () => {
    if (!userId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    setIdChecked(true);
    alert("사용 가능한 아이디입니다.");
  };

  // authService와 연결
  // TODO: signUp(email, password) 연결
  const handleSignup = async () => {
    setError("");
    if (
      !name ||
      !userId ||
      !password ||
      !passwordConfirm ||
      !email ||
      !birth ||
      !phone ||
      !gender
    ) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    if (!idChecked) {
      setError("아이디 중복 확인을 해주세요.");
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
      navigate("/login");
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSignup();
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">회원가입</h1>

        {/* 역할 탭 */}
        <div className="signup-tab">
          <button
            className={`signup-tab-btn${role === "수강생" ? " active" : ""}`}
            onClick={() => setRole("수강생")}
          >
            수강생
          </button>
          <button
            className={`signup-tab-btn${role === "강사" ? " active" : ""}`}
            onClick={() => setRole("강사")}
          >
            강사
          </button>
        </div>

        <div className="signup-form">
          {/* 이름 */}
          <div className="signup-field">
            <label className="signup-label">
              이름 <span className="signup-required">*</span>
            </label>
            <input
              className="signup-input"
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 아이디 */}
          <div className="signup-field">
            <label className="signup-label">
              아이디 <span className="signup-required">*</span>
            </label>
            <div className="signup-input-row">
              <input
                className="signup-input"
                type="text"
                placeholder="아이디를 입력하세요"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  setIdChecked(false);
                }}
              />
              <button className="signup-check-btn" onClick={handleIdCheck}>
                중복 확인
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="signup-field">
            <label className="signup-label">
              비밀번호 <span className="signup-required">*</span>
            </label>
            <div className="signup-input-wrap">
              <input
                className="signup-input"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="signup-eye-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="비밀번호 보기"
              >
                {showPassword ? (
                  <img
                    src={eyeOff}
                    alt="비밀번호 숨기기"
                    className="signup-eye-icon"
                  />
                ) : (
                  <img
                    src={eyeOn}
                    alt="비밀번호 보기"
                    className="signup-eye-icon"
                  />
                )}
              </button>
            </div>
            <p className="signup-hint">영문과 숫자를 조합한 8자리 이상</p>
          </div>

          {/* 비밀번호 확인 */}
          <div className="signup-field">
            <label className="signup-label">
              비밀번호 확인 <span className="signup-required">*</span>
            </label>
            <div className="signup-input-wrap">
              <input
                className="signup-input"
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="비밀번호를 다시 입력하세요"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button
                type="button"
                className="signup-eye-btn"
                onClick={() => setShowPasswordConfirm((v) => !v)}
                aria-label="비밀번호 보기"
              >
                {showPasswordConfirm ? (
                  <img
                    src={eyeOff}
                    alt="비밀번호 숨기기"
                    className="signup-eye-icon"
                  />
                ) : (
                  <img
                    src={eyeOn}
                    alt="비밀번호 보기"
                    className="signup-eye-icon"
                  />
                )}
              </button>
            </div>
          </div>

          {/* 이메일 */}
          <div className="signup-field">
            <label className="signup-label">
              이메일 <span className="signup-required">*</span>
            </label>
            <input
              className="signup-input"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 생년월일 */}
          <div className="signup-field">
            <label className="signup-label">
              생년월일 <span className="signup-required">*</span>
            </label>
            <input
              className="signup-input"
              type="date"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              onClick={(e) => e.target.showPicker()}
            />
          </div>

          {/* 핸드폰 번호 */}
          <div className="signup-field">
            <label className="signup-label">
              핸드폰 번호 <span className="signup-required">*</span>
            </label>
            <input
              className="signup-input"
              type="tel"
              placeholder="010-0000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
                  value="남성"
                  checked={gender === "남성"}
                  onChange={(e) => setGender(e.target.value)}
                  className="signup-radio"
                />
                남성
              </label>
              <label className="signup-gender-label">
                <input
                  type="radio"
                  name="gender"
                  value="여성"
                  checked={gender === "여성"}
                  onChange={(e) => setGender(e.target.value)}
                  className="signup-radio"
                />
                여성
              </label>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && <p className="signup-error">{error}</p>}

          {/* 가입하기 버튼 */}
          <button
            className={`signup-btn${loading ? " loading" : ""}`}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "처리 중..." : "가입하기"}
          </button>

          {/* 로그인 페이지로 */}
          <div className="signup-login-row">
            <NavLink to="/login" className="signup-login-link">
              로그인 페이지로 돌아가기
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
