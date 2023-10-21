import React, { useState,useEffect } from "react";
import "./CodeEditor.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MonacoEditor from "react-monaco-editor";
import {
  faCopy,
  faLock,
  faFloppyDisk,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

function CodeEditor() {
  // Use state object

  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("html");
  const [renderedHTML, setRenderedHTML] = useState("");
const [enterPressed, setEnterPressed] = useState(false);

  // copy button functionality

  const handleCopyClick = () => {
    setCopied(true);
    alert("Code Copied");
    console.log(copied);
  };

  //tab spacing functionality

  const handleTextAreaKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  //save button functionality

  const handleSaveClick = () => {
    let fileExtension;
    if (selectedLanguage === "javascript") {
      fileExtension = "js";
    } else if (selectedLanguage === " python") {
      fileExtension = "py";
    } else {
      fileExtension = "html";
    }

    // file extension and save file button functionality

    const fileName = `code.${fileExtension}`;
    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    alert("Code saved to a file");
  };

  //lock unlock toggle button functionality

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  // dropdown language button refresh functionality

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setValue("");
    setRenderedHTML("");
  };

  // javascript,python,HTML code execution functionality
// use effect
useEffect(() => {
  if (enterPressed) {
    setEnterPressed(false);
  }
}, [enterPressed]);

  const runCode = () => {
    if (selectedLanguage === "javascript") {
      setRenderedHTML(`
        <script>
          ${value}
        </script>
      `);
    } else if (selectedLanguage === "python") {
      setRenderedHTML(
        "<p>Python execution is not supported in this environment.</p>"
      );
    } else {
      setRenderedHTML(value);
    }
  };

  //use state and handleChange functionality End

  //Start design code
  return (
    <div className="main__container">
      {/* heading /navbar */}

      <div className="heading__container">
        <h1 className="heading__text">Basic Code Editor</h1>
      </div>

      {/* Dropdown container with language container*/}

      <div className="dropdown__container">
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="html">HTML</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>

      {/* MonacoEditor container */}

      <div className="Editor__container">
        <MonacoEditor
          className="Editor__textarea"
          onKeyDown={handleTextAreaKeyDown}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          options={{
            readOnly: isLocked,
          }}
        ></MonacoEditor>

        {/* code Execution output area */}

        <div className="Editor__output">
          <h3 className="Editor__outputhead">Output:-</h3>

          {/* use iframe for rerendaring */}

          <iframe
            title="Code Renderer"
            className="Editor__outputcoderenderer"
            srcDoc={renderedHTML}
          ></iframe>
        </div>
      </div>

      {/* Editor section End */}

      {/* function button start */}

      <div className="function__btn">
        <button className="function__runbtn" onClick={runCode}>
          <FontAwesomeIcon icon={faCode} style={{ paddingRight: 4 }} /> Run
        </button>

        <CopyToClipboard text={value} onCopy={handleCopyClick}>
          <button className="function__Copybtn">
            <FontAwesomeIcon icon={faCopy} style={{ paddingRight: 4 }} /> Copy
          </button>
        </CopyToClipboard>

        <button className="function__Savebtn" onClick={handleSaveClick}>
          <FontAwesomeIcon icon={faFloppyDisk} style={{ paddingRight: 4 }} />{" "}
          Save
        </button>

        <button className="function__LockUnlockbtn" onClick={toggleLock}>
          <FontAwesomeIcon icon={faLock} style={{ paddingRight: 4 }} />
          {isLocked ? "Unlock" : "Lock"}
        </button>
      </div>
      {/* function button End */}
    </div>
  );
}

export default CodeEditor;

/************ All Function And Code End **************/
