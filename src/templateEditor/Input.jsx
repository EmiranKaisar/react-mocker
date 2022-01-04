import { updateData, useData } from "@/data";

export const Input = () => {
  //template editor
  const data = useData();
  const selectedId = data.selected;
  const selectedComp = data.templates[selectedId];
  const selectedInput = selectedComp.input;

  const setText = (newText) => {
    updateData((d) => {
      d.templates[selectedId].input = newText;
    });
  };

  return (
    <div className="editor-each-item">
      <label>编辑文字</label>
      <input
        type="text"
        placeholder="输入文字"
        value={selectedInput}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};
