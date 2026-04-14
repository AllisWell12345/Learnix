import React from "react";
import "./Header.css";
import logo from "../../assets/img/Learnix-logo.png";
import mypageIcon from "../../assets/img/mypage-icon.png";
import logoutIcon from "../../assets/img/logout-icon.png";

function UserHeader() {
  return (
    <>
      <header header className="header">
        <div className="inner">

          <div className="header-left" />

          <div className="header-logo">
            <img src={logo} alt="Learnix 로고" className="header-logo-img" />
          </div>

          <div className="header-right">
            <button className="header-nav-btn">
            <img src={mypageIcon} alt="마이페이지" className="header-mypage-img" />
            <span className="header-nav-text">마이페이지</span>
            </button>

            <div className="header-nav-divider">|</div>

            <button className="header-nav-btn" onClick={handleLogout}>
            <img src={logoutIcon} alt="로그아웃" className="header-logout-img" />
            <span className="header-nav-text">로그아웃</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default UserHeader;
