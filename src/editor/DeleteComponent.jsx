import { updateData, useData } from "@/data";

const DeleteComponent = () => {
  //elements
  const data = useData();
  const elements = data.elements;
  const selectedCompId = data.selected;
  const selectedComp = data.elements[selectedCompId];
  const thisPageId = data.whichpage;


  // 从arr中将特定value的元素剔除
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }
  //交互事件
  const deleteSelected = () => {
    if (Object.keys(selectedComp).includes('pageid')) {
      const selectedCompPageId = selectedComp.pageid;
      const selectedCompOrgArr = data.elements[0].pagearray[selectedCompPageId];
      const newPageArr = arrayRemove(selectedCompOrgArr, selectedCompId);
      updateData((d) => {
        d.elements[0].pagearray[selectedCompPageId] = newPageArr;
      });
    }else if(selectedComp.name === 'page'){
      updateData((d) => {
        d.elements[0].deletedpage.push(thisPageId);
      });
    } else {
      const selectedCompParentId = selectedComp.parentid;
      const selectedParent = elements[selectedCompParentId];
      const selectedCompInThisState = selectedParent.whichstate;
      const selectedStateArr = selectedParent.state[selectedCompInThisState];
      const newStateArr = arrayRemove(selectedStateArr, selectedCompId);
      updateData((d) => {
        d.elements[selectedComp.parentid].state[selectedCompInThisState] = newStateArr;
      });
    }
  };

  return (
    <div className={'editor-each-item'}>
          <label>删除选中的组件</label>
          <br/>
      <button
        className="delete-comp-btn"
        onClick={deleteSelected}
      >
        删除
      </button>
    </div>
  );
};

export default DeleteComponent;
