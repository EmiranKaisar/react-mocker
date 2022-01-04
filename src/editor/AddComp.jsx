import Select from "react-select";
import { updateData, useData } from "@/data";

export const AddComp = () => {
  //与elements取得联系
  const data = useData();
  const elements = data.elements;
  const selectedId = data.selected;
  const selectedComp = elements[selectedId];
  const selectedCompName = selectedComp.name;
  const selectedCompState = selectedComp.whichstate;
  const thisPage = data.whichpage;

  //与templates取得联系
  const templates = data.templates;

  //列出能添加在这个组件的所有子组件
  let masterOptions = [];
  if (selectedComp.canchild !== undefined) {
    const masterOptionsArr = selectedComp.canchild.filter(
      (compId) => templates[compId].comptype === "master"
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

    //选择的组件
    if (selectedOption.value === "text" || selectedOption.value === "img") {
      [compToAdd] = templates.filter(
        (comp) => comp.name === selectedOption.value
      );
    } else {
      [compToAdd] = templates.filter(
        (comp) => comp.name === selectedOption.value && comp.showtree
      );
    }
    const newCompToAdd = { ...compToAdd };
    newCompToAdd.id = elements.length;
    newCompToAdd.parentid = selectedId;
    newCompToAdd.showtree = false;
    if (newCompToAdd.complevel === "organism") {
      addTheseComp = organismIterate(addTheseComp, newCompToAdd);
    } else if (newCompToAdd.complevel === "molecule") {
      addTheseComp = moleculeIterate(addTheseComp, newCompToAdd);
    } else if (newCompToAdd.complevel === "atom") {
      addTheseComp = atomIterate(addTheseComp, newCompToAdd);
    } else {
      addTheseComp.push(newCompToAdd);
    }
    if (selectedCompName === "page") {
      updateData((updater) => {
        updater.elements[0].pagearray[thisPage].push(elements.length);
      });
    } else {
      updateData((updater) => {
        updater.elements[selectedId].state[selectedCompState].push(
          elements.length
        );
      });
    }
    console.log(addTheseComp);
    addTheseComp.map((e) => {
      updateData((updater) => {
        updater.elements.push(e);
      });
    });
  };

  const organismIterate = (addTheseComp, iterateThisOrganism) => {
    let counter = iterateThisOrganism.id;
    let thisIteratorCompArr = [];
    const organismStateArr = [];
    for (let i = 1; i <= iterateThisOrganism.state.length; i++) {
      //一个state中的组件arr
      const stateArr = iterateThisOrganism.state[i - 1];
      //增加一个state
      const newState = [];
      if(stateArr.length<1) organismStateArr.push([]);
      for (let t = 1; t <= stateArr.length; t++) {
        const oneMoleculeId = stateArr[t - 1];
        const oneMolecule = templates[oneMoleculeId];

        counter = counter + 1;
        let newMoleculeComp = { ...oneMolecule };
        newMoleculeComp.id = counter;
        newMoleculeComp.parentid = iterateThisOrganism.id;
        newState.push(counter);
        if (t === stateArr.length) organismStateArr.push(newState);

        if (newMoleculeComp.complevel === "molecule") {
          thisIteratorCompArr = moleculeIterate(
            [...addTheseComp, ...thisIteratorCompArr],
            newMoleculeComp
          );
          counter = thisIteratorCompArr.length + elements.length;
        }else if(newMoleculeComp.complevel === "atom"){
          thisIteratorCompArr = atomIterate(
            [...addTheseComp, ...thisIteratorCompArr],
            newMoleculeComp
          );
        } else {
          thisIteratorCompArr.push(newMoleculeComp);
        }

      }
    }
    iterateThisOrganism.state = organismStateArr;
    return [...addTheseComp, iterateThisOrganism, ...thisIteratorCompArr];
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
        const oneAtomId = stateArr[t - 1];
        const oneAtom = templates[oneAtomId];

        counter = counter + 1;
        let newAtomComp = { ...oneAtom };
        newAtomComp.id = counter;
        newAtomComp.parentid = iterateThisMolecule.id;
        newState.push(counter);
        if (t === stateArr.length) moleculeStateArr.push(newState);

        if (newAtomComp.complevel === "atom") {
          thisIteratorCompArr = atomIterate(
            [...addTheseComp, ...thisIteratorCompArr],
            newAtomComp
          );
          counter = thisIteratorCompArr.length + elements.length;
        } else {
          thisIteratorCompArr.push(newAtomComp);
        }
      }
    }
    iterateThisMolecule.state = moleculeStateArr;
    return [...addTheseComp, iterateThisMolecule, ...thisIteratorCompArr];
  };

  const atomIterate = (addTheseComp, iterateThisAtom) => {
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
        const oneAtomId = stateArr[t - 1];
        const oneAtom = templates[oneAtomId];

        counter = counter + 1;
        let newAtomComp = { ...oneAtom };
        newAtomComp.id = counter;
        newAtomComp.parentid = iterateThisAtom.id;
        newState.push(counter);
        if (t === stateArr.length) moleculeStateArr.push(newState);
        thisIteratorCompArr.push(newAtomComp);
      }
    }
    iterateThisAtom.state = moleculeStateArr;
    return [...addTheseComp, iterateThisAtom, ...thisIteratorCompArr];
  };

  return (
    <div className={"editor-each-item"}>
      <label>添加本地组件</label>
      <Select onChange={handleChange} options={masterOptions} />
      <label>添加前端组件</label>
      <Select onChange={handleChange} options={generalOptions} />
    </div>
  );
};
