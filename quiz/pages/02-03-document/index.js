export default function TokenDocumentPage() {

   function onClickToken() {
      const result = String(Math.floor(Math.random()*1000000)).padStart(6,"0")
      document.getElementById("token").innerText=result
   }

   return(
      <>
         <div id="token">000000</div>
         <button onClick={onClickToken}>인증번호 전송</button>
      </>
   )

}