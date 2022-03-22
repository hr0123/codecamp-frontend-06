export default function HelloDocumentPage() {

   function onClickHello() {
      const result = "반갑습니다"
      document.getElementById("hello").innerText=result
   }

   return(
      <button id="hello" onClick={onClickHello}>안녕하세요</button>
   )

}