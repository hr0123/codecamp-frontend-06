import BoardDetailUI from './BoardDetail.presenter'

import {useQuery} from '@apollo/client'
import {useRouter} from 'next/router'
import {FETCH_BOARD} from './BoardDetail.queries'

export default function BoardDetail(){
   const router = useRouter()
   console.log(router)
   
   const {data} = useQuery(FETCH_BOARD,{
      variables:{number:Number(router.query.number)} 
   })
   console.log(data)
   
   return (
      <BoardDetailUI
         data={data}
      />
   )
}

