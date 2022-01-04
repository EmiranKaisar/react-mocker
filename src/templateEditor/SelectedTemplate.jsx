import { useData, updateData } from "@/data";
import { MasterTree } from "../templates/MasterTree";
import { MoleculeContainer } from "../templates/MoleculeContainer";
import { Img } from "../templates/Img";
import { Text } from "../templates/Text";
import { Organism } from "../templates/Organism";
import { Molecule } from "@/templates/Molecule";
import Atom from "@/templates/Atom";

const SelectedTemplate = () => {
    const data = useData();
    const edit = data.edit;
    const templates = data.templates;
    const selectedTemplateId = data.selectedtemplate;
    const selectedTemplate = templates[selectedTemplateId];


      //甄选这个organism中有哪些molecule
  const Atom2 = () => {
    return <Img />;
  };
  const Atom3 = () => {
    return <Text />;
  };

  const Master1 = () => {
    return <MasterTree  />;
  };

  const MoleculeContainer1 = () => {
    return <MoleculeContainer />;
  };

  const Organism1 = () => {
    return <Organism />;
  };
  const Molecule1 = () => {
  return <Molecule />;
};
const Atom1 = () => {
  return <Atom />;
};
  //名称和component的对应关系
  const TempMap = {
    img: Atom2,
    text: Atom3,
    //TODO Add a 'universal'

    mastertree: Master1,

    moleculecontainer: MoleculeContainer1,

    organism: Organism1,
    molecule: Molecule1,
    atom:Atom1
  };

  //返回对应的组件
  const TempSwitcher = (temp) => {
    let Template;
    if(TempMap[temp.name]!== undefined){
      Template = TempMap[temp.name];
    }else{
      Template = TempMap[temp.complevel];
    }
     return <Template />;
  };

    return (
        <div className='editor-templates-selected'>
            {TempSwitcher(selectedTemplate)}
        </div>
    )
}

export default SelectedTemplate
