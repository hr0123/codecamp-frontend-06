export default function CounterDocumentPage() {

   function onClickCounter() {
      const result = Number(document.getElementById("count").innerText) + 1
      document.getElementById("count").innerText=result
   }

   return(
      <>
         <div id="count">0</div>
         <button onClick={onClickCounter}>카운트올리기</button>
      </>
   )

}