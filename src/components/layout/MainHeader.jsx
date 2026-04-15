import React from "react";
import "./Header.css";
import logo from "../../assets/img/Header/Learnix-logo.png";
import loginIcon from "../../assets/img/Header/loginIcon.svg";
import { useNavigate } from "react-router-dom";

function MainHeader() {

  const navigate = useNavigate();
  const handleLoginClick = () => navigate('/login');

  return (
    <>
      <header className="header">
        <div className="inner">
          <div className="header-left" />

          <div className="header-logo">
            <img src={logo} alt="Learnix 로고" className="header-logo-img" />
          </div>

          <div className="header-right">
            <div className="header-nav-btn" onClick={handleLoginClick}>
              <img src={loginIcon} alt="로그인" className="header-login-img" />
              <span className="header-nav-text">로그인</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default MainHeader;
