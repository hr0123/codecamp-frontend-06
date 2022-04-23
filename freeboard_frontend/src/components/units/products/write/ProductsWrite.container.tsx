import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import ProductsWriteUI from "./ProductsWrite.presenter";
import { CREATE_USED_ITEM, UPDATE_USED_ITEM } from "./ProductsWrite.queries";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { IUpdateUseditemInput } from "../../../../commons/types/generated/types";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IFormValues {
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags: string;
  // address: string;
  // images:string;
}

const schema = yup.object({
  name: yup.string().required("상품명은 필수 입력사항입니다."),
  remarks: yup.string().required("한줄 요약은 필수 입력사항입니다."),
  // contents: yup.string().required("상품 설명은 필수 입력사항입니다."),
  contents: yup.string(),
  price: yup.number().integer().required("판매 가격은 필수 입력사항입니다."),
  // tags: yup.string().required("태그는 필수 입력사항입니다."),
  // address: yup.string().required("주소는 필수 입력사항입니다."),
});

export default function ProductsWrite(props) {
  const [createUseditem] = useMutation(CREATE_USED_ITEM);
  const [updateUseditem] = useMutation(UPDATE_USED_ITEM);

  const router = useRouter();

  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  const { register, handleSubmit, formState, setValue, trigger } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onChangeContents = (value: string) => {
    console.log(value);
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  };

  const onChangeFileUrls = (fileUrl: string, index: number) => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };

  // useEffect(() => {
  //   if (props.data?.fetchBoard.images?.length) {
  //     setFileUrls([...props.data?.fetchBoard.images]);
  //   }
  // }, [props.data]);

  const onClickSubmit = async (data: IFormValues) => {
    try {
      const result = await createUseditem({
        variables: {
          createUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: data.price,
            tags: data.tags,
            images: fileUrls,
            // usedItemaddress: data.address,
          },
        },
      });
      console.log(result);
      Modal.success({ content: "상품이 성공적으로 등록되었습니다." });
      router.push(`/products/${result.data.createUseditem._id}`);
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  const onClickUpdate = async (data) => {
    if (!data.name && !data.remarks && !data.contents && !data.price) {
      Modal.error({ content: "수정한 내용이 없습니다." });
      return;
    }
    const updateUseditemInput: IUpdateUseditemInput = {};
    if (data.name) updateUseditemInput.name = data.name;
    if (data.remarks) updateUseditemInput.remarks = data.remarks;
    if (data.contents) updateUseditemInput.contents = data.contents;
    if (data.price) updateUseditemInput.price = data.price;
    updateUseditemInput.tags = data.tags;
    // if (zipcode || address || addressDetail) {
    //   updateUseditemInput.boardAddress = {};
    //   if (zipcode) updateUseditemInput.boardAddress.zipcode = zipcode;
    //   if (address) updateUseditemInput.boardAddress.address = address;
    //   if (addressDetail)
    //     updateUseditemInput.boardAddress.addressDetail = addressDetail;

    try {
      await updateUseditem({
        variables: {
          useditemId: router.query.productId,
          updateUseditemInput,
        },
      });
      Modal.success({ content: "상품 수정에 성공하였습니다!" });
      router.push(`/products/${router.query.productId}`);
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  return (
    <ProductsWriteUI
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      schema={schema}
      isEdit={props.isEdit}
      data={props.data}
      onChangeContents={onChangeContents}
      ReactQuill={ReactQuill}
      fileUrls={fileUrls}
      onChangeFileUrls={onChangeFileUrls}
    />
  );
}
