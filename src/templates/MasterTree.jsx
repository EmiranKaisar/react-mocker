import { updateData, useData } from "@/data";
import styled from 'styled-components';

export const MasterTree = ({ masterId} ) => {
  //与必要的数据取得联系
  const data = useData();
  const edit = data.edit;
  const templates = data.templates;
  const thisMasterTempId = data.selectedtemplate;
  let thisMasterTemp;
  if(masterId === undefined){
    thisMasterTemp = templates[thisMasterTempId];
  }else{
    thisMasterTemp = templates[masterId];
  }
  const thisMasterState = thisMasterTemp.whichstate;
  const thisMasterAtomArr = thisMasterTemp.state[thisMasterState];

  const thisMasterStyle = thisMasterTemp.style;

  //发生在selfTree这个molecule的交互事件
  const selfTreeHandleClick = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    if (edit) {
      updateData((updater) => {
        updater.selected = thisMasterTemp.id;
      });
    } else {
      if (thisMaster.statedir !== null) {
        updateData((updater) => {
          updater.templates[thisMasterTemp.parentid].whichstate = thisMaster.statedir;
        });
      }
      updateData((updater) => {
        updater.selected = thisMasterTemp.id;
      });
    }
  };

  //发生在Node的交互事件
  const selfTreeNodeClick = (e, nodeId) => {
    e.stopPropagation();
    if (edit) {
      updateData((updater) => {
        updater.selected = nodeId;
      });
      updateData((updater) => {
        updater.elements[nodeId].open = !templates[nodeId].open;
      });
      updateData((updater) => {
        updater.elements[thisMasterTemp.id].selectedkey = nodeId;
      });
    } else {
      updateData((updater) => {
        updater.whichpage = templates[nodeId].dir;
      });
    }
  };
  //发生在leaf的交互事件
  const selfTreeLeafClick = (e, leafId) => {
    e.stopPropagation();
    if (edit) {
      updateData((updater) => {
        updater.selected = leafId;
      });
      updateData((updater) => {
        updater.elements[thisMasterTemp.id].selectedkey = leafId;
      });
    } else {
      updateData((updater) => {
        updater.whichpage = templates[leafId].dir;
      });
    }
  };

  const MasterTreeStyle = styled.div`
  ${thisMasterStyle}
  `;

  return (
    <MasterTreeStyle
      className={`selftree ${edit ? "editmode" : ""} ${
        data.selected === thisMasterTemp.id ? "chosen" : ""
      }`}
      onClick={selfTreeHandleClick}
    >
      <ul>
        {thisMasterAtomArr.map((nodeId) =>
          templates[nodeId].name === "selftreenode" ? (
            <li key={nodeId}>
              <span
                className={`selftree-folder ${edit ? "editmode" : ""} ${
                  data.selected === nodeId ? "chosen" : ""
                } ${
                  templates[thisMasterTemp.id].selectedkey === nodeId ? "active" : ""
                }`}
                onClick={(e) => selfTreeNodeClick(e, nodeId)}
              >
                <span
                  type="select-up"
                  rotate={`${templates[nodeId].open ? 180 : 90}`}
                />
                {templates[nodeId].input}
              </span>
              <ul
                className={`selftree-nested ${
                  templates[nodeId].open ? "open" : ""
                }`}
              >
                {templates[nodeId].childarray.map((leafId) => (
                  <li className="selftree-leaf" key={leafId}>
                    <span
                      className={`selftree-leaf ${edit ? "editmode" : ""} ${
                        data.selected === leafId ? "chosen" : ""
                      } ${
                        templates[thisMasterTemp.id].selectedkey === leafId
                          ? "active"
                          : ""
                      }`}
                      onClick={(e) => selfTreeLeafClick(e, leafId)}
                    >
                      {templates[leafId].input}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={nodeId}>
              <span
                className={`selftree-leaf ${edit ? "editmode" : ""} ${
                  data.selected === nodeId ? "chosen" : ""
                } ${
                  templates[thisMasterTemp.id].selectedkey === nodeId ? "active" : ""
                }`}
                onClick={(e) => selfTreeLeafClick(e, nodeId)}
              >
                {templates[nodeId].input}
              </span>
            </li>
          )
        )}
      </ul>
    </MasterTreeStyle>
  );
};
