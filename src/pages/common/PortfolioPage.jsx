import React from 'react'
import './PortfolioPage.css'

function PortfolioPage() {
  const testItems = [
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
  ];

  return (
    
      <div className="portfolio-container">
        <div className="portfolio-top-container">
          <div className="portfolio-title-area">
            <div className="portfolio-title-bar"></div>
            <p className="portfolio-title">프로젝트 관리</p>
          </div>
          <button className="portfolio-regist-btn">+ 프로젝트 등록</button>
        </div>
        <div className="portfolio-lec-container">
          <div className="portfolio-sub-title-area">
            <p className="portfolio-sub-title">대기 중인 강의</p>
            <div className="portfolio-current-number">1개</div>
          </div>
          <div className="portfolio-current-list">
            {/* LectureItem 컴포넌트 들어갈 자리 */}
            <div className="portfolio-lec-box">   
              <div className="test-item2">testitem</div>
            </div>
          </div>
        </div>
        <div className="portfolio-lec-container">
          <div className="portfolio-sub-title-area">
            <p className="portfolio-sub-title">끝난 강의</p>
            <div className="portfolio-end-number">{testItems.length}개</div>
          </div>
          <div className="portfolio-end-list">
            {/* LectureItem 컴포넌트 들어갈 자리 */}
            {testItems.map((item, index) => (   
              <div className="portfolio-lec-box">   
                <div key={index} className="test-item2">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default PortfolioPage
