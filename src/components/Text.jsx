import { updateData, useData } from "@/data";
import styled from 'styled-components';

export const Text = ({ atomId }) => {
  const data = useData();
  const edit = data.edit;
  const elements = data.elements;
  const thisAtom = elements[atomId];
  const thisAtomState = thisAtom.whichstate;
  const thisAtomArr = thisAtom.state[thisAtomState];
  
  const thisAtomType = thisAtom.type[thisAtom.selectedtype];

  const thisAtomStyle = thisAtom.style;
  
  //交互事件
  const handleChildClick = (e) => {
    e.stopPropagation();  //为了点击到单个元素
    if(edit){
      updateData((updater) => {
        updater.selected = atomId;
      });

    }else{
      if (thisAtom.dir !== null) {
        updateData((updater) => {
          updater.whichpage = thisAtom.dir;
        });
      }else if(thisAtom.statedir !== null){
        updateData((updater) => {
          updater.elements[thisAtom.parentid].whichstate = thisAtom.statedir;
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
        data.selected === atomId ? "chosen" : ""
      }`}
      onClick={handleChildClick}
    >
      <p>
        {thisAtom.input}
      </p>
    </TextStyle>
  );
};
