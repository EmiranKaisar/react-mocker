import Select from "react-select";
import { updateData, useData } from "@/data";

export const AddComp = () => {
  //templates
  //与elements取得联系
  const data = useData();
  const templates = data.templates;
  const selectedId = data.selected;
  const selectedComp = templates[selectedId];

  const selectedCompState = selectedComp.whichstate;

  const selectedTempId = data.selectedtemplate;
  const selectedTemp = templates[selectedTempId];

  //列出能添加在这个组件的所有子组件
  let masterOptions = [];
  if (selectedComp.canchild !== undefined) {
    const masterOptionsArr = selectedComp.canchild.filter(
      (compId) =>
        templates[compId].comptype === "master" &&
        templates[compId].complevel !== ""
    );
    masterOptions = masterOptionsArr.map((compId) => ({
      value: templates[compId].name,
      label: templates[compId].name.replace("master", ""),
    }));
  }

  let generalOptions = [];
  if (selectedComp.canchild !== undefined) {
    const generalOptionsArr = selectedComp.canchild.filter(
      (compId) => templates[compId].comptype === "general"
    );
    generalOptions = generalOptionsArr.map((compId) => ({
      value: templates[compId].name,
      label: templates[compId].name.replace("general", ""),
    }));
  }

  //交互事件
  const handleChange = (selectedOption) => {
    let addTheseComp = [];
    let compToAdd = {};
    //选择的组件的template
    if (selectedOption.value === 'text' || selectedOption.value === 'img'){
       [compToAdd] = templates.filter(
        (comp) => comp.name === selectedOption.value
      );
    }else{
        [compToAdd] = templates.filter(
        (comp) => comp.name === selectedOption.value && comp.showtree
      );
    }
    
    //const newCompToAdd = { ...compToAdd };
    const newCompToAdd = {...compToAdd};
    newCompToAdd.id = templates.length;
    newCompToAdd.parentid = selectedId;
    newCompToAdd.showtree = false;
    if (newCompToAdd.complevel === "molecule") {
      addTheseComp = moleculeIterate(addTheseComp,newCompToAdd);
    }else if (newCompToAdd.complevel === "atom") {
      addTheseComp = atomIterate(addTheseComp,newCompToAdd);
    } else{
      addTheseComp.push(newCompToAdd);
    }
    updateData((updater) => {
      updater.templates[selectedId].state[selectedCompState].push(templates.length);
    });
    addTheseComp.map((e)=>{
      updateData((updater) => {
        updater.templates.push(e);
      });
    })
  };

  const moleculeIterate = (addTheseComp, iterateThisMolecule) => {
    let counter = iterateThisMolecule.id;
    let thisIteratorCompArr = [];
    const moleculeStateArr = [];
    for (let i = 1; i <= iterateThisMolecule.state.length; i++) {
      //一个state中的组件arr
      const stateArr = iterateThisMolecule.state[i - 1];
      //增加一个state
      const newState = [];
      if(stateArr.length<1) moleculeStateArr.push([]);

      for (let t = 1; t <= stateArr.length; t++) {
        const oneAtomId = stateArr[t-1];
        const oneAtom = templates[oneAtomId];

        counter = counter +1;
        let newAtomComp = {...oneAtom};
        newAtomComp.id = counter;
        newAtomComp.parentid = iterateThisMolecule.id;
        newAtomComp.showtree = false;
        newState.push(counter);
        if(t === stateArr.length) moleculeStateArr.push(newState);

        if(newAtomComp.complevel === 'atom') {
          thisIteratorCompArr = atomIterate([...addTheseComp, ...thisIteratorCompArr], newAtomComp);
          counter = thisIteratorCompArr.length+templates.length;
        }else{
          thisIteratorCompArr.push(newAtomComp);
        }
    }
  }
  iterateThisMolecule.state = moleculeStateArr;
  return [...addTheseComp, iterateThisMolecule, ...thisIteratorCompArr];
  };
  
  const atomIterate = (addTheseComp, iterateThisAtom)=>{
    let counter = iterateThisAtom.id;
    let thisIteratorCompArr = [];
    const moleculeStateArr = [];
    for (let i = 1; i <= iterateThisAtom.state.length; i++) {
      //一个state中的组件arr
      const stateArr = iterateThisAtom.state[i - 1];
      //增加一个state
      const newState = [];
      if(stateArr.length<1) moleculeStateArr.push([]);

      for (let t = 1; t <= stateArr.length; t++) {
        const oneAtomId = stateArr[t-1];
        const oneAtom = templates[oneAtomId];

        counter = counter +1;
        let newAtomComp = {...oneAtom};
        newAtomComp.id = counter;
        newAtomComp.parentid = iterateThisAtom.id;
        newAtomComp.showtree = false;
        newState.push(counter);
        if(t === stateArr.length) moleculeStateArr.push(newState);
        thisIteratorCompArr.push(newAtomComp);
    }
  }
  iterateThisAtom.state = moleculeStateArr;
  return [...addTheseComp, iterateThisAtom, ...thisIteratorCompArr];
  }

  return (
    <div className={"editor-each-item"}>
      <label>添加本地组件</label>
      <Select onChange={handleChange} options={masterOptions} />
      <label>添加前端组件</label>
      <Select onChange={handleChange} options={generalOptions} />
    </div>
  );
};
