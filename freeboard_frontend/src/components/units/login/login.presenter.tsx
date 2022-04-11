import * as S from "./login.styles";

export default function LoginUI(props) {
  return (
    <S.Wrapper>
      <S.Head>Login</S.Head>
      <S.Input
        onChange={props.onChangeEmail}
        type="text"
        placeholder="이메일을 입력해주세요."
      />
      <S.Input
        onChange={props.onChangePassword}
        type="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <S.CheckWrapper>
        <S.KeepLoginCheck src="/login_check.svg" />
        <S.KeepLogin>로그인 상태 유지</S.KeepLogin>
      </S.CheckWrapper>
      <S.LoginButton onClick={props.onClickLogin}>로그인하기</S.LoginButton>
      <S.BottomWrapper>
        <S.BottomButton>이메일 찾기</S.BottomButton>
        <S.BottomButton>비밀번호 찾기</S.BottomButton>
        <S.BottomButton onClick={props.onClickMovetoSignup}>
          회원가입
        </S.BottomButton>
      </S.BottomWrapper>
    </S.Wrapper>
  );
}
