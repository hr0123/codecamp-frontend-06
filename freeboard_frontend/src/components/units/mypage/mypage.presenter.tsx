import * as S from "./mypage.styles";
export default function MypageUI(props) {
  return (
    <S.Wrapper>
      <S.Left>
        <S.Head>MYPAGE</S.Head>
        <S.Pofile src="/writerPhoto.png" />
        <S.Name>{props.userInfo.name}</S.Name>
      </S.Left>
      <S.Right></S.Right>
    </S.Wrapper>
  );
}
