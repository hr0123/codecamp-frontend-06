import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../src/commons/store";

const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function Quiz06LoginPage() {
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const { register, handleSubmit } = useForm();

  const onClickMove = async (data) => {
    try {
      const result = await loginUser({
        variables: {
          password: "password",
          email: "email",
        },
      });
      const accessToken = result.data.loginUser.accessToken;
      setAccessToken(accessToken);
    } catch (error) {
      // alert("로그인을 먼저 해주세요");
      if (JSON.parse(localStorage.getItem("baskets")) !== []) {
        alert(
          "비회원으로 담긴 게시물 장바구니가 존재합니다. 이동하시겠습니까?"
        );
      }
      router.push("/quiz06/basket");
    }
  };

  return (
    <form onSubmit={handleSubmit(onClickMove)}>
      이메일 : <input type="text" {...register("email")} />
      <br />
      비밀번호 : <input type="password" {...register("password")} />
      <br />
      <button>이동하기</button>
    </form>
  );
}
