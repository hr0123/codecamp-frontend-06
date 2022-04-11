import * as S from "./signup.styles";

export default function SignupUI() {
  return (
    <S.Wrapper>
      <S.Head>회원가입</S.Head>
      <S.Title>이메일</S.Title>
      <S.Input type="text" placeholder="이메일을 입력해주세요." />
      <S.Title>이름</S.Title>
      <S.Input type="text" placeholder="이름을 입력해주세요." />
      <S.Title>비밀번호</S.Title>
      <S.Input type="password" placeholder="비밀번호를 입력해주세요." />
      <S.Title>비밀번호 확인</S.Title>
      <S.Input type="password" placeholder="비밀번호를 입력해주세요." />
      <S.Button>회원가입하기</S.Button>
    </S.Wrapper>
  );
}
