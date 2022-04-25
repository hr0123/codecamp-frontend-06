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
import { useAuth } from "../../../commons/hooks/useAuth";

declare const window: typeof globalThis & {
  kakao: any;
};

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IFormValues {
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags: string;
  addressDetail: string;
  // address: string;
  // images:string;
}

const schema = yup.object({
  name: yup.string().required("상품명은 필수 입력사항입니다."),
  remarks: yup.string().required("한줄 요약은 필수 입력사항입니다."),
  contents: yup.string().required("상품 설명은 필수 입력사항입니다."),
  price: yup.number().integer().required("판매 가격은 필수 입력사항입니다."),
  tags: yup.string().required("태그는 필수 입력사항입니다."),
  // gps: yup.string().required("거래위치는 필수 입력사항입니다."),
});

export default function ProductsWrite(props) {
  useAuth();

  const [createUseditem] = useMutation(CREATE_USED_ITEM);
  const [updateUseditem] = useMutation(UPDATE_USED_ITEM);

  const router = useRouter();

  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [address, setAddress] = useState("");

  // const { register, handleSubmit, formState, setValue, trigger } = useForm({
  //   resolver: yupResolver(schema),
  //   mode: "onChange",
  // });
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    trigger,
    getValues,
    reset,
  } = useForm({
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

  useEffect(() => {
    // 👇Head안 script태그 넣었던 부분을 직접 만들기
    const script = document.createElement("script"); // <script></script>만들어짐
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=10584a7a31a2088a343cbb485b3d1668&libraries=services&autoload=false";
    document.head.appendChild(script);
    // 👇script가 로드되면 그때, 기존에있던 아래 로직 실행
    script.onload = () => {
      window.kakao.maps.load(function () {
        // v3가 모두 로드된 후, 이 콜백 함수가 실행
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.554331, 126.981101), // 지도의 중심좌표.
          level: 1, // 지도의 레벨(확대, 축소 정도)
        };
        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
        // 📌주소-좌표 변환 객체를 생성
        let geocoder = new window.kakao.maps.services.Geocoder();
        const marker = new window.kakao.maps.Marker(), // 클릭한 위치를 표시할 마커
          infowindow = new window.kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우
        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시
        // searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시 이벤트
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent) {
            searchDetailAddrFromCoords(
              mouseEvent.latLng,
              function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                  let detailAddr = !!result[0].road_address
                    ? "<div>도로명주소 : " +
                      result[0].road_address.address_name +
                      "</div>"
                    : "";
                  detailAddr +=
                    "<div>지번 주소 : " +
                    result[0].address.address_name +
                    "</div>";
                  const content =
                    '<div class="bAddr">' +
                    '<span class="title">법정동 주소정보</span>' +
                    detailAddr +
                    "</div>";
                  // 마커를 클릭한 위치에 표시
                  marker.setPosition(mouseEvent.latLng);
                  marker.setMap(map);
                  // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시
                  infowindow.setContent(content);
                  infowindow.open(map, marker);
                  setAddress(
                    !!result[0].road_address
                      ? result[0].road_address.address_name +
                          " (지번주소: " +
                          result[0].address.address_name +
                          ")"
                      : result[0].address.address_name
                  );
                }
              }
            );
            let latlng = mouseEvent.latLng;
            setLat(Number(latlng.getLat().toFixed(5)));
            setLng(Number(latlng.getLng().toFixed(5)));
          }
        );
        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시 이벤트
        // window.kakao.maps.event.addListener(map, "idle", function () {
        //   searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        // });
        function searchAddrFromCoords(coords, callback) {
          // 좌표로 행정동 주소 정보를 요청
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }
        function searchDetailAddrFromCoords(coords, callback) {
          // 좌표로 법정동 상세 주소 정보를 요청
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }
      });
    };
  }, []);

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
            useditemAddress: {
              address: address,
              addressDetail: data.addressDetail,
              lat: lat,
              lng: lng,
            },
            images: fileUrls,
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
      // map={map}
      lat={lat}
      lng={lng}
      address={address}
      getValues={getValues}
      reset={reset}
    />
  );
}
