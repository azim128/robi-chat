let ctx;

if (typeof window !== "undefined") {
  ctx = new AudioContext();
}

export const speak = (msg) => {
  if (typeof window !== "undefined" && typeof responsiveVoice !== "undefined") {
    try {
      responsiveVoice.cancel();
      responsiveVoice.speak(msg, "Bangla India Female", { rate: 1 });
    } catch (error) {
      console.error("Error in speak:", error);
    }
  }
};



export const speakInEnglish = (text) => {
  const playback = (audio) => {
    const source = ctx.createBufferSource();
    source.buffer = audio;
    source.connect(ctx.destination);
    source.start(ctx.currentTime);
  };

  fetch("https://ss.intelsense.ai/tts", {
    method: "POST",

    body: JSON.stringify({
      text,
    }),
  })
    .then((res) => res.arrayBuffer())
    .then((buffer) => ctx.decodeAudioData(buffer))
    .then((decoded) => {
      playback(decoded);
    });
};
