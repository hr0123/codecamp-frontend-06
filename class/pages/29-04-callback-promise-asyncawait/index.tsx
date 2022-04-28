import axios from "axios";

export default function CallbackPromiseAsyncawaitPage() {
  const onClickCallback = () => {
    const aaa = new XMLHttpRequest();
    aaa.open("get", "http://numbersapi.com/random?min=1&max=200");
    aaa.send();
    aaa.addEventListener("load", (res) => {
      //()=>{}부분이 콜백함수
      const num = res.target.response.split(" ")[0]; // 131(랜덤숫자)
      const bbb = new XMLHttpRequest();
      bbb.open("get", `http://koreanjson.com/${num}`);
      bbb.send();
      bbb.addEventListener("load", (res) => {
        const userId = res.target.response.UserId;
        const ccc = new XMLHttpRequest();
        ccc.open("get", `http://koreanjson.com?userId=${userId}`);
        ccc.send();
        ccc.addEventListener("load", (res) => {
          console.log(res); // 최종 결과값!!!
        });
      });
    });
  };

  //콜백지옥을 Promise(.then)로 전환해 문제점 해결
  // 직접 axios를 만드는 로직
  // new Promise((resolve, reject) => {
  //   // 외부에 요청하는 코드

  //   // 성공했을때 실행
  //   resolve("철수");
  //   // 실패했을때 실행
  //   reject("에러발생!!!");
  // })
  //   .then((res) => {}) // 성공했을때 실행
  //   .catch((err) => {}); // 실패했을때 실행

  // const onClickPromise = () => {
  //   axios
  //     .get("http://numbersapi.com/random?min=1&max=200")
  //     .then((res) => {
  //       return axios.get(`http://koreanjson.com/posts/${num}`);
  //     })
  //     .then((res) => {
  //       return axios.get(`http://koreanjson.com/posts/${num}`);
  //     })
  //     .then((res) => {
  //       console.log("최종 결과!!!");
  //     });
  // };

  // Promise의 문제 : 콘솔로그가 1->5->2->3->4 순서로 실행됨
  const onClickPromise = () => {
    console.log("여기는 1번 입니다!!!");
    axios
      .get("http://numbersapi.com/random?min=1&max=200")
      .then((res) => {
        console.log("여기는 2번 입니다!!!");
        const num = res.data.split(" ")[0]; // 71(랜덤숫자)
        return axios.get(`http://koreanjson.com/posts/${num}`);
      })
      .then((res) => {
        console.log("여기는 3번 입니다!!!");
        const userId = res.data.UserId;
        return axios.get(`http://koreanjson.com/posts?userId=${userId}`);
      })
      .then((res) => {
        console.log("여기는 4번 입니다!!!");
        console.log(res);
      });
    console.log("여기는 5번 입니다!!!");
  };

  // 위에서 아래로 로직작성 순서대로 화면에서 실행됨(Promise문제 해결)
  const onClickAsyncawait = async () => {
    const aaa = await axios.get("http://numbersapi.com/random?min=1&max=200");
    const bbb = await axios.get("http://numbersapi.com/random?min=1&max=200");
    const ccc = await axios.get("http://numbersapi.com/random?min=1&max=200");
  };

  return (
    <div>
      <button onClick={onClickCallback}>Callback 요청하기!!</button>
      <button onClick={onClickPromise}>Promise 요청하기!!</button>
      <button onClick={onClickAsyncawait}>Asyncawait 요청하기!!</button>
    </div>
  );
}
