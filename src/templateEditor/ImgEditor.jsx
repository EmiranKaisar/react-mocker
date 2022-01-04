import { updateData, useData } from "@/data";

const ImgEditor = () => {
    //template editor
    const data = useData();
    const tempplates = data.templates;
    const thisImgId = data.selected;
    const thisImgBgImg = tempplates[thisImgId].img;
    const setImg = (newImg)=>{
        updateData((d)=>{
            d.templates[thisImgId].img = newImg;
        });
    }

    return (
        <div className="editor-each-item">
        <label>编辑图片链接</label>
        <input
          type="text"
          placeholder="粘贴图片链接"
          value={thisImgBgImg}
          style={{width:'100%'}}
          onChange={(e) => setImg(e.target.value)}
        />
      </div>
    )
}

export default ImgEditor
