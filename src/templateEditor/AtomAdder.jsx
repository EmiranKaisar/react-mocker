import { updateData, useData } from "@/data";
import { useState } from "react";

const AtomAdder = () => {
  //template editor
  const data = useData();
  const templates = data.templates;
  const elements = data.elements;
  const [newName, setNewName] = useState();

  const newAtom = {
    id: 7,
    name: newName,
    parentid: 0,
    parentstate: 0,
    state: [[]],
    whichstate: 0,
    deletedstate: [],
    type: ["card-title", "regular-btn"],
    selectedtype: 0,
    input: "这里",
    style: "",
    img: "",
    whichimg: 0,
    canchild: [5, 6],
    comptype: "master",
    complevel: "atom",
    showtree: true,
    dir: null,
    statedir: null,
  };

  const addNewTemp = () => {
    let sameName = false;
    for (let i = 0; i < templates.length; i++) {
      if (newName === templates[i].name && templates[i].showtree) {
        sameName = true;
      }
    }
    if (sameName) {
      alert("相同的名字");
    } else {
      //上传
      updateData((d) => {
        d.templates.push(newAtom);
      });
      //更改id
      updateData((d) => {
        d.templates[templates.length].id = templates.length;
      });

      //在templates中给所有在molecule上级的canchild中添加该temp的id
      for (let i = 0; i < templates.length; i++) {
        if (
          templates[i].name === "moleculecontainer" ||
          templates[i].complevel === "organism" ||
          templates[i].complevel === "molecule" ||
          templates[i].name === "container" ||
          templates[i].name === "subcontainer"
        ) {
          updateData((d) => {
            d.templates[i].canchild.push(templates.length);
          });
        }
      }
      //在elements中给所有在molecule上级的canchild中添加该temp的id
      for (let i = 0; i < elements.length; i++) {
        if (
          elements[i].name === "moleculecontainer" ||
          elements[i].complevel === "organism" ||
          elements[i].complevel === "molecule" ||
          elements[i].name === "container" ||
          elements[i].name === "subcontainer"
        ) {
          updateData((d) => {
            d.elements[i].canchild.push(templates.length);
          });
        }
      }
    }
  };

  return (
    <div className="editor-template-adder">
      <input
        type="text"
        placeholder="新原子组件的名称"
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={addNewTemp}>添加</button>
    </div>
  );
};

export default AtomAdder;
