import { useState } from "react";
import { getResponse } from "../api/api";
import { speak, speakInEnglish } from "../service/speechHandler"
const useResponse = () => {
  const intialLanguage = { language: "bn-BD" }
  const [currentReceived, setCurrentReceived] = useState([]);
  const [received, setReceived] = useState([""]);
  const [speechOpts, setSearchOpts] = useState({...intialLanguage});
  const [lang, setLanguage] = useState("bn");

  const getMsg = (msg) => {
    getResponse(msg, lang).then((res) => {
      let raw = [];
      if (res.data?.length) {
        raw = res.data.map((item) => item.text);
      }

      const { intent } = res.data;
      const speakable = raw.join();
      if (intent === "bangla_language") {
        setLanguage("bn");
         setSearchOpts({ ...speechOpts, language: "bn-BD" });

      }

      if (intent == "english_language") {
        setLanguage("en");
         setSearchOpts({ ...speechOpts, language: "en-US" });
      }

      // setReceived([...received, raw]);

      setCurrentReceived(raw);
      setReceived([...received, ...raw]);

      if (lang === "bn") speak(speakable);
      else speakInEnglish(speakable);
    });
  };
  return { getMsg, currentReceived, speechOpts,received };
};

export default useResponse;
