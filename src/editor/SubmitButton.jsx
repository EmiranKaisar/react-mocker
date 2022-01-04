export const SubmitButton = ({onSubmit}) => {
  return (
    <div className={'editor-each-item'}>
  <input type="submit" value="保存" className="editor-submit-btn" onClick={onSubmit}  />
  </div>
  )
};
