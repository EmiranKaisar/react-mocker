import { useData, updateData } from "@/data";
import { Molecule } from "./Molecule";
import { MasterTree } from "./MasterTree";
import { Img } from "./Img";
import { Text } from "./Text";
import styled from "styled-components";
import Atom from "./Atom";

export const MoleculeContainer = ({ moleculeContainerId }) => {
  //查看该MoleculeContainerId的数据
  const data = useData();
  const edit = data.edit;
  const elements = data.elements;
  const thisMoleculeContainer = elements[moleculeContainerId];
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
      if (thisMoleculeContainer.dir !== null) {
        updateData((updater) => {
          updater.whichpage = thisMoleculeContainer.dir;
        });
      }else if(thisMoleculeContainer.statedir !== null){
        updateData((updater) => {
          updater.elements[thisMoleculeContainer.parentid].whichstate = thisMoleculeContainer.statedir;
        });
      }
    }
  };

  //TODO There should only be "Molecule" "ImgAtom" "TextAtom" 

  //甄选这个organism中有哪些molecule
  const Atom2 = ({ moleculeId }) => {
    return <Img atomId={moleculeId} />;
  };
  const Atom3 = ({ moleculeId }) => {
    return <Text atomId={moleculeId} />;
  };
  //TODO Add a 'universal'


  const Master1 = ({ moleculeId }) => {
    return <MasterTree masterId={moleculeId} />;
  };

  const Molecule1 = ({ moleculeId }) => {
    return <Molecule moleculeId={moleculeId} />;
  };
  const Atom1 = ({ atomId }) => {
    return <Atom atomId={atomId} />;
  };

  //名称和component的对应关系
  const MoleculeMap = {
    img: Atom2,
    text: Atom3,
    //TODO Add a 'universal'

    mastertree: Master1,

    molecule: Molecule1,
    atom:Atom1
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
    const thisMolecule = elements[thisMoleculeContainerArr[i]];
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
