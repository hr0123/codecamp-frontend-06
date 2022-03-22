import {OutLine, Head, My, Name, Title, TitleOne, TitleTwo, Content, Number, Question, Bottom, BottomGroup, BottomName, BottomMyName} from '../../../styles/quiz01'

export default function AAAPage() {
   //여기는 자바스크립트 쓰는 곳
    return (
    <OutLine>
      <Head>
        <My>마이</My>
        <img src='../profile.png' width={60} height={60}/>
        <Name>임정아</Name>
      </Head>
      <Title>
        <TitleOne>공지사항</TitleOne>
        <TitleOne>이벤트</TitleOne>
        <TitleTwo>FAQ</TitleTwo>
        <TitleOne>Q&A</TitleOne>
      </Title>
      <Content>
        <Number>Q.01</Number>
        <Question>리뷰 작성은 어떻게 하나요?</Question>
        <Number>Q.02</Number>
        <Question>리뷰 수정/삭제는 어떻게 하나요?</Question>
        <Number>Q.03</Number>
        <Question>아이디/비밀번호를 잊어버렸어요.</Question>
        <Number>Q.04</Number>
        <Question>회원탈퇴를 하고싶어요.</Question>
        <Number>Q.05</Number>
        <Question>출발지 설정은 어떻게 하나요?</Question>
        <Number>Q.06</Number>
        <Question>비밀번호를 변경하고 싶어요.</Question>
      </Content>
      <Bottom>
        <BottomGroup>
          <img src='../home.png' width={58} height={58}/>
          <BottomName>홈</BottomName>
        </BottomGroup>
        <BottomGroup>
          <img src='../location.png' width={58} height={58}/>
          <BottomName>잇츠로드</BottomName>
        </BottomGroup>
        <BottomGroup>
          <img src='../heart.svg' width={58} height={58}/>
          <BottomName>마이찜</BottomName>
        </BottomGroup>
        <BottomGroup>
          <img src='../people.svg' width={58} height={58}/>
          <BottomMyName>마이</BottomMyName>
        </BottomGroup>
      </Bottom>
    </OutLine>



  )
}