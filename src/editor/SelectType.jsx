import { updateData, useData } from "@/data";
import { RadioButton } from "./RadioButton";
export const SelectType = () => {
  //elements editor
  //与必要的信息取得联系
  const data = useData();
  const elements = data.elements;
  const thisCompId = data.selected;
  const thisComp = elements[thisCompId];

  const setType = (newState) => {
    //记录目前是哪种类型
    updateData((d) => {
      d.elements[thisCompId].whichstate = newState;
    });
  };

  return (
    <div className="editor-each-item">
      <label>选择选中的组件的状态</label>
      <div className={"btn-in-row"}>
        {thisComp.state.map((sel, i) => (
          <RadioButton
            key={i}
            thisBtnId={i}
            selectedBtn={thisComp.whichstate}
            text={i}
            onClick={setType}
            btnType="select-comp-type-btn"
          />
        ))}
      </div>
    </div>
  );
};
