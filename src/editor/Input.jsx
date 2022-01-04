import { updateData, useData } from "@/data";

export const Input = () => {
  //element editor
  const data = useData();
  const selectedId = data.selected;
  const selectedComp = data.elements[selectedId];
  const selectedInput = selectedComp.input;

  const setText = (newText) => {
    updateData((d) => {
      d.elements[selectedId].input = newText;
    });
  };

  return (
    <div className="editor-each-item">
      <label>编辑文字</label>
      <input
        type="text"
        placeholder="Add Label To Button"
        value={selectedInput}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};
