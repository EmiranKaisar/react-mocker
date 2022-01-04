import { updateData, useData } from "@/data";
import styled from 'styled-components';

export const MasterTree = ({ masterId }) => {
  //与必要的数据取得联系
  const data = useData();
  const edit = data.edit;
  const elements = data.elements;
  const thisMaster = elements[masterId];
  const thisMasterState = thisMaster.whichstate;
  const thisMasterAtomArr = thisMaster.state[thisMasterState];

  const thisMasterStyle = thisMaster.style;

  //发生在selfTree这个molecule的交互事件
  const selfTreeHandleClick = (e) => {
    e.stopPropagation(); //为了点击到单个元素
    if (edit) {
      updateData((updater) => {
        updater.selected = masterId;
      });
    } else {
      if (thisMaster.dir !== null) {
        updateData((updater) => {
          updater.whichpage = thisMaster.dir;
        });
      }else if(thisMaster.statedir !== null){
        updateData((updater) => {
          updater.elements[thisMaster.parentid].whichstate = thisMaster.statedir;
        });
      }
      updateData((updater) => {
        updater.selected = masterId;
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
        updater.elements[nodeId].open = !elements[nodeId].open;
      });
      updateData((updater) => {
        updater.elements[masterId].selectedkey = nodeId;
      });
    } else {
      updateData((updater) => {
        updater.whichpage = elements[nodeId].dir;
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
        updater.elements[masterId].selectedkey = leafId;
      });
    } else {
      updateData((updater) => {
        updater.whichpage = elements[leafId].dir;
      });
    }
  };

  const MasterTreeStyle = styled.div`
  ${thisMasterStyle}
  `;

  return (
    <MasterTreeStyle
      className={`selftree ${edit ? "editmode" : ""} ${
        data.selected === masterId ? "chosen" : ""
      }`}
      onClick={selfTreeHandleClick}
    >
      <ul>
        {thisMasterAtomArr.map((nodeId) =>
          elements[nodeId].name === "selftreenode" ? (
            <li key={nodeId}>
              <span
                className={`selftree-folder ${edit ? "editmode" : ""} ${
                  data.selected === nodeId ? "chosen" : ""
                } ${
                  elements[masterId].selectedkey === nodeId ? "active" : ""
                }`}
                onClick={(e) => selfTreeNodeClick(e, nodeId)}
              >
                <span
                  type="select-up"
                  rotate={`${elements[nodeId].open ? 180 : 90}`}
                />
                {elements[nodeId].input}
              </span>
              <ul
                className={`selftree-nested ${
                  elements[nodeId].open ? "open" : ""
                }`}
              >
                {elements[nodeId].childarray.map((leafId) => (
                  <li className="selftree-leaf" key={leafId}>
                    <span
                      className={`selftree-leaf ${edit ? "editmode" : ""} ${
                        data.selected === leafId ? "chosen" : ""
                      } ${
                        elements[masterId].selectedkey === leafId
                          ? "active"
                          : ""
                      }`}
                      onClick={(e) => selfTreeLeafClick(e, leafId)}
                    >
                      {elements[leafId].input}
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
                  elements[masterId].selectedkey === nodeId ? "active" : ""
                }`}
                onClick={(e) => selfTreeLeafClick(e, nodeId)}
              >
                {elements[nodeId].input}
              </span>
            </li>
          )
        )}
      </ul>
    </MasterTreeStyle>
  );
};
