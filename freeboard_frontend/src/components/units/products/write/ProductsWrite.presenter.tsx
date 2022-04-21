import * as S from "./ProductsWrite.styles";
// import ImageUploadPage from "../../../commons/uploads";
// import { v4 as uuidv4 } from "uuid";

export default function ProductsWriteUI(props) {
  return (
    <form
      onSubmit={props.handleSubmit(
        props.isEdit ? props.onClickUpdate : props.onClickSubmit
      )}
    >
      <S.Wrapper>
        <S.Head>상품{props.isEdit ? " 수정" : " 등록"}하기</S.Head>
        <S.Title>상품명</S.Title>
        <S.NameInput
          type="text"
          placeholder="상품명을 작성해주세요."
          {...props.register("name")}
          defaultValue={props.data?.fetchUseditem.name || ""}
        />
        <S.Error>{props.formState.errors.name?.message}</S.Error>
        <S.Title>한줄 요약</S.Title>
        <S.NameInput
          type="text"
          placeholder="상품명을 작성해주세요."
          {...props.register("remarks")}
          defaultValue={props.data?.fetchUseditem.remarks || ""}
        />
        <S.Error>{props.formState.errors.remarks?.message}</S.Error>
        <S.Title>상품 설명</S.Title>
        {/* <S.DetailInput
          type="text"
          placeholder="상품을 설명해주세요."
          {...props.register("contents")}
          defaultValue={props.data?.fetchUseditem.contents || ""}
        /> */}
        <props.ReactQuill
          onChange={props.onChangeContents}
          placeholder="상품을 설명해주세요."
          defaultValue={props.data?.fetchUseditem.contents || ""}
        />
        <S.Error>{props.formState.errors.contents?.message}</S.Error>
        <S.Title>판매 가격</S.Title>
        <S.PriceInput
          type="text"
          placeholder="판매 가격을 입력해주세요."
          {...props.register("price")}
          defaultValue={props.data?.fetchUseditem.price || ""}
        />
        <S.Error>{props.formState.errors.price?.message}</S.Error>
        <S.Title>태그 입력</S.Title>
        <S.TagInput
          type="text"
          placeholder="#태그  #태그  #태그"
          // {...props.register("tags")}
          // defaultValue={props.data?.fetchUseditem.tags || ""}
        />
        {/* <S.Error>{props.formState.errors.tags?.message}</S.Error> */}
        <S.LocationWrapper>
          <S.MapWrapper>
            <S.Title>거래 위치</S.Title>
            <S.Map></S.Map>
          </S.MapWrapper>
          <S.AddressWrapper>
            <S.Title>GPS</S.Title>
            <S.GpsWrapper>
              <S.GpsLeft placeholder="위도(LAT)" />
              <S.Gps src="/Location.png" />
              <S.GpsRight placeholder="경도(LNG)" />
            </S.GpsWrapper>
            <S.Title>주소</S.Title>
            {/* <S.AddressInput type="text" {...props.register("address")} />
            <S.AddressInput type="text" {...props.register("address")} /> */}
            <S.AddressInput type="text" />
            <S.AddressInput type="text" />
            {/* <S.Error>{props.formState.errors.address?.message}</S.Error> */}
          </S.AddressWrapper>
        </S.LocationWrapper>
        <S.ImageWrapper>
          <S.Title>사진 첨부</S.Title>
          {/* {props.fileUrls.map((el, index) => (
            <ImageUploadPage
              key={uuidv4()}
              index={index}
              fileUrl={el}
              onChangeFileUrls={props.onChangeFileUrls}
            />
          ))} */}
        </S.ImageWrapper>
        <S.Title>메인사진 설정</S.Title>
        <S.RadioWrapper>
          <S.RadioButton type="radio" id="imageOne" name="radio-button" />
          <S.RadioLabel htmlFor="imageOne">사진1</S.RadioLabel>
          <S.RadioButton type="radio" id="imageTwo" name="radio-button" />
          <S.RadioLabel htmlFor="imageTwo">사진2</S.RadioLabel>
        </S.RadioWrapper>
        <S.Button isActive={props.formState.isValid}>
          {props.isEdit ? "수정하기" : "등록하기"}
        </S.Button>
      </S.Wrapper>
    </form>
  );
}
