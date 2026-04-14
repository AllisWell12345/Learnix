import React from "react";
import "./Header.css";
import logo from "../../assets/img/Learnix-logo.png";
import loginIcon from "../../assets/img/login-icon.png"; // 로그인 아이콘 이미지 경로

function MainHeader() {
  return (
    <>
      <header className="header">
        <div className="inner">
          <div className="header-left" />

          <div className="header-logo">
            <img src={logo} alt="Learnix 로고" className="header-logo-img" />
          </div>

          <div className="header-right">
            <button className="header-nav-btn">
              <img src={loginIcon} alt="로그인" className="header-login-img" />
              <span className="header-nav-text">로그인</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default MainHeader;
