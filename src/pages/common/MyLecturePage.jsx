import useModal from "../../hooks/useModal";
import "./MyLecturePage.css";

function MyLecturePage() {
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
    <div className="content">
      <div className="mylec-container">
        <div className="mylec-top-container">
          <div className="mylec-title-area">
            <div className="mylec-title-bar"></div>
            <p className="mylec-title">내 강의</p>
          </div>
          <button className="lec-regist-btn">+ 강의 등록</button>
        </div>
        <div className="mylec-lec-container">
          <div className="mylec-sub-title-area">
            <p className="mylec-sub-title">대기 중인 강의</p>
            <div className="mylec-current-number">1개</div>
          </div>
          <div className="mylec-current-list">
            {/* LectureItem 컴포넌트 들어갈 자리 */}
            <div className="mylec-lec-box">   
              <div className="test-item2">testitem</div>
            </div>
          </div>
        </div>
        <div className="mylec-lec-container">
          <div className="mylec-sub-title-area">
            <p className="mylec-sub-title">끝난 강의</p>
            <div className="mylec-end-number">{testItems.length}개</div>
          </div>
          <div className="mylec-end-list">
            {/* LectureItem 컴포넌트 들어갈 자리 */}
            {testItems.map((item, index) => (   
              <div className="mylec-lec-box">   
                <div key={index} className="test-item2">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLecturePage;
