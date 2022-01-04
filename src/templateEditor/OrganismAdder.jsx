import { updateData, useData } from "@/data";
import { useState } from "react";
const OrganismAdder = () => {
  //template editor
  const data = useData();
  const templates = data.templates;
  const [newName, setNewName] = useState();
  const newOrgansim = {
    id: 0,
    pageid: 0,
    name: newName,
    state: [[]],
    whichstate: 0,
    deletedstate: [],
    type: [
      "content-container",
      "left-side-bar",
      "top-bar-black",
      "top-bar-white",
    ],
    selectedtype: 0,
    canchild: [1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    grid: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
    ],
    selectedgrid: 0,
    selectedarea: [0],
    style: "",
    comptype: "master",
    complevel: "organism",
    showtree:true,
    dir: null,
    statedir: null,
  };

  const addNewTemp = () => {
      let sameName = false;
      for(let i=0; i<templates.length; i++){
          if(newName === templates[i].name && templates[i].showtree){
              sameName = true;
          }
      }
      if(sameName){
          alert('相同的名字');
      }else{
        updateData((d) => {
            d.templates.push(newOrgansim);
          });
          updateData((d) => {
            d.templates[templates.length].id = templates.length;
          });
          updateData((d) => {
            d.elements[0].canchild.push(templates.length);
          });
      }
  };

  return (
    <div className="editor-template-adder">
      <input
        type="text"
        placeholder="新有机体名称"
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={addNewTemp}>添加</button>
    </div>
  );
};

export default OrganismAdder;
