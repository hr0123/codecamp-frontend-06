export default function PromiseAllPage() {
  const onClickPromise = async () => {
    console.time("Promise 시작!!");

    const result1 = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("https://dog1.jpg");
      }, 3000);
      // reject() //에러시 실행됨
    }); // result에 url이 담김
    // }).then(res=>res) //await나오기 전 사용했음 // res=그냥이름=값:"철수"
    console.log(result1);

    const result2 = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("https://dog2.jpg");
      }, 1000);
    });
    console.log(result2);

    const result3 = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("https://dog3.jpg");
      }, 2000);
    });
    console.log(result3);

    console.timeEnd("Promise 시작!!");
  };

  // 3개 다 실행되기 전까지는 아래로 내려가지 않음=>총 3초 소요(*promise는 6초(3초+1초+2초) 소요)
  const onClickPromiseAll = async () => {
    // 1.하나하나씩 확인하는 방법
    // console.time("Promise.all 시작!!");
    // const result = await Promise.all([
    //   //result에 배열안에 각 url이 담기는게 담김
    //   new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve("https://dog1.jpg");
    //     }, 3000);
    //   }),
    //   new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve("https://dog2.jpg");
    //     }, 1000);
    //   }),
    //   new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve("https://dog3.jpg");
    //     }, 2000);
    //   }),
    // ]);
    // console.log(result);
    // console.timeEnd("Promise.all 시작!!");

    // 2.한방에 확인하는 방법 (for가 제일 빠름->forEach가 그다음으로 빠르지만 리턴을 안함->마지막 속도가 map_주로사용)
    console.time("Promise.all 시작!!");
    const result = await Promise.all(
      //result에 배열안에 각 url이 담기는게 담김
      ["https://dog1.jpg", "https://dog2.jpg", "https://dog3.jpg"].map(
        (el) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(el);
            }, 3000);
          })
      )
    );
    console.log(result);
    console.timeEnd("Promise.all 시작!!");
  };

  return (
    <div>
      <button onClick={onClickPromise}>Promise 연습하기!!</button>
      <button onClick={onClickPromiseAll}>Promise.all 연습하기!!</button>
    </div>
  );
}
