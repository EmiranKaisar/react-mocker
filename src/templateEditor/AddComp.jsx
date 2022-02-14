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
    if (selectedOption.value === 'text' || selectedOption.value === 'img') {
      [compToAdd] = templates.filter(
        (comp) => comp.name === selectedOption.value
      );
    } else {
      [compToAdd] = templates.filter(
        (comp) => comp.name === selectedOption.value && comp.showtree
      );
    }

    //const newCompToAdd = { ...compToAdd };
    const newCompToAdd = { ...compToAdd };
    newCompToAdd.id = templates.length;
    newCompToAdd.parentid = selectedId;
    newCompToAdd.showtree = false;
    addTheseComp.push(newCompToAdd);
    addTheseComp = compRecurse(addTheseComp, newCompToAdd);
    updateData((updater) => {
      updater.templates[selectedId].state[selectedCompState].push(templates.length);
    });
    addTheseComp.map((e) => {
      updateData((updater) => {
        updater.templates.push(e);
      });
    })
  };

  const compRecurse = (addTheseComp, start) => {
    let counter = templates.length + addTheseComp.length-1;
    let newAddTheseComp = [...addTheseComp];
    const thisCompStateArr = [];
      for (let i = 1; i <= start.state.length; i++) {
        //一个state中的组件arr
        const stateArr = start.state[i - 1];
        //增加一个state
        const newState = [];

        if (stateArr.length < 1) {
          thisCompStateArr.push([]);
        }else{
        for (let t = 1; t <= stateArr.length; t++) {
          const oneCompId = stateArr[t - 1];
          const oneComp = templates[oneCompId];

          if(newAddTheseComp.length + templates.length - 1 !== counter ){
            counter = newAddTheseComp.length + templates.length;
          }else{
            counter = counter + 1;
          }

          let newCompToAdd = { ...oneComp };
          newCompToAdd.id = counter;
          newCompToAdd.parentid = start.id;
          newCompToAdd.showtree = false;

          newState.push(counter);
          if (t === stateArr.length) thisCompStateArr.push(newState);
          newAddTheseComp.push(newCompToAdd);
          newAddTheseComp = compRecurse(newAddTheseComp, newCompToAdd);
        }
      }
    }
    start.state = thisCompStateArr;
    newAddTheseComp[addTheseComp.length-1] = start;
      return newAddTheseComp;
    
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
