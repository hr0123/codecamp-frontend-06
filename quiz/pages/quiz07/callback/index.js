import { useState } from "react";
import axios from "axios";

export default function CallbackPromiseAsyncawaitPage() {
  // 📌2)초기값을 배열로
  const [arr, setArr] = useState([]);

  const onClickCallback = () => {
    // 1.주소(http://numbersapi.com/random?min=1&max=200)를 사용하여 임의의 숫자를 하나 불러오기
    const aaa = new XMLHttpRequest();
    // aaa.open("get", "http://numbersapi.com/random?min=1&max=200");
    aaa.open("get", "http://numbersapi.com/random?min=1&max=200");
    aaa.send();
    aaa.addEventListener("load", (res) => {
      //()=>{}부분이 콜백함수
      // 2.불러온 숫자를 가지고, 주소(https://koreanjson.com/posts/숫자)에 해당하는 게시물을 불러오기
      const num = res.target.response.split(" ")[0]; // 131(랜덤숫자)
      console.log(num);
      const bbb = new XMLHttpRequest();
      // bbb.open("get", `http://koreanjson.com/${num}`);
      bbb.open("get", `https://koreanjson.com/posts/${num}`);
      bbb.send();
      bbb.addEventListener("load", (res) => {
        // 3.불러온 게시물을 작성한 작성자(UserId)가 쓴 다른 게시물 목록을 주소(https://koreanjson.com/posts?userId=작성자ID)를 활용하여 불러오기
        const userId = JSON.parse(res.target.response).UserId;
        console.log(userId);
        const ccc = new XMLHttpRequest();
        // ccc.open("get", `http://koreanjson.com?userId=${userId}`);
        ccc.open("get", `https://koreanjson.com/posts?userId=${userId}`);
        ccc.send();
        ccc.addEventListener("load", (res) => {
          console.log(res.target); // 최종 결과값!!!
          // 📌3)필요한 데이터를, 배열로 타입변환 후 state에 담기
          setArr(JSON.parse(res.target.response));
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
  //   axios.get("http://numbersapi.com/random?min=1&max=200").then((res) => {
  //     return axios.get(`http://koreanjson.com/posts/${num}`);
  //   });
  //   .then((res) => {
  //     return axios.get(`http://koreanjson.com/posts/${num}`);
  //   })
  //   .then((res) => {
  //     console.log(res); // 최종 결과값!!!
  //   });
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
        setArr(res.data);
      });
    console.log("여기는 5번 입니다!!!");
  };

  // 위에서 아래로 로직작성 순서대로 화면에서 실행됨(Promise문제 해결)
  const onClickAsyncawait = async () => {
    const aaa = await axios.get("http://numbersapi.com/random?min=1&max=200");
    // const bbb = await axios.get("http://numbersapi.com/random?min=1&max=200");
    const num = aaa.data.split(" ")[0];
    // console.log(num);
    const bbb = await axios.get(`http://koreanjson.com/posts/${num}`);
    // console.log(bbb);
    const userId = bbb.data.UserId;
    const ccc = await axios.get(`http://koreanjson.com/posts?userId=${userId}`);
    console.log(ccc);
    setArr(ccc.data);
  };

  return (
    <div>
      <div>
        결과:<button onClick={onClickCallback}>Callback</button>
      </div>
      <div>
        결과:<button onClick={onClickPromise}>Promise</button>
      </div>
      <div>
        결과:<button onClick={onClickAsyncawait}>Async/Await</button>
      </div>
      <div>
        {/* 📌1)map매서드는 배열에만 사용가능하므로 */}
        {arr.map((el, index) => (
          <div key={el._id}>
            <div id={el._id}>{el.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
