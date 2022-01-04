import { updateData, useData } from "@/data";
import { OptionsPicker } from "./OptionsPicker";

export const OptionsReader = () => {
  //与必要的信息取得联系
  const data = useData();
  const elements = data.elements;
  const thisCompId = data.selected;
  const thisComp = elements[thisCompId];
  const thisCompAllOptions = thisComp.alloptions;

  const thisCompAllOptionsKey = Object.keys(thisCompAllOptions);
  return (
    <div >
      {thisCompAllOptionsKey.map((thisOptionKey) => (
        <div key={thisOptionKey} className={"editor-each-item"}>
          <label >{thisOptionKey}</label>
          <OptionsPicker key={thisOptionKey} thisOptionKey={thisOptionKey}/>
        </div>
      ))}
    </div>
  );
};
