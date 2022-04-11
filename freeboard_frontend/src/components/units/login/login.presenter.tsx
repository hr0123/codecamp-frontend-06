import * as S from "./login.styles";

export default function LoginUI() {
  return (
    <S.Wrapper>
      <S.Head>Login</S.Head>
      <S.Input type="text" placeholder="이메일을 입력해주세요." />
      <S.Input type="password" placeholder="비밀번호를 입력해주세요." />
      <S.CheckWrapper>
        <S.KeepLoginCheck src="/login_check.png" />
        <S.KeepLogin>로그인 상태 유지</S.KeepLogin>
      </S.CheckWrapper>
      <S.LoginButton>로그인하기</S.LoginButton>
      <S.BottomWrapper>
        <S.BottomButton>이메일 찾기</S.BottomButton>
        <S.BottomButton>비밀번호 찾기</S.BottomButton>
        <S.BottomButton>회원가입</S.BottomButton>
      </S.BottomWrapper>
    </S.Wrapper>
  );
}
