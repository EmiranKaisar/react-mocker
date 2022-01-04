import { useData, updateData } from "@/data";
import { useState } from "react";
import AtomAdder from "./AtomAdder";
import MoleculeAdder from "./MoleculeAdder";
import OrganismAdder from "./OrganismAdder";

const TemplatesTree = () => {
  const data = useData();
  const edit = data.edit;
  const templates = data.templates;
  const selectedTemplateId = data.selectedtemplate;

  const [openState, setOpenState] = useState([]);

  const showTree = templates.filter((temp) => temp.showtree);

  const masterTemplates = showTree.filter(
    (temp) => temp.comptype === "master"
  );
  const masterOrganismTemplates = masterTemplates.filter(
    (temp) => temp.complevel === "organism"
  );
  const masterMoleculeTemplates = masterTemplates.filter(
    (temp) => temp.complevel === "molecule"
  );
  const masterAtomTemplates = masterTemplates.filter(
    (temp) => temp.complevel === "atom"
  );

  const generalTemplates = showTree.filter(
    (temp) => temp.comptype === "general"
  );
  const generalOrganismTemplates = generalTemplates.filter(
    (temp) => temp.complevel === "organism"
  );
  const generalMoleculeTemplates = generalTemplates.filter(
    (temp) => temp.complevel === "molecule"
  );
  const generalAtomTemplates = generalTemplates.filter(
    (temp) => temp.complevel === "atom"
  );

  const toggleTreeNode = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    let thisNestedId = e.target.nextSibling.id;
    if(openState.includes(thisNestedId)){
      setOpenState(openState.filter((id)=> id !== thisNestedId))
    }else{
      setOpenState([...openState, thisNestedId]);
    }
  };

  const clickedTemp = (e, clickedId)=>{
    e.stopPropagation();
    updateData((updater)=>{
      updater.selectedtemplate = clickedId;
    })
    updateData((updater)=>{
      updater.whichstate = 0;
    })
    updateData((updater)=>{
      updater.selected = clickedId;
    })
  }

  return (
    <div className='editor-templates-tree'>
      <div>
      <h1 > Templates </h1>
      <ul>
        <li>
          <span onClick={toggleTreeNode} className={`editor-folder ${openState.includes('0') ? 'open' : ''}`}>Master</span>
          <ul id = {0} className={`editor-nested ${openState.includes('0') ? 'open' : ''}`}>
            <li style={{paddingLeft:'1em'}}>
              <span onClick={toggleTreeNode} className={`editor-folder ${openState.includes('1') ? 'open' : ''}`}>Organism</span>
              <ul id = {1} className={`editor-nested ${openState.includes('1') ? 'open' : ''}`}>
                {masterOrganismTemplates.map((temp) => (
                  <li key={temp.id} style={{paddingLeft:'2em'}} onClick={(e)=>clickedTemp(e, temp.id)} className={`editor-template-item ${temp.id === selectedTemplateId ? 'open' : ''}`}>{temp.name}</li>
                ))}
              </ul>
            </li>
            <li style={{paddingLeft:'1em'}}>
              <span onClick={toggleTreeNode} className={`editor-folder ${openState.includes('2') ? 'open' : ''}`}>Molecule</span>
              <ul id = {2} className={`editor-nested ${openState.includes('2') ? 'open' : ''}`}>
                {masterMoleculeTemplates.map((temp) => (
                  <li key={temp.id} style={{paddingLeft:'2em'}} onClick={(e)=>clickedTemp(e, temp.id)} className={`editor-template-item ${temp.id === selectedTemplateId ? 'open' : ''}`}>{temp.name}</li>
                ))}
              </ul>
            </li>
            <li style={{paddingLeft:'1em'}}>
              <span onClick={toggleTreeNode} className={`editor-folder ${openState.includes('3') ? 'open' : ''}`}>Atom</span>
              <ul id = {3} className={`editor-nested ${openState.includes('3') ? 'open' : ''}`}>
                {masterAtomTemplates.map((temp) => (
                  <li key={temp.id} style={{paddingLeft:'2em'}} onClick={(e)=>clickedTemp(e, temp.id)} className={`editor-template-item ${temp.id === selectedTemplateId ? 'open' : ''}`}>{temp.name}</li>
                ))}
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span onClick={toggleTreeNode} className={`editor-folder ${openState.includes('4') ? 'open' : ''}`}>General</span>
          <ul id = {4} className={`editor-nested ${openState.includes('4') ? 'open' : ''}`}>
            <li style={{paddingLeft:'1em'}}>
              <span onClick={toggleTreeNode} className={`editor-folder ${openState.includes('5') ? 'open' : ''}`}>Organism</span>
              <ul id = {5} className={`editor-nested ${openState.includes('5') ? 'open' : ''}`}>
                {generalOrganismTemplates.map((temp) => (
                  <li key={temp.id} style={{paddingLeft:'2em'}} onClick={(e)=>clickedTemp(e, temp.id)} className={`editor-template-item ${temp.id === selectedTemplateId ? 'open' : ''}`}>{temp.name}</li>
                ))}
              </ul>
            </li>
            <li style={{paddingLeft:'1em'}}>
              <span onClick={toggleTreeNode} className={`editor-folder ${openState.includes('6') ? 'open' : ''}`}>Molecule</span>
              <ul id = {6} className={`editor-nested ${openState.includes('6') ? 'open' : ''}`}>
                {generalMoleculeTemplates.map((temp) => (
                  <li key={temp.id} style={{paddingLeft:'2em'}} onClick={(e)=>clickedTemp(e, temp.id)} className={`editor-template-item ${temp.id === selectedTemplateId ? 'open' : ''}`}>{temp.name}</li>
                ))}
              </ul>
            </li>
            <li style={{paddingLeft:'1em'}}>
              <span onClick={toggleTreeNode} className={`editor-folder ${openState.includes('7') ? 'open' : ''}`}>Atom</span>
              <ul id = {7} className={`editor-nested ${openState.includes('7') ? 'open' : ''}`}>
                {generalAtomTemplates.map((temp) => (
                  <li key={temp.id} style={{paddingLeft:'2em'}} onClick={(e)=>clickedTemp(e, temp.id)} className={`editor-template-item ${temp.id === selectedTemplateId ? 'open' : ''}`}>{temp.name}</li>
                ))}
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      </div>
      <div>
        <OrganismAdder />
        <MoleculeAdder />
        <AtomAdder />
      </div>
    </div>
  );
};

export default TemplatesTree;
