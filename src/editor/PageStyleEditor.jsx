import { updateData, useData } from "@/data";

export const PageStyleEditor = () => {
  //与必要的信息取得联系
  const data = useData();
  const elements = data.elements;
  const thisPageId = data.whichpage;
  const thisPageStyle = elements[0].pagestylearray[thisPageId];
  const thisPageBgImg = thisPageStyle.backgroundimg;
  const thisPageBgColor = thisPageStyle.backgroundcolor;
  const setImg = (newImg)=>{
      updateData((d)=>{
          d.elements[0].pagestylearray[thisPageId].backgroundimg = newImg;
      });
  }
  const setColor = (newColor)=>{
    updateData((d)=>{
        d.elements[0].pagestylearray[thisPageId].backgroundcolor = newColor;
    });
}
  return (
    <div>
      <div className="editor-each-item">
        <label>编辑图片链接</label>
        <input
          type="text"
          placeholder="粘贴图片链接"
          value={thisPageBgImg}
          style={{width:'100%'}}
          onChange={(e) => setImg(e.target.value)}
        />
      </div>
      <div className="editor-each-item">
        <label>编辑颜色的Hex值</label>
        <input
          type="text"
          placeholder="颜色hex值"
          value={thisPageBgColor}
          style={{width:'100%'}}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
};
