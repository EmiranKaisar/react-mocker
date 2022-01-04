import { useData, updateData } from "@/data";
import { MasterTree } from "./MasterTree";
import { MoleculeContainer } from "./MoleculeContainer";
import { Img } from "./Img";
import { Text } from "./Text";
import styled from "styled-components";
import { Molecule } from "./Molecule";
import Atom from "./Atom";

export const Organism = ({ organismId }) => {
  //elements
  //查看目前organism的数据
  const data = useData();
  const edit = data.edit;
  const elements = data.elements;
  const thisOrganism = elements[organismId];
  const thisOrgansimState = thisOrganism.whichstate;
  const thisOrganismMolArr = thisOrganism.state[thisOrgansimState];

  const thisOrganismGridArr = thisOrganism.grid;
  const thisOrganismGridArea = thisOrganism.selectedarea;
  const thisOranismStyle = thisOrganism.style;

  const gridMaxId = Math.max(...thisOrganismGridArea);
  const gridMinId = Math.min(...thisOrganismGridArea);

  //交互事件
  const handleChildClick = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    if (edit) {
      updateData((updater) => {
        updater.selected = organismId;
      });
    }else{
      if (thisOrganism.dir !== null) {
        updateData((updater) => {
          updater.whichpage = thisOrganism.dir;
        });
      }else if(thisOrganism.statedir !== null){
        updateData((updater) => {
          updater.elements[thisOrganism.parentid].whichstate = thisOrganism.statedir;
        });
      }
    }
  };

  //TODO There should only be "MoleculeContainer" "ImgAtom" "TextAtom" 
  //甄选这个organism中有哪些molecule
  const Atom2 = ({ moleculeId }) => {
    return <Img atomId={moleculeId} />;
  };
  const Atom3 = ({ moleculeId }) => {
    return <Text atomId={moleculeId} />;
  };


  const Master1 = ({ moleculeId }) => {
    return <MasterTree masterId={moleculeId} />;
  };

  const MoleculeContainer1 = ({ moleculeId }) => {
    return <MoleculeContainer moleculeContainerId={moleculeId} />;
  };
  const Molecule1 = ({ moleculeId }) => {
    return <Molecule moleculeId={moleculeId} />;
  };
  const Atom1 = ({ moleculeId }) => {
    return <Atom atomId={moleculeId} />;
  };
  //名称和component的对应关系
  const MoleculeMap = {
    img: Atom2,
    text: Atom3,
    //TODO Add a 'universal'

    mastertree: Master1,

    moleculecontainer: MoleculeContainer1,
    molecule: Molecule1,
    atom: Atom1
  };
  //返回对应的组件
  const MoleculeSwitcher = (thisMolecule) => {
    let Molecule;
    if(MoleculeMap[thisMolecule.name]!== undefined){
      Molecule = MoleculeMap[thisMolecule.name];
    }else{
      Molecule = MoleculeMap[thisMolecule.complevel];
    }
    return <Molecule key={thisMolecule.id} moleculeId={thisMolecule.id} />;
  };

  //形成该organism的一个molecule组件的列表
  const MoleculeArray = [];
  for (let i = 0; i < thisOrganismMolArr.length; i++) {
    const thisMolecule = elements[thisOrganismMolArr[i]];
    MoleculeArray.push(
      MoleculeSwitcher(thisMolecule)
    );
  }

  const myStyle = {
    gridColumn: `${thisOrganismGridArr[gridMinId]}/${thisOrganismGridArr[gridMaxId]}`,
    gridRow: `${thisOrganismGridArr[gridMinId]}/${thisOrganismGridArr[gridMaxId]}`,
  };

  const OrganismStyle = styled.div`
    ${thisOranismStyle}
  `;

  return (
    <OrganismStyle
      className={`content-container ${edit ? "editmode" : ""} ${
        data.selected === organismId ? "chosen" : ""
      }`}
      style={myStyle}
      onClick={handleChildClick}
    >
      {MoleculeArray}
    </OrganismStyle>
  );
};
