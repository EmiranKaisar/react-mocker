import { useData, updateData } from "@/data";
import { Molecule } from "./Molecule";
import { MasterTree } from "./MasterTree";
import { Img } from "./Img";
import { Text } from "./Text";
import styled from "styled-components";

export const MoleculeContainer = ({ moleculeContainerId }) => {
  //template
  //查看该MoleculeContainerId的数据
  const data = useData();
  const edit = data.edit;
  const templates = data.templates;
  const thisMoleculeContainer = templates[moleculeContainerId];

  const thisMoleculeContainerState = thisMoleculeContainer.whichstate;
  const thisMoleculeContainerArr = thisMoleculeContainer.state[thisMoleculeContainerState];
  const thisMoleculeContainerStyle = thisMoleculeContainer.style;
  //交互事件
  const handleChildClick = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    if (edit) {
      updateData((updater) => {
        updater.selected = moleculeContainerId;
      });
    } else {
      if (thisMoleculeContainer.statedir !== null) {
        updateData((updater) => {
          updater.templates[thisMoleculeContainer.parentid].whichstate = thisMoleculeContainer.statedir;
        });
      }
    }
  };

  //TODO There should only be "Molecule" "ImgAtom" "TextAtom" 
  //甄选这个organism中有哪些molecule
  const Atom1 = ({ moleculeId }) => {
    return <Img atomId={moleculeId} />;
  };
  const Atom2 = ({ moleculeId }) => {
    return <Text atomId={moleculeId} />;
  };

  const Master1 = ({ moleculeId }) => {
    return <MasterTree masterId={moleculeId} />;
  };

  const Molecule1 = ({ moleculeId }) => {
    return <Molecule moleculeId={moleculeId} />;
  };

  //名称和component的对应关系
  const MoleculeMap = {
    img: Atom1,
    text: Atom2,

    mastertree: Master1,

    molecule: Molecule1,
  };
  //返回对应的组件
  const MoleculeSwitcher = (thisMolecule) => {
    let Molecule;
    if(MoleculeMap[thisMolecule.name] !== undefined){
      Molecule = MoleculeMap[thisMolecule.name];
    }else{
      Molecule = MoleculeMap[thisMolecule.complevel];
    }
    return <Molecule key={thisMolecule.id} moleculeId={thisMolecule.id} />;
  };

  //形成该organism的一个molecule组件的列表
  const MoleculeArray = [];
  for (let i = 0; i < thisMoleculeContainerArr.length; i++) {
    const thisMolecule = templates[thisMoleculeContainerArr[i]];
    MoleculeArray.push(
      MoleculeSwitcher(thisMolecule)
    );
  }

  const MoleculeContainerStyle = styled.div`
    ${thisMoleculeContainerStyle}
  `;

  return (
    <MoleculeContainerStyle
      className={`molecule-container ${edit ? "editmode" : ""} ${
        data.selected === moleculeContainerId ? "chosen" : ""
      }`}
      onClick={handleChildClick}
    >
      {MoleculeArray}
    </MoleculeContainerStyle>
  );
};
