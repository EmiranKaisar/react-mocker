import { updateData, useData } from "@/data";
import { GridRadioButton } from "./GridRadioButton";

export const GridSelector = () => {
  //与必要的信息取得联系
  const data = useData();
  const elements = data.elements;
  const thisCompId = data.selected;
  const thisComp = elements[thisCompId];
  const thisCompGridArr = thisComp.grid;
  const thisCompSelectedArea = thisComp.selectedarea;

  const thisPage = data.whichpage;
  const thisPageGridArr = elements[0].pagelayoutarray[thisPage];
  const selectedGridRow = parseInt(thisComp.selectedgrid / 4);
  const selectedGridColumn = thisComp.selectedgrid % 4;

  const setGrid = (newName) => {
    //记录目前是哪种类型
    const indexOfNewName = thisComp.grid.indexOf(newName);
    updateData((d) => {
      d.elements[thisCompId].selectedgrid = indexOfNewName;
    });
    if (thisCompSelectedArea.includes(indexOfNewName)) {
      updateData((d) => {
        d.elements[thisCompId].selectedarea = thisCompSelectedArea.filter(
          (index) => index !== indexOfNewName
        );
      });
    } else {
      updateData((d) => {
        d.elements[thisCompId].selectedarea = [
          ...thisCompSelectedArea,
          indexOfNewName,
        ];
      });
    }
  };

  const setWidth = (newText) => {
    updateData((d) => {
      d.elements[0].pagelayoutarray[thisPage][selectedGridColumn] = Number(newText);
    });
  };

  const setHeight = (newText) => {
    updateData((d) => {
      d.elements[0].pagelayoutarray[thisPage][selectedGridRow + 4] = Number(newText);
    });
  };

  const idToRow = (gridId) => {
    return parseInt(gridId / 4);
  };
  const idToCol = (gridId) => {
    return gridId % 4;
  };
  const canRow1 = thisCompGridArr.filter(
    (gridName) =>
      idToRow(thisCompGridArr.indexOf(gridName)) ===
      idToRow(thisCompSelectedArea[0])
  );
  const canCol1 = thisCompGridArr.filter(
    (gridName) =>
      idToCol(thisCompGridArr.indexOf(gridName)) ===
      idToCol(thisCompSelectedArea[0])
  );
  const canRow2 = canRow1.filter(
    (gridName) =>
      idToRow(thisCompGridArr.indexOf(gridName)) ===
      idToRow(thisCompSelectedArea[1])
  );
  const canCol2 = canCol1.filter(
    (gridName) =>
      idToCol(thisCompGridArr.indexOf(gridName)) ===
      idToCol(thisCompSelectedArea[1])
  );

  let canRow = [];
  let canCol = [];
  if (thisCompSelectedArea.length === 0) {
    canRow = thisCompGridArr;
    canCol = thisCompGridArr;
  } else if(thisCompSelectedArea.length === 1) {
    canRow = canRow1;
    canCol = canCol1;
  } else {
    canRow = canRow2;
    canCol = canCol2;
  }

  return (
    <div className="editor-each-item">
      <label>编辑选中的有机体的排布</label>
      <div className="editor-size-input-row">
        <div className="editor-size-input-item">
          width
          <input
            type="text"
            style={{ width: "20%" }}
            placeholder="Adjust Width"
            value={thisPageGridArr[selectedGridColumn]}
            onChange={(e) => setWidth(e.target.value)}
          />
          %
        </div>
        <div className="editor-size-input-item">
          height
          <input
            style={{ width: "20%" }}
            placeholder="Adjust Height"
            value={thisPageGridArr[selectedGridRow + 4]}
            onChange={(e) => setHeight(e.target.value)}
          />
          %
        </div>
      </div>
      <div className={"editor-grid-selector"}>
        {thisCompGridArr.map((sel, i) => (
          <GridRadioButton
            key={i}
            canRow={canRow}
            canCol={canCol}
            grids={thisCompGridArr}
            thisBtnId={i}
            selectedArea={thisCompSelectedArea}
            selectedBtn={thisComp.selectedgrid}
            text={sel}
            onClick={setGrid}
            btnType="editor-grid-selector-btn"
          />
        ))}
      </div>
    </div>
  );
};
