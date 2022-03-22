import {Page,Wrapper,Head,HeadLeft,WriterImg,WriterName,Name,Date,HeadRight,LinkImg,LocationImg,Title,PhotoImg,Content,VideoImg,Like,LikeImg,UnlikeImg} from '../../../styles/board02'
import {useRouter} from 'next/router'
import {useQuery,gql} from '@apollo/client'

// ✔ Playground Backend06에서 데이터 항목,타입 확인하는 것!
const FETCH_BOARD = gql`
   query fetchBoard($boardId:ID!){
      fetchBoard(boardId:$boardId){
         _id
         writer
         title
         contents
         createdAt
      }
   }
`

export default function FetchBoardPage() {
   const router = useRouter()
   console.log(router)

   const {data} = useQuery(FETCH_BOARD,{
      variables:{boardId:router.query.boardId}
   })
   console.log(data)


   //📌LocationImg 오른쪽 여백 없애기📌
   return(
      <Page>
         <Wrapper>
            <Head>
               <HeadLeft>
                  <WriterImg src='../../writerPhoto.png' width={46} height={46}/>
                  <WriterName>
                     <Name>{data?.fetchBoard.writer}</Name>
                     <Date>Date : {data?.fetchBoard.createdAt}</Date>
                  </WriterName>
               </HeadLeft>
               <HeadRight>
                  <LinkImg src='../../Link.png' width={26} height={13}/>
                  <LocationImg src='../../Location.png' width={19} height={26}/>
               </HeadRight>
            </Head>
            <Title>{data?.fetchBoard.title}</Title>
            <PhotoImg src='../../contentPhoto.png' width={996} height={480}/>
            <Content>{data?.fetchBoard.contents}</Content>
            <VideoImg src='../../Video.png' width={486} height={240}/>
            <Like>
               <LikeImg src='../../like.png' width={22} height={18}/>
               <UnlikeImg src='../../unlike.png' width={22} height={20}/>
            </Like>
         </Wrapper>
      </Page>
   )
}