export const RadioButton = ({ thisBtnId, selectedBtn, text, onClick, btnType}) => {
  return (
    <button disabled={false} className={`${btnType} ${thisBtnId===selectedBtn ? 'selected' : ''}`} onClick={() => onClick(text)}>
      {text}
    </button>
  );
};
