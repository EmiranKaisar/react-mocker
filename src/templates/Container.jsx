import { updateData, useData } from "@/data";
import styled from 'styled-components';

import { Img } from "./Img";
import { Text } from "./Text";
import { SubContainer } from "./SubContainer";
import Atom from "@/components/Atom";


export const Container = ({ containerId }) => {
  //与必要的数据取得联系
  const data = useData();
  const edit = data.edit;
  const templates = data.templates;
  const thisContainer = templates[containerId];
  const thisContainerState = thisContainer.whichstate;
  const containerChildArr = thisContainer.state[thisContainerState];

  const thisContainerStyle = thisContainer.style;
  //交互事件
  const handleChildClick = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    if(edit){
      updateData((updater) => {
        updater.selected = containerId;
      });
    }else{
      if (thisContainer.statedir !== null) {
        updateData((updater) => {
          updater.templates[thisContainer.parentid].whichstate = thisContainer.statedir;
        });
      }
    }
  };

  const ContainerStyle = styled.div`
  ${thisContainerStyle}
  `;

  //TODO there should only be "SubContainer" "ImgAtom" "TextAtom" 

  //通过card的类型判断这个card有哪些component
  const Atom2 = ({ atomId }) => {
    return <Img atomId={atomId} />;
  };
  const Atom3 = ({ atomId }) => {
    return <Text atomId={atomId} />;
  };

  const SubContainer1 = ({ atomId }) => {
    return <SubContainer subcontainerId={atomId} />;
  };
  const Atom1 = ({ atomId  }) => {
    return <Atom atomId={atomId } />;
  };
  //名称和component的对应关系
  const CompMap = {
    img: Atom2,
    text: Atom3,

    subcontainer: SubContainer1,
    atom:Atom1
  };
  //返回对应的组件
  const CompSwitcher = (thisAtom) => {
    let Atom;
    if(CompMap[thisAtom.name] !== undefined){
      Atom = CompMap[thisAtom.name];
    }else{
      Atom = CompMap[thisAtom.complevel];
    }
    return <Atom key={thisAtom.id} atomId={thisAtom.id}/>;
  };

  //形成该分子组件的一个原子级组件的列表
  const ComponentsArray = [];
  for (let i = 0; i < containerChildArr.length; i++) {
    const thisAtom = templates[containerChildArr[i]];
    ComponentsArray.push(
      CompSwitcher(thisAtom)
    );
  }

  return (
    <ContainerStyle
      className={`label-row ${edit ? "editmode" : ""} ${
        data.selected === containerId  ? "chosen" : ""
      }`}
      onClick={handleChildClick}
    >
      {ComponentsArray}
    </ContainerStyle>
  );
};
