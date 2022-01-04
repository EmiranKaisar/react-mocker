import { updateData, useData } from "@/data";
import { Img } from "./Img";
import { Text } from "./Text";
import styled from "styled-components";

const Atom = ({ atomId }) => {
  //elements
  const data = useData();
  const edit = data.edit;
  const elements = data.elements;
  const thisAtom = elements[atomId];
  const thisAtomState = thisAtom.whichstate;

  const thisAtomChildArr = thisAtom.state[thisAtomState];

  const thisAtomStyle = thisAtom.style;

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
      } else if (thisAtom.statedir !== null) {
        updateData((updater) => {
          updater.elements[thisAtom.parentid].whichstate = thisAtom.statedir;
        });
      }
    }
  };

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
  const CompSwitcher = (atomName, atomId) => {
    const Atom = CompMap[atomName];
    return <Atom key={atomId} atomId={atomId} />;
  };

  //形成该分子组件的一个原子级组件的列表
  const ComponentsArray = [];
  for (let i = 0; i < thisAtomChildArr.length; i++) {
    ComponentsArray.push(
      CompSwitcher(elements[thisAtomChildArr[i]].name, thisAtomChildArr[i])
    );
  }

  const AtomStyle = styled.div`
    ${thisAtomStyle}
  `;
  return (
    <AtomStyle
      className={`atom ${edit ? "editmode" : ""} ${
        data.selected === thisAtom.id ? "chosen" : ""
      }`}
      onClick={handleChildClick}
    >
      {ComponentsArray}
    </AtomStyle>
  );
};

export default Atom;
