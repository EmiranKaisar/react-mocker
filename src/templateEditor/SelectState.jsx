import { updateData, useData } from "@/data";
import { RadioButton } from "./RadioButton";
export const SelectState = () => {
  //templates
  //与必要的信息取得联系
  const data = useData();
  const templates = data.templates;
  const thisTempId = data.selectedtemplate;
  const thisTemp = templates[thisTempId];

  const setState = (newState) => {
    //记录目前是哪种类型
    updateData((d) => {
      d.templates[thisTempId].whichstate = newState;
    });
  };

  return (
    <div className={"editor-each-item"}>
      <label>选择组件的状态</label>
      <div className={"btn-in-row"}>
        {thisTemp.state.map((sel, i) => (
          <RadioButton key={i} thisBtnId = {i} selectedBtn = {thisTemp.whichstate} text={i} onClick={setState} btnType='select-comp-type-btn' />
        ))}
      </div>
    </div>
  );
};
