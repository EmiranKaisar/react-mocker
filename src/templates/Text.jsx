import { updateData, useData } from "@/data";
import styled from 'styled-components';

export const Text = ({ atomId }) => {
  const data = useData();
  const edit = data.edit;
  const templates = data.templates;
  const thisAtomTempId = data.selectedtemplate;
  let thisAtomTemp;
  if(atomId === undefined){
    thisAtomTemp = templates[thisAtomTempId];
  }else{
    thisAtomTemp = templates[atomId];
  }
  const thisAtomState = thisAtomTemp.whichstate;
  const thisAtomChildArr = thisAtomTemp.state[thisAtomState];

  const thisAtomStyle = thisAtomTemp.style;
  
  //交互事件
  const handleChildClick = (e) => {
    e.stopPropagation();  //为了点击到单个元素
    if(edit){
      updateData((updater) => {
        updater.selected = thisAtomTemp.id;
      });
    }else{
      if (thisAtomTemp.statedir !== null) {
        updateData((updater) => {
          updater.templates[thisAtomTemp.parentid].whichstate = thisAtomTemp.statedir;
        });
      }
    }
  };

  const TextStyle = styled.div`
  ${thisAtomStyle}
  `;

  return (
    <TextStyle
      className={`card-title ${edit ? "editmode" : ""} ${
        data.selected === thisAtomTemp.id ? "chosen" : ""
      }`}
      onClick={handleChildClick}
    >
        {thisAtomTemp.input}
    </TextStyle>
  );
};
