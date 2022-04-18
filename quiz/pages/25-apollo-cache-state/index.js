import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function ApolloCacheStatePage() {
  const { register, handleSubmit } = useForm();
  const { data } = useQuery(FETCH_BOARDS);
  const [createBoard] = useMutation(CREATE_BOARD);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = (boardId) => async () => {
    await deleteBoard({
      variables: { boardId },
      // 방법1. refetchQueries
      // refetchQueries: [
      //   {
      //     query: FETCH_BOARDS,
      //   },
      // ],
      // 방법2. apollo-state를 cache.modify
      update(cache, { data }) {
        const deletedId = data.deleteBoard;
        cache.modify({
          fields: {
            fetchBoards: (prev, { readField }) => {
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId //el._id라고 표기불가, readField에서 꺼내와 사용->readField("_id", el)
              );
              return [...filteredPrev];
            },
          },
        });
      },
    });
  };

  const onClickSubmit = async (data) => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: { ...data },
        },
        // 방법1. refetchQueries
        // refetchQueries: [
        //   {
        //     query: FETCH_BOARDS,
        //   },
        // ],
        // 방법2. apollo-state를 cache.modify
        update(cache, { data }) {
          data.createBoard;
          cache.modify({
            fields: {
              fetchBoards: (prev) => {
                return [data.createBoard, ...prev];
              },
            },
          });
        },
      });
      console.log(result);
      alert("게시물 등록 성공");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        작성자 : <input type="text" {...register("writer")} />
        <br />
        비밀번호 : <input type="password" {...register("password")} />
        <br />
        제목 : <input type="text" {...register("title")} />
        <br />
        내용 : <input type="text" {...register("contents")} />
        <br />
        <button>게시물 등록하기</button>
      </form>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>{el.writer}</span>
          <span>{el.title}</span>
          <span>{el.contents}</span>
          <button onClick={onClickDelete(el._id)}>X</button>
        </div>
      ))}
    </div>
  );
}
