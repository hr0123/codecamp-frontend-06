import { ChangeEvent } from "react";
import { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: any;
}
export interface IUpdateBoardInput {
  title?: string;
  contents?: string;
  youtubeUrl?: string;
  boardAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
}
export interface IBoardWriteUIProps {
  data?: Pick<IQuery, "fetchBoard">;
  isEdit: boolean;
  isActive: boolean;
  isOpen: boolean;
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  writerError: string;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  passwordError: string;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  titleError: string;
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  contentsError: string;
  onClickAddressSearch: () => void;
  onCompleteAddressSearch: (data: any) => void;
  onChangeAddressDetail: (event: ChangeEvent<HTMLInputElement>) => void;
  zipcode: string;
  address: string;
  addressDetail: string;
  onChangeYoutubeUrl: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: () => void;
  onClickUpdate: () => void;
  // onChangeFile={onChangeFile}
  // imgUrl={imgUrl}
  // onClickImgUpload={onClickImgUpload}
  // fileRef={fileRef}
  onChangeFileUrls: (fileUrls: string, index: number) => void;
  fileUrls: string[];
}
