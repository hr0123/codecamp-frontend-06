import * as S from "./ProductsWrite.styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ProductsWriteUI(props) {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(props.schema),
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(props.onClickSubmit)}>
      <S.Wrapper>
        <S.Head>상품 등록하기</S.Head>
        <S.Title>상품명</S.Title>
        <S.NameInput
          type="text"
          placeholder="상품명을 작성해주세요."
          {...register("name")}
        />
        <S.Error>{props.formState.errors.name?.message}</S.Error>
        <S.Title>한줄 요약</S.Title>
        <S.NameInput
          type="text"
          placeholder="상품명을 작성해주세요."
          {...register("remarks")}
        />
        <S.Error>{props.formState.errors.remarks?.message}</S.Error>
        <S.Title>상품 설명</S.Title>
        <S.DetailInput
          type="text"
          placeholder="상품을 설명해주세요."
          {...register("contents")}
        />
        <S.Error>{props.formState.errors.contents?.message}</S.Error>
        <S.Title>판매 가격</S.Title>
        <S.PriceInput
          type="text"
          placeholder="판매 가격을 입력해주세요."
          {...register("price")}
        />
        <S.Error>{props.formState.errors.price?.message}</S.Error>
        <S.Title>태그 입력</S.Title>
        <S.TagInput
          type="text"
          placeholder="#태그  #태그  #태그"
          {...register("tags")}
        />
        <S.Error>{props.formState.errors.tags?.message}</S.Error>
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
            <S.AddressInput type="text" {...register("address")} />
            <S.AddressInput type="text" {...register("address")} />
            <S.Error>{props.formState.errors.address?.message}</S.Error>
          </S.AddressWrapper>
        </S.LocationWrapper>
        <S.ImageWrapper>
          <S.Title>사진 첨부</S.Title>
        </S.ImageWrapper>
        <S.Title>메인사진 설정</S.Title>
        <S.RadioWrapper>
          <S.RadioButton type="radio" id="imageOne" name="radio-button" />
          <S.RadioLabel htmlFor="imageOne">사진1</S.RadioLabel>
          <S.RadioButton type="radio" id="imageTwo" name="radio-button" />
          <S.RadioLabel htmlFor="imageTwo">사진2</S.RadioLabel>
        </S.RadioWrapper>
        <S.Button isActive={formState.isValid}>등록하기</S.Button>
      </S.Wrapper>
    </form>
  );
}
