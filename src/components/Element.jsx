import { Organism} from "./Organism";
import { useData, updateData } from "@/data";

export const Element = () => {
  //查看现在在哪个page中
  const data = useData();
  const edit = data.edit;
  const elements = data.elements;
  const thisPage = data.whichpage;
  const thisPageOrgArr = data.elements[0].pagearray[thisPage];
  const thisPageGridArr = elements[0].pagelayoutarray[thisPage];
  const thisPageStyle = elements[0].pagestylearray[thisPage];

  //交互事件
  const handleChildClick = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    updateData((updater) => {
      updater.selected = 0;
    });
  };
  //organism的array
  const OrganismArray = thisPageOrgArr.map((organismId) => (
    <Organism key={organismId} organismId={organismId} />
  ));
  //调整col和row的大小
  const col = `${thisPageGridArr[0]}% ${thisPageGridArr[1]}% ${thisPageGridArr[2]}% ${thisPageGridArr[3]}%`;
  const row = `${thisPageGridArr[4]}% ${thisPageGridArr[5]}% ${thisPageGridArr[6]}% ${thisPageGridArr[7]}%`;
  //elements背景图片或者颜色的接口
  const myStyle = {
    gridTemplateRows: row,
    gridTemplateColumns: col,
    backgroundImage: `url(${thisPageStyle.backgroundimg})`,
    backgroundColor: `${thisPageStyle.backgroundcolor}`,
  };

  return (
    <div
      className={`page ${edit ? "editmode" : ""} ${
        data.selected === 0 ? "chosen" : ""
      }`}
      style={myStyle}
      onClick={handleChildClick}
    >
      <div className="page-id">
        <h1>Page: {thisPage} </h1>
      </div>
      {OrganismArray}
    </div>
  );
};
