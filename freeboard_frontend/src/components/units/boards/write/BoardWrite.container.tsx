// import { useEffect, useState } from "react";
// import { ChangeEvent, useEffect, useState } from "react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import { Modal } from "antd";
import { IBoardWriteProps, IUpdateBoardInput } from "./BoardWrite.types";

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (event.target.value !== "") {
      setWriterError("");
    }
    // if (event.target.value !== "" && password !== "" && title !== "" && contents !== "") {
    if (event.target.value && password && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setPasswordError("");
    }
    // if (writer !== "" && event.target.value !== "" && title !== "" && contents !== "") {
    if (writer && event.target.value && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setTitleError("");
    }
    // if (writer !== "" && password !== "" && event.target.value !== "" && contents !== "") {
    if (writer && password && event.target.value && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    if (event.target.value !== "") {
      setContentsError("");
    }
    // if (writer !== "" && password !== "" && title !== "" && event.target.value !== "") {
    if (writer && password && title && event.target.value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  // ??????1) modal->daum??????
  const onClickAddressSearch = () => {
    setIsOpen(true);
  };
  // ??????2) daum?????? ????????? ??????,????????????????????? ????????????->readonly??? ?????????
  const onCompleteAddressSearch = (data: any) => {
    setAddress(data.address);
    setZipcode(data.zonecode);
    setIsOpen(false);
  };
  // ??????3) ?????? ???????????? ????????????
  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const onClickSubmit = async () => {
    if (writer === "") {
      setWriterError("???????????? ??????????????????.");
    }
    if (password === "") {
      setPasswordError("??????????????? ??????????????????.");
    }
    if (title === "") {
      setTitleError("????????? ??????????????????.");
    }
    if (contents === "") {
      setContentsError("????????? ??????????????????.");
    }
    if (writer !== "" && password !== "" && title !== "" && contents !== "") {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer,
              password,
              title,
              contents,
              youtubeUrl,
              boardAddress: {
                zipcode,
                address,
                addressDetail,
              },
              images: fileUrls,
            },
          },
        });
        console.log(result);
        Modal.success({ content: "????????? ????????? ?????????????????????!" });
        router.push(`/boards/${result.data.createBoard._id}`);
      } catch (error) {
        Modal.error({ content: error.message });
      }
    }
  };

  const onClickUpdate = async () => {
    if (
      !title &&
      !contents &&
      !youtubeUrl &&
      !address &&
      !addressDetail &&
      !zipcode
    ) {
      alert("????????? ????????? ????????????.");
      return;
    }

    if (!password) {
      alert("??????????????? ??????????????????.");
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    if (title) updateBoardInput.title = title;
    if (contents) updateBoardInput.contents = contents;
    if (youtubeUrl) updateBoardInput.youtubeUrl = youtubeUrl;
    if (zipcode || address || addressDetail) {
      updateBoardInput.boardAddress = {};
      if (zipcode) updateBoardInput.boardAddress.zipcode = zipcode;
      if (address) updateBoardInput.boardAddress.address = address;
      if (addressDetail)
        updateBoardInput.boardAddress.addressDetail = addressDetail;
    }

    try {
      await updateBoard({
        variables: {
          boardId: router.query.boardId,
          password,
          updateBoardInput,
        },
      });
      Modal.success({ content: "????????? ????????? ?????????????????????!" });
      router.push(`/boards/${router.query.boardId}`);
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  // ???????????? ?????????
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

  return (
    <BoardWriteUI
      data={props.data}
      isEdit={props.isEdit}
      isActive={isActive}
      isOpen={isOpen}
      onChangeWriter={onChangeWriter}
      writerError={writerError}
      onChangePassword={onChangePassword}
      passwordError={passwordError}
      onChangeTitle={onChangeTitle}
      titleError={titleError}
      onChangeContents={onChangeContents}
      contentsError={contentsError}
      onClickAddressSearch={onClickAddressSearch}
      onCompleteAddressSearch={onCompleteAddressSearch}
      onChangeAddressDetail={onChangeAddressDetail}
      zipcode={zipcode}
      address={address}
      addressDetail={addressDetail}
      onChangeYoutubeUrl={onChangeYoutubeUrl}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      // onChangeFile={onChangeFile}
      // imgUrl={imgUrl}
      // onClickImgUpload={onClickImgUpload}
      // fileRef={fileRef}
      onChangeFileUrls={onChangeFileUrls}
      fileUrls={fileUrls}
    />
  );
}
