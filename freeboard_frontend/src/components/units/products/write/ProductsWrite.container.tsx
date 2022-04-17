import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import ProductsWriteUI from "./ProductsWrite.presenter";
import { CREATE_USED_ITEM } from "./ProductsWrite.queries";
import * as yup from "yup";

interface IFormValues {
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags: string;
  address: string;
  // images:string;
}

const schema = yup.object({
  name: yup.string().required("상품명은 필수 입력사항입니다."),
  remarks: yup.string().required("한줄 요약은 필수 입력사항입니다."),
  contents: yup.string().required("상품 설명은 필수 입력사항입니다."),
  price: yup.number().integer().required("판매 가격은 필수 입력사항입니다."),
  tags: yup.string().required("태그는 필수 입력사항입니다."),
  address: yup.string().required("주소는 필수 입력사항입니다."),
});

export default function ProductsWrite() {
  const createUsedItem = useMutation(CREATE_USED_ITEM);
  const router = useRouter();

  const onClickSubmit = async (data: IFormValues) => {
    try {
      const result = await createUsedItem({
        variables: {
          createUseditemInput: {
            name: "name",
            remarks: "remarks",
            contents: "contents",
            price: "price",
            tags: "tags",
            usedItemaddress: "address",
            // images:
          },
        },
      });
      console.log(result);
      Modal.success({ content: "상품이 성공적으로 등록되었습니다." });
      router.push(`products/${result.data.createUsedItem._id}`);
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  return <ProductsWriteUI onClickSubmit={onClickSubmit} schema={schema} />;
}
