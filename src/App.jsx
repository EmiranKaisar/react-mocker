import { Element } from "./components/Element";
import { useState, useEffect } from "react";
import { ElementsEditor } from "./editor/ElementsEditor";
import "./style/App.css";
import { useData, updateData } from "@/data";
import Select from "react-select";
import Templates from "./templateEditor/Templates";

// * 可以直接 export  // Seognil LC 2021/11/12
export const App = () => {
  //从index.ts那里调取全局的信息
  const data = useData();
  const { whicheditor } = data;
  //记录edit mode
  const editmode = useData().edit;

  //从json server获取组件的设置并通过createstore将信息同步在index.ts(全局)
  useEffect(() => {
    const getElements = async () => {
      const elementsFromServer = await ApiFetchAll();
        updateData((updater) => {
          updater.elements = elementsFromServer[0];
        });
        updateData((updater) => {
          updater.preelenum= elementsFromServer[0].length;
        });


        updateData((updater) => {
          updater.templates = elementsFromServer[1];
        });
        updateData((updater) => {
          updater.pretempnum= elementsFromServer[1].length;
        });
    };
    getElements();
  }, []);

  //调取elements和templates
  const ApiFetchAll = async () => {
    const res1 = await fetch(`http://localhost:5501/elements`);
    const res2 = await fetch(`http://localhost:5501/templates/`);
    const data1 = await res1.json();
    const data2 = await res2.json();
    const data = [data1, data2];
    return data;
  };

  //编辑模式的开关
  const startEdit = () => {
    updateData((updater) => {
      updater.edit = !editmode;
    });
  };

  const EditorSelector = [
    { value: "elements", label: "网页编辑器" },
    { value: "templates", label: "组件编辑器" },
  ];

  const EditorSelectorChange = (selectedOption) => {
    updateData((updater) => {
      updater.whicheditor = selectedOption.value;
    });
    updateData((updater) => {
      updater.selected = 0;
    });
  };

  return (
    <div>
      <button
        className={`editor-switch-btn ${editmode ? "stopEdit" : ""}`}
        onClick={startEdit}
      >
        {editmode ? "停止编辑" : "开始编辑"}
      </button>
      {!editmode && (
        <Select
          onChange={EditorSelectorChange}
          options={EditorSelector}
          className="editor-selector"
        />
      )}
      {whicheditor === "elements" ? (
        <div className="pagecontainer">
          <Element />
          {editmode && <ElementsEditor />}
        </div>
      ) : (
        <Templates />
      )}
    </div>
  );
};

// * ---------------------------------------------------------------- API

// * mac 升了 Monterey 有个服务也是 5000，会冲突，可以改成不那么常用的  // Seognil LC 2021/11/12
