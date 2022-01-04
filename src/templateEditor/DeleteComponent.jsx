import { updateData, useData } from "@/data";

const DeleteComponent = () => {
  const data = useData();
  const templates = data.templates;
  const selectedTempId = data.selected;
  const selectedTemp = data.templates[selectedTempId];
  const thisPageId = data.whichpage;

  // 从arr中将特定value的元素剔除
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }
  //交互事件
  const deleteSelected = () => {
    if (selectedTempId === data.selectedtemplate) {
      updateData((d) => {
        d.templates[selectedTempId].showtree = false;
      });
      updateData((d) => {
        d.selectedtemplate = 0;
      });
    } else {
      const selectedTempParentId = selectedTemp.parentid;
      const selectedParent = templates[selectedTempParentId];
      const selectedTempInThisState = selectedParent.whichstate;
      const selectedStateArr = selectedParent.state[selectedTempInThisState];
      const newStateArr = arrayRemove(selectedStateArr, selectedTempId);
      updateData((d) => {
        d.templates[selectedTemp.parentid].state[selectedTempInThisState] =
          newStateArr;
      });
    }
  };

  return (
    <div className={"editor-each-item"}>
      <label>删除选中的组件</label>
      <br />
      <button className="delete-comp-btn" onClick={deleteSelected}>
        删除
      </button>
    </div>
  );
};

export default DeleteComponent;
