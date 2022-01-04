import { SelectType } from "./SelectType";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { updateData, useData } from "@/data";
import { AddComp } from "./AddComp";
import DeleteComponent from "./DeleteComponent";
import Name from "./Name";
import AddInteraction from "./AddInteraction";
import SelectImg from "./SelectImg";
import { ConnectToCertainPage } from "./ConnectToCertainPage";
import { OptionsReader } from "./OptionsReader";
import { GridSelector } from "./GridSelector";
import { PageStyleEditor } from "./PageStyleEditor";
import StyleEditor from "./StyleEditor";
import { useState, useEffect } from "react";
import DeleteInteraction from "./DeleteInteraction";

export const ElementsEditor = () => {
  //与必要的信息取得联系
  const data = useData();
  const elements = data.elements;
  const selectedId = data.selected;
  const selectedComp = elements[selectedId];

  //交互事件
  const onSubmit = (e) => {
    e.preventDefault();
    submitChanges();
  };

  const formerNum = Number(data.preelenum);
  const presentNum = Number(elements.length);
  //跟新原有的element
  const submitChanges = async () => {
    for (let i = 0; i < formerNum; i++) {
      const res = await fetch(`http://localhost:5501/elements/${i}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(elements[i]),
      });
    }
    if (presentNum > formerNum) {
      otherParts();
    }
  };
  //添置新加的element
  const otherParts = async () => {
    for (let i = formerNum; i < presentNum; i++) {
      const res = await fetch(`http://localhost:5501/elements/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(elements[i]),
      });
    }
    updateData((updater)=>{
      updater.preelenum = presentNum;
    })
  };
  console.log(elements[selectedId]);

  return (
    <div className="editor-container">
      <h1>网页编辑器</h1>
      <Name />
      {Object.keys(selectedComp).includes("input") && <Input />}
      <AddComp />
      {Object.keys(selectedComp).includes("grid") && <GridSelector />}
      {selectedComp.state !== undefined && <SelectType />}
      {/* {Object.keys(selectedComp).includes("img") && <SelectImg />} */}
      {Object.keys(selectedComp).includes("alloptions") && <OptionsReader />}
      {selectedComp.name === "page" && <PageStyleEditor />}
      {Object.keys(selectedComp).includes("style") && <StyleEditor />}
      <DeleteComponent />
      <AddInteraction />
      <ConnectToCertainPage />
      {selectedComp.dir !== null && <DeleteInteraction />}
      <SubmitButton onSubmit={onSubmit} />
    </div>
  );
};
