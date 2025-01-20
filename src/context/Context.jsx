import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSend = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    setPrevPrompts(prev => [...prev, input])
    let result = await runChat(input);
    result = responseFilter(result);
    let newResult = result.split(" ");
    for (let i = 0; i < newResult.length; i++) {
      console.log("sss");
      const nextWord = newResult[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      console.log("here");
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  function responseFilter(string) {
    let strArray = string.split("**");
    let newString = "";
    for (let i = 0; i < strArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newString += strArray[i];
      } else {
        newString += "<b>" + strArray[i] + "</b>";
      }
    }

    newString = newString.split("*").join("</br>");
    return newString;
  }

  const contextValue = {
    input,
    setInput,
    prevPrompts,
    setPrevPrompts,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSend,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

Context.propTypes = {};

export default ContextProvider;
