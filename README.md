## 📚 강의 등록 및 신청 플랫폼

### 단순 강의 사이트를 넘어선 취업 준비 플랫폼

## 🎯 프로젝트 목표

인터넷 강의를 수강하는 것처럼 쉽게 접근할 수 있고, 온라인 환경에서 학습과 취업 준비를 동시에 할 수 있는 환경을 제공하는 플랫폼을 설계한다.

## 🧩 주요 기능

### 1. 강의 종료 → 프로젝트 자동 연결

### 기능 구조

- 강의 완료 시 자동으로 프로젝트 열림
- 난이도 선택 가능
  - 기본 / 심화 / 실무형

### 예시 (프론트 기준)

- React 강의 완료 →
  - “Todo 앱 만들기” (기본)
  - “API 연동 게시판” (심화)
  - “실제 서비스 클론” (실무형)

### 2. 프로젝트 진행 환경 제공

### 기능

- 프로젝트 요구사항 제공 (기획서 느낌)
- 체크리스트 (해야 할 기능들)
- 프로젝트 결과물 업로드

### 추가하면 좋은 것

- 기본 템플릿 ( 문제 상황 ) 제공
- 단계별 힌트 시스템

### 3. 결과물 리뷰 ( 공개 여부 설정 가능 )

### 강사의 리뷰 ( 비공개도 접근 가능 )

- 강사의 피드백 가능
- 실무 기준 평가
- 해당 프로젝트에 관련된 예상 면접 질문 제공

### 타 수강생의 리뷰 ( 비공개는 접근 불가 )

- 수강생끼리 코드 리뷰 가능
- Q&A

### 📁 4. 내 포트폴리오

### 강의별 관리

- 강의별 프로젝트 결과물 관리
- 해당 프로젝트에 대한 회고 작성 가능

### 🎯 5. 면접 준비

### 해당 강의 내용 중 면접에서 질문할만한 이론적 내용 정리 제공

## ⚙️ 기술 스택

![REACT](https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=white)

## 1️⃣ Branch 명명 규칙

브랜치 prefix로 작업 성격을 구분합니다.

유형 설명 예시
| 유형 | 설명 | 예시 |
|------|------|------|
| feature | 새로운 기능 개발 | feature/lecture-create#12 |
| fix | 긴급 버그 수정 | fix/login-error#5 |

## 2️⃣ Commit Message 규칙

📌 Prefix 종류
| Prefix | 의미 |
|--------|------|
| [FEATURE] | 새로운 기능 추가 |
| [FIX] | 버그 수정 |
| [RENAME] | 파일/폴더명 변경 |
| [STYLE] | 코드 변경 없는 스타일 수정 |

📌 작성 방식 : [FEATURE] 강의 등록 기능 구현#12

✔️ 커밋 메시지를 통해 이슈 자동 종료

## 3️⃣ Issue & PR 규칙

📌 Issue 작성 규칙

제목 : [FEATURE] 강의 등록 기능 구현#12

Label: feature / fix

📌 PR 규칙

제목 : [FEATURE] 강의 등록 기능 구현#12

Assignee: 팀원 2명 지정

Label: feature / fix

## 4️⃣ 협업 프로세스

1. 기능 단위로 Issue 생성
2. 브랜치 생성 후 작업 진행
3. 작업 완료 후 push (⚠️ push 전 팀원에게 공유)
4. Pull Request 생성
5. 팀원 2명 모두 리뷰 진행
6. 리뷰 완료 후 1명이 merge
7. 전체 pull 받아 최신 상태 유지

## 컴포넌트 구조 설계

```bash
([App]
	├──MainLayOut
			├── Header
			├── Nav
			├── Side
			├── Outlet
						├── HomePage
									├── Searchbar (검색창)
									├── LectureItem (mode=box)
						├── LectureDetailPage (mode=box | mode=list) (강의상세조회)
									├── LectureItem (mode=detail | mode=myDetail)
						├── MyLecturePage (내 강의)
									├── LectureItem (mode=list)
						├── ProjectManagePage (프로젝트관리)
									├── LectureItem (mode=proList)
						├── InterviewManagePage (모의면접관리)
									├── LectureItem (mode=invList)
						├── ProjectTotalPage (프로젝트 전체 조회)
									├── ProjectItem (mode=list)
						├── ProjectDetailPage (프로젝트 상세 조회)
									├── ProjectItem (mode=detail)
						├── InterviewDetailPage (모의면접 상세 조회)
									├── interviewItem (mode=detail)
						
						├── CartPage (수강생-장바구니)
									├── CartItem
						├── ProjectPage (수강생-프로젝트 제출)
									├── Template
									├── ProjectItem (mode=myproj)
						├── ProjectRegistPage (수강생-프로젝트 작성)
									├── ProjectForm (mode=regist)
						├── ProjectEditPage (수강생-프로젝트 수정)
									├── ProjectForm (mode=edit)
						├── InterviewNoticePage (수강생-모의면접안내)
						├── InterVIewPracticePage (수강생-모의면접진행)
									├── InterviewQuestion
											
						├── LectureRegistPage (강사-강의등록)
									├── LectureForm (mode=regist)
						├── LectureEditPage (강의수정)
									├── LectureForm (mode=edit)
						├── TemplateRegistPage (강사-프로젝트템플릿등록)
									├── TemplateForm (mode=regist)
						├── TemplateEditPage (강사-프로젝트템플릿수정)
									├── TemplateForm (mode=edit)
						├── InterviewRegistPage (강사-모의면접등록)
									├── InterviewForm
						├── InterviewTotalPage (강사-모의면접 전체 조회)
									├── interviewItem (mode=list)
						
						
						├── ManagerDashboardPage (관리자-대시보드)
									├── userItem(mode=latest)
						├── UserManagePage (관리자-회원관리)
									├── SearchBar (검색창)
									├── userItem(mode=list)
						├── LectureManagePage (관리자-강의관리)
									├── SearchBar (검색창)
									├──LectureItem (mode=list)
						├── DataManagePage (관리자-자료관리)
									├── SearchBar (검색창)
									├── PotfolioItem
						
						├── LoginPage
						
						├── SignPage
									├── SignForm
									
			├── Footer
```

## 파일 구조 설계

```bash
[App]
[main]
[src]
	├──[assets]
				├──[img]
				├──[font]
	├──[components]
				├──[manager]
							├── userItem.jsx
							├── PortfolioItem.jsx
				├──[sign]
							├── SignForm.jsx
				├──[lecture]
							├── LectureItem.jsx
				├──[project]
							├── ProjectItem.jsx
							├── TemplateForm.jsx
							├── Template.jsx
							├── ProjectForm.jsx
				├──[interview]
							├── InterviewItem.jsx
							├── InterviewForm.jsx
							├── InterviewQuestion.jsx
				├── [layout]
							├── MainHeader.jsx
							├── UserHeader.jsx
							├── MainNavbar.jsx
							├── StudentNavbar.jsx
							├── TeacherNavbar.jsx
							├── StudentSidebar.jsx
							├── TeacherSidebar.jsx
							├── ManagerSidebar.jsx
							├── Footer.jsx
				├──[common]
							├── TwoButtonModal.jsx
							├── OneButtonModal.jsx
							├── Searchbar.jsx
	├──[firebase]
				├── config.js
	├──[hooks]
				├── useModal.js
	├──[layouts]
				├── MainLayout.jsx
				├── StudentLayout.jsx
				├── StudentPortfolioLayout.jsx
				├── TeacherLayout.jsx
				├── TeacherPortfolioLayout.jsx
				├── ManagerLayout.jsx
	├──[pages]
				├──[common]
							├── HomePage.jsx
							├── LectureDetailPage.jsx   
							├── MyLecturePage.jsx
							├── ProjectManagePage.jsx
							├── InterviewManagePage.jsx 
							├── ProjectTotalPage.jsx
							├── ProjectDetailPage.jsx   
							├── InterviewDetailPage.jsx  
				├──[student]
							├── CartPage.jsx
							├── ProjectPage.jsx
							├── ProjectRegistPage.jsx 
							├── ProjectEditPage.jsx 
							├── InterviewNoticePage.jsx
							├── InterviewPracticePage.jsx
				├──[teacher]
							├── LectureRegistPage.jsx  
							├── LectureEditPage.jsx  
							├── TemplateRegistPage.jsx  
							├── TemplateEditPage.jsx 
							├── InterviewRegistPage.jsx  
							├── InterviewTotalPage.jsx 
				├──[manager]
              ├── ManagerDashboardPage.jsx
              ├── UserManagePage.jsx
              ├── LectureManagePage.jsx
              ├── DataManagePage.jsx
        ├──[auth]
              ├── LoginPage.jsx
              ├── SignUpPage.jsx   /가영
	├──[services]
				├── cartService.js
				├── lectureService.js
				├── projectService.js
				├── interviewService.js
				├── authService.js
				├── userService.js
	├──[store]
				├── store.js
				├── cartSlice.js
				├── lectureSlice.js
				├── projectSlice.js
				├── interviewSlice.js
				├── authSlice.js
				├── userSlice.js
```
