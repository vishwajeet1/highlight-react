import { FunctionComponent, useState } from "react";
import parse from "html-react-parser";

interface Props {
  para: string;
}

const HighlightArena: FunctionComponent<Props> = ({ para }) => {
  const [displayText, setDisplayText] = useState<string>(para);

  const replaceHighlightText = (baseText: string, selectedText: string) => {
    return baseText.replace(selectedText, `<mark>${selectedText}</mark>`);
  };

  const getHighlightText = () => {
    console.log("executing");
    if (typeof window == "undefined") return;
    const selectedText = window.getSelection()?.toString();
    if (!selectedText) return;
    const getNewString = replaceHighlightText(
      displayText.toString(),
      selectedText
    );
    setDisplayText(getNewString);
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        getHighlightText();
      }}
    >
      {parse(displayText)}
    </div>
  );
};
export default HighlightArena;
