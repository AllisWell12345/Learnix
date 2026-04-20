import React, { useEffect, useState } from "react";
import "./ManagerDashboardPage.css";
import { getUsersAll } from "../../services/userService";
import { getLecturesAll } from "../../services/lectureService";
import users from "../../assets/img/Sidebar/manageruserselectIcon.svg";
import videos from "../../assets/img/Sidebar/managerlectureselectIcon.svg";
import recent from "../../assets/img/ManagerPage/recentIcon.svg";
import notice from "../../assets/img/ManagerPage/noticeIcon.svg";
import highlight from "../../assets/img/ManagerPage/highlightIcon.svg";
import profile from "../../assets/img/common/profileIcon.svg";

function ManagerDashboardPage() {
  const dummyNotices = [
    {
      id: 1,
      title: "시스템 정기 점검 안내",
      desc: "2026년 5월 1일 02:00 ~ 05:00 시스템 정기 점검이 예정되어 있습니다.",
      date: "2026-04-20",
      highlight: true,
    },
    {
      id: 2,
      title: "강의 카테고리 추가 안내",
      desc: "AI/머신러닝 카테고리가 새롭게 추가되었습니다.",
      date: "2026-04-15",
      highlight: false,
    },
    {
      id: 3,
      title: "강사 회원 가입 승인 프로세스 변경",
      desc: "강사 회원 가입 시 추가 인증 절차가 도입되었습니다.",
      date: "2026-04-10",
      highlight: false,
    },
    {
      id: 4,
      title: "수강 신청 시스템 개선 안내",
      desc: "장바구니 기능이 개선되어 더욱 편리하게 수강 신청이 가능합니다.",
      date: "2026-04-05",
      highlight: false,
    },
  ];

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalLectures, setTotalLectures] = useState(0);
  const [newLectures, setNewLectures] = useState(0);
  const [recentLogins, setRecentLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersAll();
        const lectures = await getLecturesAll();

        // 총 회원 수
        setTotalUsers(users.length);

        // 총 강의 수
        setTotalLectures(lectures.length);

        // 이번 달 신규 강의 수
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();
        const newLecturesCount = lectures.filter((l) => {
          if (!l.createdAt) return false;
          const d = new Date(l.createdAt);
          return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
        }).length;
        setNewLectures(newLecturesCount);

        // 최근 접속 기록 (lastLoginAt 기준 최근 5명)
        const recent = users
          .filter((u) => u.lastLoginAt && u.role !== "manager")
          .sort((a, b) => new Date(b.lastLoginAt) - new Date(a.lastLoginAt))
          .slice(0, 5);
        setRecentLogins(recent);
      } catch (err) {
        console.error("대시보드 데이터 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="dashboard-page">불러오는 중...</div>;

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
            <p className="dashboard-stat-value">
              {totalUsers.toLocaleString()} 명
            </p>
          </div>
          {/* <p className="dashboard-stat-change">
            <span className="dashboard-stat-arrow">///</span>
            /// &nbsp; 전월 대비
          </p> */}
        </div>

        <div className="dashboard-stat-card dashboard-stat-blue">
          <div className="dashboard-stat-icon dashboard-stat-icon-blue">
            <img src={videos} className="dashboard-videos-icon" />
          </div>
          <div className="dashboard-stat-info">
            <p className="dashboard-stat-label">총 강의 수</p>
            <p className="dashboard-stat-value">
              {totalLectures.toLocaleString()} 개
            </p>
          </div>
          <p className="dashboard-stat-change">
            +{newLectures}개
            &nbsp; 신규 강의
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
            {recentLogins.length > 0 ? (
              recentLogins.map((user, i) => (
                <div className="dashboard-login-item" key={i}>
                  <div className="dashboard-avatar">
                    <img src={profile} className="dasboard-profile-icon" />
                    <span
                      className={`dashboard-avatar-dot ${user.role === "teacher" ? "dot-green" : "dot-yellow"}`}
                    />
                  </div>
                  <div className="dashboard-login-info">
                    <p className="dashboard-login-name">{user.name}</p>
                    <p className="dashboard-login-email">{user.email}</p>
                  </div>
                  <span
                    className={`dashboard-role-badge ${user.role === "teacher" ? "badge-green" : "badge-lightgreen"}`}
                  >
                    {user.role === "teacher" ? "강사" : "수강생"}
                  </span>
                  <span className="dashboard-login-time">
                    {new Date(user.lastLoginAt).toLocaleString("ko-KR")}
                  </span>
                </div>
              ))
            ) : (
              <p className="dashboard-empty">최근 접속 기록이 없습니다.</p>
            )}
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
            {dummyNotices.map((notice) => (
              <div
                className={`dashboard-notice-item ${notice.highlight ? "notice-highlight" : ""}`}
                key={notice.id}
              >
                {notice.highlight && (
                    <img src={highlight} alt="하이라이트 표시" className="dashboard-highlight-icon"/>
                )}
                <div className="dashboard-notice-content">
                  <p className="dashboard-notice-title">{notice.title}</p>
                  <p className="dashboard-notice-desc">{notice.desc}</p>
                  <p className="dashboard-notice-date">{notice.date}</p>
                </div>
              </div>
            ))}
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
