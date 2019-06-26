import draftToHtml from "draftjs-to-html";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

// converts JS object to Draftjs and returns rich HTML
const convertToHtml = label => {
  const content = EditorState.createWithContent(
    convertFromRaw(label)
  );
  return draftToHtml(convertToRaw(content.getCurrentContent()))
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "");
};

export default convertToHtml;