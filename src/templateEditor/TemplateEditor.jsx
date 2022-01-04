import { Input } from "./Input";
import { SubmitButton } from "../editor/SubmitButton";
import { updateData, useData } from "@/data";
import { AddComp } from "./AddComp";
import DeleteComponent from "./DeleteComponent";
import Name from "./Name";
import AddInteraction from "./AddInteraction";
import { ConnectToCertainPage } from "./ConnectToCertainPage";
import { OptionsReader } from "./OptionsReader";
import StyleEditor from "./StyleEditor";
import { useState, useEffect } from "react";
import DeleteState from "./DeleteState";
import { SelectState } from "./SelectState";
import ImgEditor from "./ImgEditor";

export const TemplateEditor = ({ formerTempNumber }) => {
  //与必要的信息取得联系
  const data = useData();
  const templates = data.templates;
  const selectedTemmplateId = data.selectedtemplate;
  const selectedTemplate = templates[selectedTemmplateId];

  const selectedCompId = data.selected;
  const selectedComp = templates[selectedCompId];

  //交互事件
  const onSubmit = (e) => {
    e.preventDefault();
    submitChanges();
  };

  //记录目前templates的temp的数量
  // const [tempNums, setTempNums] = useState([20]);
  const formerNum = Number(data.pretempnum);
  const presentNum = Number(templates.length);


  //跟新原有的element
  const submitChanges = async () => {
    for (let i = 0; i < formerNum; i++) {
      const res = await fetch(`http://localhost:5501/templates/${i}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(templates[i]),
      });
    }
    if (presentNum > formerNum) {
      otherParts();
    }
  };
  //添置新加的element
  const otherParts = async () => {
    for (let i = formerNum; i < presentNum; i++) {
      const res = await fetch(`http://localhost:5501/templates/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(templates[i]),
      });
    }
    // setTempNums([...tempNums, presentNum]);
    updateData((updater)=>{
      updater.pretempnum = presentNum;
    })
  };
  // console.log(templates[selectedCompId]);

  return (
    <div className="editor-templates-editor">
      <h1>组件编辑器</h1>
      <Name />
      {Object.keys(selectedComp).includes("input") && <Input />}
      <AddComp />
      {Object.keys(selectedTemplate).includes("state") && <SelectState />}
      {selectedComp.name === 'img' && <ImgEditor />}
      {Object.keys(selectedComp).includes("alloptions") && (
        <OptionsReader />
      )}
      {Object.keys(selectedComp).includes("style") && <StyleEditor />}
       <DeleteComponent />
      <AddInteraction />
      <ConnectToCertainPage />
      {selectedComp.statedir !== null && <DeleteState />}
      <SubmitButton onSubmit={onSubmit} />
    </div>
  );
};
