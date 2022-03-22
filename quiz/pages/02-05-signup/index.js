import {Page, Wrapper,Head,Content,Text,Error,ContentPhone,Phone,ContentToken,Token,TokenButton,City,CitySelect,Gender,GenderSelect,SignupButton} from '../../../styles/quiz02-05-signup'

import {useState} from "react"

export default function Signup() {
   const[email,setEmail]=useState("")
   const[password,setPassword]=useState("")
   const[passwordCheck,setPasswordCheck]=useState("")
   const[emailError,setEmailError]=useState("")
   const[passwordError,setPasswordError]=useState("")
   const[token,setToken]=useState("")

   function onChangeEmail(event) {
      setEmail(event.target.value)
   }
   function onChangePassword(event) {
      setPassword(event.target.value)
   }
   function onChangePasswordCheck(event) {
      setPasswordCheck(event.target.value)
   }
   function onClickSignup() {
      if(email.includes("@")===false) {
         setEmailError("이메일이 올바르지 않습니다.")
      } else {
         setEmailError("")
      }
      if(password !== passwordCheck) {
         setPasswordError("비밀번호가 다릅니다.")
      } else {
         setPasswordError("")
      }
   }
   function onClickToken() {
      setToken(String(Math.floor(Math.random()*1000000)).padStart(6,"0"))
   }
   
   return(
      <Page>
         <Wrapper>
            <Head>코드캠프 회원가입</Head>
            <Content>
               <Text type="text" onChange={onChangeEmail} placeholder="이메일을 입력해 주세요."/>
               <Error style={{color: 'red'}}>{emailError}</Error>
               <Text type="text" placeholder="이름을 입력해 주세요."></Text>
               {/* <Error>이름이 올바르지 않습니다.</Error> */}
               <Text type="password" onChange={onChangePassword} placeholder="비밀번호를 입력해 주세요."/>
               <Error style={{color: 'red'}}>{passwordError}</Error>
               <Text type="password" onChange={onChangePasswordCheck} placeholder="비밀번호를 다시 입력해 주세요."/>
               <Error style={{color: 'red'}}>{passwordError}</Error>
            </Content>
            <ContentPhone>
               <Phone></Phone>
               -
               <Phone></Phone>
               -
               <Phone></Phone>
            </ContentPhone>
            <ContentToken>
               <Token>{token}</Token>
               <TokenButton onClick={onClickToken}>인증번호 전송</TokenButton>
            </ContentToken>
            <ContentToken>
               <Token>3:00</Token>
               <TokenButton>인증 완료</TokenButton>
            </ContentToken>
            <City>
               <CitySelect>지역을 선택하세요.</CitySelect>
               <CitySelect>서울</CitySelect>
               <CitySelect>경기</CitySelect>
               <CitySelect>인천</CitySelect>
            </City>
            <Gender>
               <GenderSelect type="radio"></GenderSelect>여성
               <GenderSelect type="radio"></GenderSelect>남성
            </Gender>
            <hr/>
            <SignupButton onClick={onClickSignup}>가입하기</SignupButton>
         </Wrapper>
      </Page>
   )
}