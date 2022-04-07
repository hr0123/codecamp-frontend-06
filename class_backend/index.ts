console.log("타입스크립트를 실행했어요!!");

import { DataSource } from "typeorm";
import { Board } from "./Board.postgres";

// const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server";

// 1.타입 지정(받아올 인자의 타입을 지정)
const typeDefs = gql`
  type Board {
    # graphql의 타입(인풋값의 타입을 객체로 묶어 지정)
    number: Int
    writer: String
    title: String
    contents: String
  }
  type Query {
    # 여러개 가지고 오기 때문에 타입을 배열에 담아서 보내줌
    fetchBoards: [Board]
  }
  type Mutation {
    # createBoard(writer: String, title: String, contents: String): String  연습용(example)
    createBoard(createBoardInput: CreateBoardInput!): String #-실제사용(backend06)
  }
  # ~Input은 type아니고 input(type은 받아올때만 사용이 가능하고, input은 입력값을 넣을 때 사용)
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }
`;

// 2.API 만들기
const resolvers = {
  Query: {
    fetchBoards: async () => {
      // 데이터베이스에 접속해서 게시물 가져오기(DB와 연결 = ORM)
      // Board.postgres.ts->db에 데이터 전송->기다려야함(async..await)
      const result = await Board.find();
      // 결과를 프론트엔드로 넘겨줌
      return result;
    },
  },

  Mutation: {
    createBoard: async (_: any, args: any) => {
      // parent : api에서 다른api를 요청시 두번째api()에
      // args : 데이터가 저장돼서 들어옴(입력된 값을 DB에 저장해줘야하므로)
      // context : 요청에 대한 정보들
      // info : api에 대한 정보들

      // 데이터베이스에 접속해서 게시물 등록하기
      // Board.postgres.ts->db에 데이터 전송->기다려야함(async..await)
      await Board.insert({
        // writer: args.createBoardInput.writer,
        // title: args.createBoardInput.title,
        // contents: args.createBoardInput.contents,
        ...args.createBoardInput,
      });
      return "게시물을 등록했습니다!!";
    },
  },
};

// 3.타입+API를 ApolloServer로 합치기(server)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  // true아니면->브라우저에서 다이렉트 접속 불가
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "34.64.124.189",
  port: 5034,
  username: "postgres",
  password: "postgres2021",
  database: "postgres",
  entities: [Board],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("연결 성공!!");

    // 4.백엔드API(server)에 리슨(24시간동안 접속가능하게끔 대기상태로)
    server.listen(4000).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  })

  .catch(() => {
    console.log("연결 실패!!");
  });
