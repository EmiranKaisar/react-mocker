import { useData, updateData } from "@/data";
import { MasterTree } from "./MasterTree";
import { MoleculeContainer } from "./MoleculeContainer";
import { Img } from "./Img";
import { Text } from "./Text";
import styled from "styled-components";
import { Molecule } from "./Molecule";

export const Organism = () => {
  //templates
  //查看目前organism的数据
  const data = useData();
  const edit = data.edit;
  const templates = data.templates;
  const thisOrgTempId = data.selectedtemplate;
  const thisOrgTemp = templates[thisOrgTempId];
  const thisOrgTempState = thisOrgTemp.whichstate;
  const thisOrgTempChildArr = thisOrgTemp.state[thisOrgTempState];
  const thisOranismStyle = thisOrgTempId.style;

  //交互事件
  const handleChildClick = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    if (edit) {
      updateData((updater) => {
        updater.selected = thisOrgTempId;
      });
    }else{
      if (thisOrgTemp.statedir !== null) {
        updateData((updater) => {
          updater.templates[thisOrgTempId].whichstate = thisOrgTemp.statedir;
        });
      }
    }
  };

  //TODO There should only be "MoleculeContainer" "ImgAtom" "TextAtom" 
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

  const MoleculeContainer1 = ({ moleculeId }) => {
    return <MoleculeContainer moleculeContainerId={moleculeId} />;
  };
  const Molecule1 = ({ moleculeId }) => {
    return <Molecule moleculeId={moleculeId} />;
  };
  //名称和component的对应关系
  const MoleculeMap = {
    img: Atom1,
    text: Atom2,

    mastertree: Master1,

    moleculecontainer: MoleculeContainer1,
    molecule: Molecule1
  };
  //返回对应的组件
  const MoleculeSwitcher = (thisMolecule) => {
    let Molecule;
    if(MoleculeMap[thisMolecule.name]){
      Molecule = MoleculeMap[thisMolecule.name];
    }else{
      Molecule = MoleculeMap[thisMolecule.complevel];
    }
    return <Molecule key={thisMolecule.id} moleculeId={thisMolecule.id} />;
  };

  //形成该organism的一个molecule组件的列表
  const MoleculeArray = [];
  for (let i = 0; i < thisOrgTempChildArr.length; i++) {
    const thisMolecule = templates[thisOrgTempChildArr[i]];
    MoleculeArray.push(
      MoleculeSwitcher(thisMolecule)
    );
  }

  const OrganismStyle = styled.div`
    ${thisOranismStyle}
  `;

  return (
    <OrganismStyle
      className={`content-container ${edit ? "editmode" : ""} ${
        data.selected === thisOrgTempId ? "chosen" : ""
      }`}
      onClick={handleChildClick}
    >
      {MoleculeArray}
    </OrganismStyle>
  );
};
