import { updateData, useData } from "@/data";

const DeleteInteraction = () => {
  //ElementEditor
  const data = useData();
  const elements = data.elements;


  const selectedCompId = data.selected;
  const selectedComp = elements[selectedCompId];

  const deleteStateDir = ()=>{
      if(selectedComp.dir !== null){
        updateData((updater)=>{
            updater.elements[0].deletedpage.push(selectedComp.dir);
        })
        updateData((updater)=>{
            updater.elements[selectedCompId].dir = null;
        })
      }
  }

  return (
    <div className={"editor-each-item"}>
      <label>删除选中的组件交互</label>
      <br />
      <button className="add-interaction-btn" onClick={deleteStateDir}>
        删除交互
      </button>
    </div>
  );
};

export default DeleteInteraction;