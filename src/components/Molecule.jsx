import { updateData, useData } from "@/data";
import { Img } from "./Img";
import { Text } from "./Text";
import { Container } from "./Container";
import { MasterTree } from "./MasterTree";
import styled from "styled-components";
import Atom from "./Atom";

export const Molecule = ({ moleculeId }) => {
  //elements
  //与必要的数据取得联系
  const data = useData();
  const edit = data.edit;
  const elements = data.elements;
  const thisMolecule = elements[moleculeId];
  const thisMoleculeState = thisMolecule.whichstate;
  const thisMoleculeAtomArr = thisMolecule.state[thisMoleculeState];
  const thisMoleculeStyle = thisMolecule.style;

  //交互事件
  const handleChildClick = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    if (edit) {
      updateData((updater) => {
        updater.selected = moleculeId;
      });
    } else {
      if (thisMolecule.dir !== null) {
        updateData((updater) => {
          updater.whichpage = thisMolecule.dir;
        });
      } else if (thisMolecule.statedir !== null) {
        updateData((updater) => {
          updater.elements[thisMolecule.parentid].whichstate =
            thisMolecule.statedir;
        });
      }
    }
  };

  //TODO There should only be "Container" "ImgAtom" "TextAtom" 

  //通过card的类型判断这个card有哪些component
  const Atom2 = ({ atomId }) => {
    return <Img atomId={atomId} />;
  };
  const Atom3 = ({ atomId }) => {
    return <Text atomId={atomId} />;
  };

  const Master1 = ({ atomId }) => {
    return <MasterTree masterId={atomId} />;
  };

  const Container1 = ({ atomId }) => {
    return <Container containerId={atomId} />;
  };
  const Atom1 = ({ atomId }) => {
    return <Atom atomId={atomId} />;
  };
  //名称和component的对应关系
  const CompMap = {
    img: Atom2,
    text: Atom3,


    mastertree: Master1,

    container: Container1,
    atom: Atom1,
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

  //形成该molecule组件的一个atom组件的列表
  const AtomArray = [];
  if(thisMoleculeAtomArr !== undefined){
  for (let i = 0; i < thisMoleculeAtomArr.length; i++) {
    const thisAtom = elements[thisMoleculeAtomArr[i]];
    AtomArray.push(CompSwitcher(thisAtom));
  }
}

  const MoleculeStyle = styled.div`
    ${thisMoleculeStyle}
  `;

  return (
    <MoleculeStyle
      className={`card ${edit ? "editmode" : ""} ${
        data.selected === moleculeId ? "chosen" : ""
      }`}
      onClick={handleChildClick}
    >
      {AtomArray}
    </MoleculeStyle>
  );
};
