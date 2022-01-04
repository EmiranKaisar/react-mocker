import { updateData, useData } from "@/data";
import styled from 'styled-components';

import { Img } from "./Img";
import { Text } from "./Text";


export const SubContainer = ({ subcontainerId }) => {
  //与必要的数据取得联系
  const data = useData();
  const edit = data.edit;
  const templates = data.templates;
  const thisSubContainer = templates[subcontainerId];
  const thisSubContainerState = thisSubContainer.whichstate;
  const subContainerChildArr = thisSubContainer.state[thisSubContainerState];
  const containerType = thisSubContainer.type[thisSubContainer.selectedtype];
  
  const thisSubContainerStyle = thisSubContainer.style;
  //交互事件
  const handleChildClick = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    if(edit){
      updateData((updater) => {
        updater.selected = subcontainerId;
      });
    }else{
      if (thisSubContainer.statedir !== null) {
        updateData((updater) => {
          updater.templates[thisSubContainer.parentid].whichstate = thisSubContainer.statedir;
        });
      }
    }
  };
  //TODO there should only be "ImgAtom" "TextAtom"

  //通过card的类型判断这个card有哪些component
  const Atom1 = ({ atomId }) => {
    return <Img atomId={atomId} />;
  };
  const Atom2 = ({ atomId }) => {
    return <Text atomId={atomId} />;
  };
  

  //名称和component的对应关系
  const CompMap = {
    img: Atom1,
    text: Atom2,
  };
  //返回对应的组件
  const CompSwitcher = (thisAtom) => {
    let Atom;
    if(CompMap[thisAtom.name] !== undefined){
      Atom = CompMap[thisAtom.name]
    } else {
      Atom = CompMap[thisAtom.complevel];
    }
    return <Atom key={thisAtom.id} atomId={thisAtom.id}/>;
  };

  //形成该分子组件的一个原子级组件的列表
  const ComponentsArray = [];
  for (let i = 0; i < subContainerChildArr.length; i++) {
    const thisAtom = templates[subContainerChildArr[i]];
    ComponentsArray.push(
      CompSwitcher(thisAtom)
    );
  }

  const SubContainerStyle = styled.div`
  ${thisSubContainerStyle}
  `;

  return (
    <SubContainerStyle
      className={`${containerType} ${edit ? "editmode" : ""} ${
        data.selected === subcontainerId  ? "chosen" : ""
      }`}
      onClick={handleChildClick}
    >
      {ComponentsArray}
    </SubContainerStyle>
  );
};
