// 04-05파일이랑 비교
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;
export default function GraphqlMutationPage() {
  const [data, setData] = useState("");

  // const [myWriter,setMyWriter] = useState("")
  // const [myTitle,setMyTitle] = useState("")
  // const [myContents,setMyContents] = useState("")
  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    contents: "",
  });

  const [createBoard] = useMutation(CREATE_BOARD);

  const callGraphqlApi = async () => {
    const result = await createBoard({
      // variables: {
      //   writer: inputs.writer,
      //   title: inputs.title,
      //   contents: inputs.contents,
      // },
      // 스프레드 연산자
      variables: { ...inputs },
    });
    console.log(result);
    console.log(result.data.createBoard.message);
    setData(result.data.createBoard.message);
  };

  // const onChangeWriter = (event) => {
  //   //  setMyWriter(event.target.value);
  //   setInputs({
  //     // writer: inputs.writer,
  //     // title: inputs.title,
  //     // contents: inputs.contents,
  //     ...inputs,
  //     // writer: event.target.value,
  //     [event.target.id]: event.target.value,
  //   });
  // };

  //   const onChangeTitle = (event) => {
  //     //  setMyTitle(event.target.value);
  //     setInputs({
  //       // writer: inputs.writer,
  //       // title: inputs.title,
  //       // contents: inputs.contents,
  //       ...inputs,
  //       // title: event.target.value,
  //       [event.target.id]: event.target.value,
  //     });
  //   };

  //   const onChangeContents = (event) => {
  //     //  setMyContents(event.target.value);
  //     setInputs({
  //       // writer: inputs.writer,
  //       // title: inputs.title,
  //       // contents: inputs.contents,
  //       ...inputs,
  //       // contents: event.target.value,
  //       [event.target.id]: event.target.value,
  //     });
  //   };

  const onChangeInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <div>{data}</div>
      {/* 작성자: <input type="text" id="writer" onChange={onChangeWriter} /> */}
      작성자: <input type="text" id="writer" onChange={onChangeInputs} />
      <br />
      {/* 제목: <input type="text" id="title" onChange={onChangeTitle} /> */}
      제목: <input type="text" id="title" onChange={onChangeInputs} />
      <br />
      {/* 내용: <input type="text" id="contents" onChange={onChangeContents} /> */}
      내용: <input type="text" id="contents" onChange={onChangeInputs} />
      <br />
      <button onClick={callGraphqlApi}>GRAPHQL-API 요청하기!!!</button>
    </>
  );
}
