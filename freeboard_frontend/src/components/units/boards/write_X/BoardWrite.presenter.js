import {
  Page,
  Wrapper,
  Head,
  Wrapper1,
  Body1,
  Title,
  Half,
  Long,
  Big,
  Address,
  Short,
  SearchButton,
  WrapperImage,
  Image,
  Select,
  Select1,
  Select2,
  SignupButton,
} from "./BoardWrite.styles";

export default function BoardWriteUI(props) {
  return (
    <Page>
      <Wrapper>
        <Head>{props.isEdit ? "게시판 수정" : "게시판 등록"}</Head>
        <Wrapper1>
          <Body1>
            <Title>작성자</Title>
            <Half
              type="text"
              placeholder="이름을 적어주세요."
              onChange={props.onChangeName}
            />
          </Body1>
          <Body1>
            <Title>비밀번호</Title>
            <Half
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={props.onChangePassword}
            />
          </Body1>
        </Wrapper1>
        <Title>제목</Title>
        <Long
          type="text"
          placeholder="제목을 작성해주세요."
          onChange={props.onChangeTitle}
        />
        <Title>내용</Title>
        <Big
          type="text"
          placeholder="내용을 작성해주세요."
          onChange={props.onChangeContent}
        />
        <Title>주소</Title>
        <Address>
          <Short>07250</Short>
          <SearchButton>우편번호 검색</SearchButton>
        </Address>
        <Long type="text" />
        <Long type="text" />
        <Title>유튜브</Title>
        <Long type="text" placeholder="링크를 복사해주세요." />
        <Title>사진 첨부</Title>
        <WrapperImage>
          {/*📌회색박스 안에 +랑 "Upload" 어떻게? */}
          <Image src="../upload.png" width={78} height={78} />
          <Image src="../upload.png" width={78} height={78} />
          <Image src="../upload.png" width={78} height={78} />
        </WrapperImage>
        <Select>
          <Title>메인 설정</Title>
          {/*📌라디오 동시 선택 안되도록 어떻게?*/}
          <Select1 type="radio" id="youtube" class="main" />
          유튜브
          <Select2 type="radio" id="photo" class="main" />
          사진
        </Select>
        <SignupButton
          onClick={props.isEdit ? props.onClickUpdate : props.onClickPost}
          isActive={props.isEdit ? true : props.isActive}
        >
          {props.isEdit ? "수정하기" : "등록하기"}
        </SignupButton>
      </Wrapper>
    </Page>
  );
}
