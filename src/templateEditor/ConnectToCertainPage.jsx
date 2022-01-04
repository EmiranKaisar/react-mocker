import Select from "react-select";
import { updateData, useData } from "@/data";

export const ConnectToCertainPage = () => {
  //templates
  //与必要的信息取得联系
  const data = useData();
  const templates = data.templates;
  const selectedId = data.selected;
  const selectedTempId = data.selectedtemplate;
  const selectedTemp = templates[selectedTempId];
  const thisTempState = selectedTemp.whichstate;
  const thisTempDeletedState = templates[selectedTempId].deletedstate;

  const stateArr = templates[selectedTempId].state;
  let optionsValue = [];
  for(let i=0; i< stateArr.length; i++){
      optionsValue.push(i);
  }

  let doNotShowTheseStates = [...thisTempDeletedState, thisTempState];
  for(let i=0; i< doNotShowTheseStates.length; i++){
      optionsValue = optionsValue.filter((stateId)=>(stateId !== doNotShowTheseStates[i]))
  }

  let options = [];
  options = optionsValue.map((optionVal)=>({
      value: optionVal,
      label: optionVal
  }))
  
  //交互事件
  const handleChange = (selectedState)=>{
       updateData((updater)=>{
           updater.templates[selectedId].statedir = selectedState.value;
       });
  }

  return (
    <div>
      <div className={"editor-each-item"}>
        <label>给选中的组件选择网页交互</label>
        <Select onChange={handleChange} options={options} />
      </div>
    </div>
  );
};
