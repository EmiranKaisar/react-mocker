import { updateData, useData } from "@/data";

const AddInteraction = () => {
  //templateEditor
  const data = useData();
  const templates = data.templates;
  const selectedTempId = data.selectedtemplate;
  const selectedCompId = data.selected;

  const AddDir = () => {
    //在state的数组中新加一个空的state
    updateData((d) => {
      d.templates[selectedTempId].state.push([]);
    });
    //将该temp的whichstate调至最新的state
    updateData((d) => {
      d.templates[selectedTempId].whichstate = templates[selectedTempId].state.length;
    });
    //将这个state的id存到该元素的statedir中
    updateData((d) => {
      d.templates[selectedCompId].statedir = templates[selectedTempId].state.length;
    });
  };
  return (
    <div className={"editor-each-item"}>
      <label>添加组件状态</label>
      <br />
      <button className="add-interaction-btn" onClick={AddDir}>
        添加组件状态
      </button>
    </div>
  );
};

export default AddInteraction;
