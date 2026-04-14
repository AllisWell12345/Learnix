import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-notice">
          <div className="footer-text">
            <a>이용약관</a>
            <span>|</span>
            <a>개인정보처리방침</a>
            <span>|</span>
            <a>책임의 한계와 법적 고지</a>
            <span>|</span>
            <a>회원정보 고객센터</a>
          </div>
          <p className="footer-copy">
            Copyright 세얼간이 Corp. All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;