import { useState } from "react";
import axios from "axios";

export default function CallbackPromiseAsyncawaitPage() {
  // ๐2)์ด๊ธฐ๊ฐ์ ๋ฐฐ์ด๋ก
  const [arr, setArr] = useState([]);

  const onClickCallback = () => {
    // 1.์ฃผ์(http://numbersapi.com/random?min=1&max=200)๋ฅผ ์ฌ์ฉํ์ฌ ์์์ ์ซ์๋ฅผ ํ๋ ๋ถ๋ฌ์ค๊ธฐ
    const aaa = new XMLHttpRequest();
    // aaa.open("get", "http://numbersapi.com/random?min=1&max=200");
    aaa.open("get", "http://numbersapi.com/random?min=1&max=200");
    aaa.send();
    aaa.addEventListener("load", (res) => {
      //()=>{}๋ถ๋ถ์ด ์ฝ๋ฐฑํจ์
      // 2.๋ถ๋ฌ์จ ์ซ์๋ฅผ ๊ฐ์ง๊ณ , ์ฃผ์(https://koreanjson.com/posts/์ซ์)์ ํด๋นํ๋ ๊ฒ์๋ฌผ์ ๋ถ๋ฌ์ค๊ธฐ
      const num = res.target.response.split(" ")[0]; // 131(๋๋ค์ซ์)
      console.log(num);
      const bbb = new XMLHttpRequest();
      // bbb.open("get", `http://koreanjson.com/${num}`);
      bbb.open("get", `https://koreanjson.com/posts/${num}`);
      bbb.send();
      bbb.addEventListener("load", (res) => {
        // 3.๋ถ๋ฌ์จ ๊ฒ์๋ฌผ์ ์์ฑํ ์์ฑ์(UserId)๊ฐ ์ด ๋ค๋ฅธ ๊ฒ์๋ฌผ ๋ชฉ๋ก์ ์ฃผ์(https://koreanjson.com/posts?userId=์์ฑ์ID)๋ฅผ ํ์ฉํ์ฌ ๋ถ๋ฌ์ค๊ธฐ
        const userId = JSON.parse(res.target.response).UserId;
        console.log(userId);
        const ccc = new XMLHttpRequest();
        // ccc.open("get", `http://koreanjson.com?userId=${userId}`);
        ccc.open("get", `https://koreanjson.com/posts?userId=${userId}`);
        ccc.send();
        ccc.addEventListener("load", (res) => {
          console.log(res.target); // ์ต์ข ๊ฒฐ๊ณผ๊ฐ!!!
          // ๐3)ํ์ํ ๋ฐ์ดํฐ๋ฅผ, ๋ฐฐ์ด๋ก ํ์๋ณํ ํ state์ ๋ด๊ธฐ
          setArr(JSON.parse(res.target.response));
        });
      });
    });
  };

  //์ฝ๋ฐฑ์ง์ฅ์ Promise(.then)๋ก ์ ํํด ๋ฌธ์ ์  ํด๊ฒฐ
  // ์ง์  axios๋ฅผ ๋ง๋๋ ๋ก์ง
  // new Promise((resolve, reject) => {
  //   // ์ธ๋ถ์ ์์ฒญํ๋ ์ฝ๋

  //   // ์ฑ๊ณตํ์๋ ์คํ
  //   resolve("์ฒ ์");
  //   // ์คํจํ์๋ ์คํ
  //   reject("์๋ฌ๋ฐ์!!!");
  // })
  //   .then((res) => {}) // ์ฑ๊ณตํ์๋ ์คํ
  //   .catch((err) => {}); // ์คํจํ์๋ ์คํ

  // const onClickPromise = () => {
  //   axios.get("http://numbersapi.com/random?min=1&max=200").then((res) => {
  //     return axios.get(`http://koreanjson.com/posts/${num}`);
  //   });
  //   .then((res) => {
  //     return axios.get(`http://koreanjson.com/posts/${num}`);
  //   })
  //   .then((res) => {
  //     console.log(res); // ์ต์ข ๊ฒฐ๊ณผ๊ฐ!!!
  //   });
  // };

  // Promise์ ๋ฌธ์  : ์ฝ์๋ก๊ทธ๊ฐ 1->5->2->3->4 ์์๋ก ์คํ๋จ
  const onClickPromise = () => {
    console.log("์ฌ๊ธฐ๋ 1๋ฒ ์๋๋ค!!!");
    axios
      .get("http://numbersapi.com/random?min=1&max=200")
      .then((res) => {
        console.log("์ฌ๊ธฐ๋ 2๋ฒ ์๋๋ค!!!");
        const num = res.data.split(" ")[0]; // 71(๋๋ค์ซ์)
        return axios.get(`http://koreanjson.com/posts/${num}`);
      })
      .then((res) => {
        console.log("์ฌ๊ธฐ๋ 3๋ฒ ์๋๋ค!!!");
        const userId = res.data.UserId;
        return axios.get(`http://koreanjson.com/posts?userId=${userId}`);
      })
      .then((res) => {
        console.log("์ฌ๊ธฐ๋ 4๋ฒ ์๋๋ค!!!");
        console.log(res);
        setArr(res.data);
      });
    console.log("์ฌ๊ธฐ๋ 5๋ฒ ์๋๋ค!!!");
  };

  // ์์์ ์๋๋ก ๋ก์ง์์ฑ ์์๋๋ก ํ๋ฉด์์ ์คํ๋จ(Promise๋ฌธ์  ํด๊ฒฐ)
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
        ๊ฒฐ๊ณผ:<button onClick={onClickCallback}>Callback</button>
      </div>
      <div>
        ๊ฒฐ๊ณผ:<button onClick={onClickPromise}>Promise</button>
      </div>
      <div>
        ๊ฒฐ๊ณผ:<button onClick={onClickAsyncawait}>Async/Await</button>
      </div>
      <div>
        {/* ๐1)map๋งค์๋๋ ๋ฐฐ์ด์๋ง ์ฌ์ฉ๊ฐ๋ฅํ๋ฏ๋ก */}
        {arr.map((el, index) => (
          <div key={el._id}>
            <div id={el._id}>{el.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
