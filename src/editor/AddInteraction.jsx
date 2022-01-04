import { updateData, useData } from "@/data";

const AddInteraction = () => {
  const data = useData();
  const selectedCompId = data.selected;

  const newPageLayout = [25,25,25,25,25,25,25,25];
  const newPageStyle = {"backgroundimg":"", "backgroundcolor":"#F0F2F5"};

  const AddDir = () => {
    //在pagearray中增加一页
    updateData((d) => {
      d.elements[0].pagearray.push([]);
    });

    //给这个页面添加默认的网格属性
    updateData((d) => {
      d.elements[0].pagelayoutarray.push(newPageLayout);
    });

    //给这个页面添加默认的背景属性
    updateData((d)=>{
      d.elements[0].pagestylearray.push(newPageStyle);
    })

    //将whichpage调至最新的一页
    updateData((d) => {
      d.whichpage = data.elements[0].pagearray.length;
    });
    //将这一页的page的id存到该元素的dir中
    updateData((d) => {
      d.elements[selectedCompId].dir = data.elements[0].pagearray.length;
    });
  };
  return (
    <div className={"editor-each-item"}>
      <label>给选中组件添加新的网页交互</label>
      <br />
      <button className="add-interaction-btn" onClick={AddDir}>
        添加网页交互
      </button>
    </div>
  );
};

export default AddInteraction;
