//게시물_상세_프레젠터
import {
  Page,
  Wrapper,
  Head,
  HeadLeft,
  WriterImg,
  WriterName,
  Name,
  Date,
  HeadRight,
  LinkImg,
  LocationImg,
  Title,
  PhotoImg,
  Content,
  VideoImg,
  Like,
  LikeImg,
  UnlikeImg,
} from "./BoardDetail.styles";
// import BoardDetailWrite from "../../boardComment/write/BoardCommentWrite.container";
// import BoardDetailList from "../../boardComment/list/BoardCommentList.container";

export default function BoardDetailUI(props) {
  //📌LocationImg 오른쪽 여백 없애기
  return (
    <Page>
      <Wrapper>
        <Head>
          <HeadLeft>
            <WriterImg src="../../writerPhoto.png" width={46} height={46} />
            <WriterName>
              <Name>{props.data?.fetchBoard.writer}</Name>
              <Date>Date : {props.data?.fetchBoard.createdAt}</Date>
            </WriterName>
          </HeadLeft>
          <HeadRight>
            <LinkImg src="../../Link.png" width={26} height={13} />
            <LocationImg src="../../Location.png" width={19} height={26} />
          </HeadRight>
        </Head>
        <Title>{props.data?.fetchBoard.title}</Title>
        <PhotoImg src="../../contentPhoto.png" width={996} height={480} />
        <Content>{props.data?.fetchBoard.contents}</Content>
        <VideoImg src="../../Video.png" width={486} height={240} />
        <Like>
          <LikeImg src="../../like.png" width={22} height={18} />
          <UnlikeImg src="../../unlike.png" width={22} height={20} />
        </Like>
      </Wrapper>
      {/* <BoardDetailWrite />
      <BoardDetailList /> */}
    </Page>
  );
}
