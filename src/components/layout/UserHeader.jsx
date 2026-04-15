import React from "react";
import "./Header.css";
import logo from "../../assets/img/Header/Learnix-logo.png";
import mypageIcon from "../../assets/img/Header/mypageIcon.svg";
import logoutIcon from "../../assets/img/Header/logoutIcon.svg";

function UserHeader() {
  return (
    <>
      <header className="header">
        <div className="inner">
          <div className="header-left" />

          <div className="header-logo">
            <img src={logo} alt="Learnix 로고" className="header-logo-img" />
          </div>

          <div className="header-right">
            <div className="header-nav-btn">
              <img
                src={mypageIcon}
                alt="마이페이지"
                className="header-mypage-img"
              />
              <span className="header-nav-text">마이페이지</span>
            </div>

            <div className="header-nav-divider">|</div>

            <div className="header-nav-btn">
              <img
                src={logoutIcon}
                alt="로그아웃"
                className="header-logout-img"
              />
              <span className="header-nav-text">로그아웃</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default UserHeader;
