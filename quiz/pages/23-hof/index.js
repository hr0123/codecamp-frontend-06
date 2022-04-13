export default function QuizHofPage() {
  const onClickButton = (el) => (event) => {
    console.log(el);
  };

  return (
    <>
      <button onClick={onClickButton(123)}>HOF 연습 버튼</button>
    </>
  );
}
