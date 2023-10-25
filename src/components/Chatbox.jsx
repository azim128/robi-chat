import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Styles from "./chat.module.css";
import useToggler from "../hooks/useToggler";
import { AiOutlineClose, AiTwotoneStop } from "react-icons/ai";
import { MdKeyboardVoice } from "react-icons/md";
import useSpeechToText from 'react-hook-speech-to-text';

const Chatbox = () => {
  const boxRef = useRef();
  const { toggle, handleChangeToggler } = useToggler();
  const [currentInput, setCurrentInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "হ্যালো! আমি হিয়া। আমি রবির ভার্চুয়াল এআই এসিস্ট্যান্ট। আমাকে রবির সেবা সম্বন্ধে যাবতীয় প্রশ্ন করতে পার।",
      type: 1,
      id: uuidv4(),
    },
  ]);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    speechRecognitionProperties: {
      lang: 'bn-BN',
    }
  });

  useEffect(() => {
    if (!isRecording) {
      // Recording has stopped, you can handle it here
      // In this example, we'll stop recording and submit the input
      stopSpeechToText();
      handleInput();
    }
  }, [isRecording]);

  useEffect(() => {
    if (results.length > 0) {
      const transcript = results[results.length - 1].transcript;
      setCurrentInput(transcript);
    }
  }, [results]);

  const handleInput = () => {
    if (currentInput) {
      setMessages([...messages, { text: currentInput, type: 0, id: uuidv4() }]);
      setCurrentInput("");
    }
  };

  const handleChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleListenStart = () => {
    startSpeechToText();
  };

  const handleListenStop = () => {
    stopSpeechToText();
  };

  return (
    <div className={Styles.container}>
      {toggle ? (
        <div className={Styles.chatBox}>
          <div className={Styles.chatTitle}>
            SENSEBOT <div className={Styles.sub}>Try out now</div>
            <div className={Styles.closeicon} onClick={handleChangeToggler}>
              <AiOutlineClose />
            </div>
          </div>
          <div className={Styles.chatMessage} ref={boxRef}>
            {messages.map((msg) => {
              return (
                <div
                  className={
                    msg.type === 0 ? Styles.sentMessage : Styles.receivedMessage
                  }
                  key={msg.id}
                >
                  {msg.text}
                </div>
              );
            })}
          </div>
          <div className={Styles.chatInputContainer}>
            <form action="" onSubmit={(e) => e.preventDefault()} autoComplete="off">
              <input
                type="text"
                name="chatInput"
                value={currentInput}
                placeholder="Type message here..."
                className={Styles.chatInput}
                onChange={handleChange}
              />
            </form>
            {isRecording ? (
              <button onClick={handleListenStop}>
                <AiTwotoneStop />
              </button>
            ) : (
              <button onClick={handleListenStart}>
                <MdKeyboardVoice />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={Styles.messageNow}>
          <div className={Styles.chatNowTitle}>
            <img
              src={"/logoOnly.jpg"}
              width={108}
              height={130}
              alt="sensebot-logo"
            />
          </div>
          <div className={Styles.chatNow} onClick={handleChangeToggler}>
            Chat Now
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
