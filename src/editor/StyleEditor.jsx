import { updateData, useData } from "@/data";
import { useState } from "react";

const StyleEditor = () => {
  //与必要的信息取得联系
  const data = useData();
  const elements = data.elements;
  const thisCompId = data.selected;
  const thisComp = elements[thisCompId];
  const thisCompStyle = thisComp.style;
  const [tempStyle, setTempStyle] = useState(thisCompStyle);

  const [idArr, setIdArr] = useState([0, thisCompId]);
  if (thisCompId !== idArr[1]) {
    setIdArr([idArr[1], thisCompId]);
    setTempStyle(thisCompStyle);
  }

  const setStyle = (newStyle) => {
    setTempStyle(newStyle);
  };

  const allStr = thisCompStyle;
  const allStrArr = allStr.split(/\r\n|\n\r|\n|\r/);
  const normlizedStrArr = allStrArr.filter((oneLine) => oneLine !== "");

  const leftPart = (oneLine) => {
    return oneLine.substring(0, oneLine.indexOf(":") + 1);
  };
  const rightPart = (oneLine) => {
    return oneLine.substring(oneLine.indexOf(":") + 1, oneLine.length);
  };

  const enterDown = (e) => {
    if (e.key === "Enter") {
      updateData((d) => {
        d.elements[thisCompId].style = tempStyle;
      });
    }
  };

  return (
    <div className="editor-each-item">
      <label>编辑选中组件的CSS</label>
      <textarea
        type="text"
        placeholder="Write CSS"
        style={{
          height: "200px",
          width: "100%",
          fontSize: "14px",
        }}
        value={tempStyle}
        onChange={(e) => setStyle(e.target.value)}
        onKeyDown={enterDown}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          wordWrap:"break-word",
          background:"lightgray"
        }}
      >
        {normlizedStrArr.map((oneLine) => (
          <p
            key={oneLine}
          >
            <span style={{ color: "black" }}>{leftPart(oneLine)}</span>
            <span style={{ color: "orange" }}>{rightPart(oneLine)}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default StyleEditor;
