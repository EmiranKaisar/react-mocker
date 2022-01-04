import Select from "react-select";
import { updateData, useData } from "@/data";

const SelectImg = () => {
  //与必要的信息取得联系
  const data = useData();
  const elements = data.elements;
  const selectedId = data.selected;
  const selectedComp = elements[selectedId];
  const selectedCompImgArr = selectedComp.img;

    //列出这个分子级组件的所有原子级组件
    let options = [];
    for(let i=0; i< selectedCompImgArr.length; i++){
        options.push({value: selectedCompImgArr[i], label: selectedCompImgArr[i]});
    }

    //交互事件
    const handleChange = (selectedOption) => {
        //得出选中的option对应的index
        const selectedImgIndex = selectedCompImgArr.indexOf(selectedOption.value);
        //让img的指针指向选中的img
        updateData((updater) => {
          updater.elements[selectedId].whichimg = selectedImgIndex;
        });
      };

  return (
    <div className={"editor-each-item"}>
      <label>Select Img</label>
      <Select onChange={handleChange} options={options} />
    </div>
  );
};

export default SelectImg;
