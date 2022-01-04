import Select from "react-select";
import { updateData, useData } from "@/data";

export const ConnectToCertainPage = () => {
  //与必要的信息取得联系
  const data = useData();
  const elements = data.elements;
  const selectedId = data.selected;
  const selectedComp = elements[selectedId];
  const selectedCompName = selectedComp.name;
  const thisPageId = data.whichpage;
  const deletedPage = elements[0].deletedpage;

  const pageArr = elements[0].pagearray;
  let optionsValue = [];
  for(let i=0; i< pageArr.length; i++){
      optionsValue.push(i);
  }

  let doNotShowThesePages = [...deletedPage, thisPageId];
  for(let i=0; i< doNotShowThesePages.length; i++){
      optionsValue = optionsValue.filter((pageId)=>(pageId !== doNotShowThesePages[i]))
  }

  let options = [];
  options = optionsValue.map((optionVal)=>({
      value: optionVal,
      label: optionVal
  }))
  
  //交互事件
  const handleChange = (selectedPage)=>{
      
       updateData((updater)=>{
           updater.elements[selectedId].dir = selectedPage.value;
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
