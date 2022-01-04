import museImage from "./images/muse.png";
import logoImage from "./images/logo.svg";
import { updateData, useData } from "@/data";
import styled from 'styled-components';

export const Img = ({ atomId }) => {
  //elements
  //与必要的信息取得联系
  const data = useData();
  const edit = data.edit;
  const elements = data.elements;
  const thisAtom = elements[atomId];
  const thisAtomState = thisAtom.whichstate;
  const thisAtomArr = thisAtom.state[thisAtomState];

  const thisAtomParentId = thisAtom.parentid;
  
  const thisAtomImgArr = thisAtom.img;
  const whichImg = thisAtomImgArr[thisAtom.whichimg];

  const thisAtomStyle = thisAtom.style;

  const imgType = thisAtom.type[thisAtom.selectedtype];

  const thisAtomImg = thisAtom.img;

  const ImgageMap = {
    muse: museImage,
    logo: logoImage,
  };
  
  //交互事件
  const handleChildClick = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    if (edit) {
      updateData((updater) => {
        updater.selected = atomId;
      });
    } else {
      if (thisAtom.dir !== null) {
        updateData((updater) => {
          updater.whichpage = thisAtom.dir;
        });
      } else if(thisAtom.statedir !== null){
        updateData((updater) => {
          updater.elements[thisAtomParentId].whichstate = thisAtom.statedir;
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
    <ImgStyle
      className={`card-img ${edit ? "editmode" : ""} ${
        data.selected === atomId ? "chosen" : ""
      }`}
      style={myStyle}
    >
    </ImgStyle>
  );
};
