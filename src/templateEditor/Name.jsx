import { updateData, useData } from "@/data";
const Name = () => {
      //与必要的信息取得联系
  const data = useData();
  const selectedId = data.selected;
  const selectedAtom = data.templates[selectedId];
    return (
        <>
        <h3 className={'editor-each-item'}>
           选中组件: {selectedAtom.name}
        </h3>
        {selectedAtom.statedir !== null && <h3 className={'editor-each-item'}>
           选中组件的状态交互: {selectedAtom.statedir}
        </h3>}
        </>
    )
}

export default Name
