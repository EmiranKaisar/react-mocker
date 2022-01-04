export const GridRadioButton = ({canRow, canCol, selectedArea, thisBtnId, selectedBtn, text, onClick, btnType}) => {

    return (
      <button disabled={!canRow.includes(text) && !canCol.includes(text)} className={`${btnType} ${selectedArea.includes(thisBtnId) ? 'selected' : ''} ${!canRow.includes(text) && !canCol.includes(text) ? 'disabled' : ''} `} onClick={() => onClick(text)}>
        {text}
      </button>
    );
  };