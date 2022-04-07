import { DataSource } from "typeorm";
import { Product } from "./Product.postgres";

// const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server";

//1.타입 지정
const typeDefs = gql`
  type ProductReturn {
    _id: String
    seller: String
    name: String
    detail: String
    price: Int
    createdAt: String
  }

  input CreateProductInput {
    name: String
    detail: String
    price: Int
  }

  type Query {
    fetchProducts: [ProductReturn!]
    fetchProduct(productId: String): [ProductReturn!]
  }

  type Mutation {
    createProduct(
      seller: String
      createProductInput: CreateProductInput!
    ): String
    updateProduct(
      productId: String
      updateProductInput: UpdateProductInput!
    ): String
    deleteProduct(productId: String): String
  }

  input UpdateProductInput {
    name: String
    detail: String
    price: Int
  }
`;

// 2.qpi생성
const resolvers = {
  Query: {
    fetchProducts: async () => {
      const result = await Product.find();
      return result;
    },
    fetchProduct: async (_: any, args: any) => {
      const result = await Product.find({
        where: { _id: args.productId },
      });
      return result;
    },
  },
  Mutation: {
    createProduct: async (_: any, args: any) => {
      await Product.insert({
        seller: args.seller,
        // name: args.name,
        // detail: args.detail,
        // price: args.price
        ...args.createProductInput,
      });
      return "상품을 등록했습니다.";
    },
    updateProduct: async (_: any, args: any) => {
      await Product.update(
        { _id: args.productId },
        { ...args.updateProductInput }
      );
      return "상품을 수정했습니다.";
    },
    deleteProduct: async (_: any, args: any) => {
      await Product.update({ _id: args.productId }, { deletedAt: new Date() });
      return "상품을 삭제했습니다.";
    },
  },
};

// 3.합치기
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "34.64.124.189",
  port: 5034,
  username: "postgres",
  password: "postgres2021",
  database: "postgres",
  entities: [Product],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("연결 성공!!");
    // 4.서버열기
    server.listen(4000).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  })

  .catch(() => {
    console.log("연결 실패!!");
  });
