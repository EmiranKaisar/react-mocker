import { updateData, useData } from "@/data";
import { RadioButton } from "./RadioButton";

export const OptionsPicker = ({ thisOptionKey }) => {
  //与必要的信息取得联系
  const data = useData();
  const templates = data.templates;
  const thisCompId = data.selected;
  const thisComp = templates[thisCompId];
  const thisOption = thisComp.alloptions[thisOptionKey];
  const thisOptArr = thisOption.options;

  const setOpt = (newName) => {
    //记录目前是哪种类型
    updateData((d) => {
      d.templates[thisCompId].alloptions[thisOptionKey].index =
        thisOptArr.indexOf(newName);
    });
  };

  return (
    <div className={"btn-in-row"}>
      <div className={"btn-in-row"}>
        {thisOptArr.map((sel, i) => (
          <RadioButton
            key={i}
            thisBtnId={i}
            selectedBtn={thisOption.index}
            text={sel}
            onClick={setOpt}
            btnType="select-comp-type-btn"
          />
        ))}
      </div>
    </div>
  );
};
