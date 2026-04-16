import { useState } from "react";
import { signUp, login, logout, deleteAccount } from "../../services/authService";

function LectureDetailPage() {
  const [email, setEmail] = useState("test01@example.com");
  const [password, setPassword] = useState("pwd1234");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    try {
      const user = await signUp(email, password);
      setMessage(`회원가입 성공: ${user.email}`);
    } catch (error) {
      console.error(error);
      setMessage(`회원가입 실패: ${error.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      setMessage(`로그인 성공: ${email}`);
    } catch (error) {
      console.error(error);
      setMessage(`로그인 실패: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setMessage("로그아웃 성공");
    } catch (error) {
      console.error(error);
      setMessage(`로그아웃 실패: ${error.message}`);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      setMessage("회원탈퇴 성공");
    } catch (error) {
      console.error(error);
      setMessage(`회원탈퇴 실패: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Firebase Auth 테스트</h1>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="email"
          value={email}
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "300px", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "300px", padding: "8px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={handleSignUp}>회원가입</button>
        <button onClick={handleLogin}>로그인</button>
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={handleDeleteAccount}>회원탈퇴</button>
      </div>

      <p style={{ marginTop: "20px" }}>{message}</p>
    </div>
  );
}

export default LectureDetailPage;
