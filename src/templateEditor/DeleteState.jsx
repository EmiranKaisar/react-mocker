import { updateData, useData } from "@/data";

const DeleteState = () => {
  //templateEditor
  const data = useData();
  const templates = data.templates;
  const selectedTempId = data.selectedtemplate;


  const selectedCompId = data.selected;
  const selectedComp = templates[selectedCompId];

  const deleteStateDir = ()=>{
      if(selectedComp.statedir !== null){
        updateData((updater)=>{
            updater.templates[selectedTempId].deletedstate.push(selectedComp.statedir);
        })
        updateData((updater)=>{
            updater.templates[selectedCompId].statedir = null;
        })
      }
  }

  return (
    <div className={"editor-each-item"}>
      <label>删除选中组件的状态交互</label>
      <br />
      <button className="add-interaction-btn" onClick={deleteStateDir}>
        删除状态交互
      </button>
    </div>
  );
};

export default DeleteState;
