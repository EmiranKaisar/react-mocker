import React from "react";
import { useData, updateData } from "@/data";
import TemplatesTree from "./TemplatesTree";
import SelectedTemplate from "./SelectedTemplate";
import { TemplateEditor } from "./TemplateEditor";
import { useState, useEffect } from "react";

const Templates = ({ formerTempNumber }) => {
  const data = useData();
  const edit = data.edit;
  const templates = data.templates;
  const selectedTemplateId = data.selectedtemplate;

  return (
    <div className="editor-templates-pagecontainer">
      <TemplatesTree />
      <SelectedTemplate />
      {edit && <TemplateEditor formerTempNumber={formerTempNumber} />}
    </div>
  );
};

export default Templates;
