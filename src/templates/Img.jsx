import museImage from "../components/images/muse.png";
import logoImage from "../components/images/logo.svg";
import { updateData, useData } from "@/data";
import styled from "styled-components";

export const Img = ({ atomId }) => {
  //与必要的信息取得联系
  const data = useData();
  const edit = data.edit;
  const templates = data.templates;
  const thisAtomTempId = data.selectedtemplate;
  let thisAtomTemp;
  if (atomId === undefined) {
    thisAtomTemp = templates[thisAtomTempId];
  } else {
    thisAtomTemp = templates[atomId];
  }

  const thisAtomImg = thisAtomTemp.img;
  // const thisAtomState = thisAtomTemp.whichstate;
  // const thisAtomChildArr = thisAtomTemp.state[thisAtomState];

  // const thisAtomImgArr = thisAtomTemp.img;
  // const whichImg = thisAtomImgArr[thisAtomTemp.whichimg];

  const thisAtomStyle = thisAtomTemp.style;

  // const ImgageMap = {
  //   muse: museImage,
  //   logo: logoImage,
  // };

  //交互事件
  const handleChildClick = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    if (edit) {
      updateData((updater) => {
        updater.selected = thisAtomTemp.id;
      });
    } else {
      if (thisAtomTemp.statedir !== null) {
        updateData((updater) => {
          updater.templates[thisAtomTemp.parentid].whichstate =
            thisAtomTemp.statedir;
        });
      }
    }
  };

  const ImgStyle = styled.div`
  ${thisAtomStyle}
  `;
  const myStyle = {
    backgroundImage: `url(${thisAtomImg})`,
  };

  return (
    // <ImgStyle
    //   className={`card-img ${edit ? "editmode" : ""} ${
    //     data.selected === thisAtomTemp.id ? "chosen" : ""
    //   }`}
    // >
    //   <img
    //     src={ImgageMap[whichImg]}
    //     alt="hello"
    //     className={'fit-container-height-img'}
    //     onClick={handleChildClick}
    //   />
    // </ImgStyle>
    <ImgStyle
      className={`card-img ${edit ? "editmode" : ""} ${
        data.selected === thisAtomTemp.id ? "chosen" : ""
      }`}
      style={myStyle}
      onClick={handleChildClick}
    ></ImgStyle>
  );
};
