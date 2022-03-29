//QUIZ_상품_container컴포넌트
import ProductSignupUI from "./ProductSignup.presenter"
import {CREATE_PRODUCT, UPDATE_PRODUCT} from "./ProductSignup.queries"
import {useMutation} from '@apollo/client'
import {useState} from 'react'
import {useRouter} from 'next/router'

export default function ProductSignup(props){
   const [updateProduct] = useMutation(UPDATE_PRODUCT)
   const [createProduct] = useMutation(CREATE_PRODUCT)
   const [seller,setSeller] = useState("")
   const [name,setName] = useState("")
   const [detail,setDetail] = useState("")
   const [price,setPrice] = useState("")
   const [data,setData] = useState("")   //없어도되나?
   const router = useRouter()
   const [isActive,setIsActive] = useState(false)

   const onClickEdit = async () => {   //수정->동일productId의 상세페이지로 라우팅
      await updateProduct ({
         variables:{productId:router.query.productId,
            updateProductInput:{name:name,detail:detail,price:parseInt(price)}}
      })
      alert("게시글 수정에 성공하였습니다!!!")
      router.push(`/08-products/${router.query.productId}`)
   }
   const onClickNew = async () => {   //등록->동일productId의 상세페이지로 라우팅
      const result = await createProduct({
         variables:{
            seller:seller,
            createProductInput:{name:name,detail:detail,price:parseInt(price)}
         }
      })
      console.log(result.data)
      alert("게시글 등록에 성공하였습니다.")
      router.push(`/08-products/${result.data.createProduct._id}`)  //productId아님!!
   }
   const onChangeSeller = (event) => {
      setSeller(event.target.value)
      if(event.target.value!==""&&name!==""&&detail!==""&&price!==""){
         setIsActive(true)   //입력 빈칸 없으면 등록/수정하기버튼 색yellow
      } else {
         setIsActive(false)   //입력 빈칸 있으면 등록/수정하기버튼 색none
      }
   }
   const onChangeName = (event) => {
      setName(event.target.value)
      if(seller!==""&&event.target.value!==""&&detail!==""&&price!==""){
         setIsActive(true)   //입력 빈칸 없으면 등록/수정하기버튼 색yellow
      } else {
         setIsActive(false)   //입력 빈칸 있으면 등록/수정하기버튼 색none
      }
   }
   const onChangeDetail = (event) => {
      setDetail(event.target.value)
      if(seller!==""&&name!==""&&event.target.value!==""&&price!==""){
         setIsActive(true)   //입력 빈칸 없으면 등록/수정하기버튼 색yellow
      } else {
         setIsActive(false)   //입력 빈칸 있으면 등록/수정하기버튼 색none
      }
   }
   const onChangePrice = (event) => {
      setPrice(event.target.value)
      if(seller!==""&&name!==""&&detail!==""&&event.target.value!==""){
         setIsActive(true)   //입력 빈칸 없으면 등록/수정하기버튼 색yellow
      } else {
         setIsActive(false)   //입력 빈칸 있으면 등록/수정하기버튼 색none
      }
   }

   return(
      <ProductSignupUI
         isEdit={props.isEdit}
         onClickEdit={onClickEdit}
         onChangeSeller={onChangeSeller}
         onChangeName={onChangeName}
         onChangeDetail={onChangeDetail}
         onChangePrice={onChangePrice}
         isActive={isActive}
         onClickNew={onClickNew}
      />
   )
}