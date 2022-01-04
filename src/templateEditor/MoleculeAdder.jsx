import { updateData, useData } from "@/data";
import { useState } from "react";

const MoleculeAdder = () => {
  //template editor
  const data = useData();
  const templates = data.templates;
  const elements = data.elements;
  const [newName, setNewName] = useState();

  const newMolecule = {
    id: 2,
    name: 'molecule',
    parentid: 0,
    parentstate: 0,
    state: [[]],
    whichstate: 0,
    deletedstate: [],
    type: ["card", "item", "space-between-item"],
    selectedtype: 0,
    canchild: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    style: "",
    comptype: "master",
    complevel: "molecule",
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
      newMolecule.id = templates.length;
      newMolecule.name = newName;
      
      //上传
      updateData((d) => {
        d.templates.push(newMolecule);
      });

      //在templates中给所有在molecule上级的canchild中添加该temp的id
      for (let i = 0; i < templates.length; i++) {
        if (
          templates[i].name === "moleculecontainer" ||
          templates[i].complevel === "organism"
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
          elements[i].complevel === "organism"
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
        placeholder="新分子组件的名称"
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={addNewTemp}>添加</button>
    </div>
  );
};

export default MoleculeAdder;
