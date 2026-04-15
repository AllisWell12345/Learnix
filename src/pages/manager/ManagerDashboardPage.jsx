import React from "react";
import "./ManagerDashboardPage.css";
import users from "../../assets/img/Sidebar/manageruserselectIcon.svg";
import videos from "../../assets/img/Sidebar/managerlectureselectIcon.svg";
import recent from "../../assets/img/ManagerPage/recentIcon.svg";
import notice from "../../assets/img/ManagerPage/noticeIcon.svg";
// import profile from "../../assets/img/profileIcon.svg";

function ManagerDashboardPage() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-title-area">
        <h1 className="dashboard-title">
          <span className="dashboard-title-bar" />
          관리자 대시보드
        </h1>
      </div>

      {/* 통계 카드 */}
      <div className="dashboard-stats">
        <div className="dashboard-stat-card dashboard-stat-green">
          <div className="dashboard-stat-icon dashboard-stat-icon-green">
            <img src={users} className="dashboard-users-icon" />
          </div>
          <div className="dashboard-stat-info">
            <p className="dashboard-stat-label">총 회원 수</p>
            <p className="dashboard-stat-value">///</p>
          </div>
          <p className="dashboard-stat-change">
            <span className="dashboard-stat-arrow">///</span>
            /// &nbsp; 전월 대비
          </p>
        </div>

        <div className="dashboard-stat-card dashboard-stat-blue">
          <div className="dashboard-stat-icon dashboard-stat-icon-blue">
            <img src={videos} className="dashboard-videos-icon" />
          </div>
          <div className="dashboard-stat-info">
            <p className="dashboard-stat-label">총 강의 수</p>
            <p className="dashboard-stat-value">///</p>
          </div>
          <p className="dashboard-stat-change">
            <span className="dashboard-stat-arrow">///</span>
            /// &nbsp; 신규 강의
          </p>
        </div>
      </div>

      <div className="dashboard-bottom">
        {/* 최근 접속 기록 */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div className="dashboard-card-icon dashboard-card-icon-gray">
              <img src={recent} className="dashboard-recent-icon" />
            </div>
            <div>
              <p className="dashboard-card-title">최근 접속 기록</p>
              <p className="dashboard-card-desc">실시간 회원 활동 현황</p>
            </div>
          </div>

          <div className="dashboard-login-list">
            {/* {recentLogins.map((user, i) => (
              <div className="dashboard-login-item" key={i}>
                <div className="dashboard-avatar">
                  <img src={profile} className="dasboard-profile-icon"/>
                  <span className={`dashboard-avatar-dot ${user.role === "강사" ? "dot-green" : "dot-yellow"}`} />
                </div>
                <div className="dashboard-login-info">
                  <p className="dashboard-login-name">{user.name}</p>
                  <p className="dashboard-login-email">{user.email}</p>
                </div>
                <span className={`dashboard-role-badge ${user.role === "강사" ? "badge-green" : "badge-gray"}`}>
                  {user.role}
                </span>
                <span className="dashboard-login-time">{user.time}</span>
              </div>
            ))} */}
          </div>
        </div>

        {/* 중요 공지 */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div className="dashboard-card-icon dashboard-card-icon-orange">
              <img src={notice} className="dashboard-notice-icon" />
            </div>
            <div>
              <p className="dashboard-card-title">중요 공지</p>
              <p className="dashboard-card-desc">최신 시스템 알림</p>
            </div>
          </div>

          <div className="dashboard-notice-list">
            {/* {notices.map((notice) => (
              <div className={`dashboard-notice-item ${notice.highlight ? "notice-highlight" : ""}`} key={notice.id}>
                {notice.highlight && (
                  <div className="dashboard-notice-icon">
                    <img/>
                  </div>
                )}
                <div className="dashboard-notice-content">
                  <p className="dashboard-notice-title">{notice.title}</p>
                  <p className="dashboard-notice-desc">{notice.desc}</p>
                  <p className="dashboard-notice-date">{notice.date}</p>
                </div>
              </div>
            ))} */}
          </div>

          <div className="dashboard-notice-footer">
            <div className="dashboard-more-btn">모든 공지 보기 →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboardPage;
