import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import botAnimation from "../assets/bot_animation.json";

export default function BotAvatar() {
  const [isListening, setIsListening] = useState(false);
  const [botResponse, setBotResponse] = useState("Hi! Ask me a math question.");
  const [isTalking, setIsTalking] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("User:", transcript);
      processInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (e) => {
      console.error("Voice error:", e);
      setIsListening(false);
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const speak = (text) => {
    console.log("Speaking:", text);
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    synth.speak(utter);
  };

  const processInput = (input) => {
    let response = "I'm not sure how to answer that yet.";

    const q = input.toLowerCase();

    if (q.includes("hello")) response = "Hello! How can I help you today?";
    else if (q.includes("what is your name")) response = "My name is Noahmatics Bot. I'm here to help you with mathematics!";
    else if (q.includes("what is pi")) response = "Pi is approximately 3.14159.";
    else if (q.includes("tell me something")) response = "Something interesting is that the number zero was invented independently by the Mayans and the Indians.";

    respond(response);
  };

  const respond = (text) => {
    setIsTalking(true);
    setBotResponse(text);

    setTimeout(() => {
      speak(text);
      setIsTalking(false);
    }, 400);
  };

  return (
    <div className="h-screen w-screen relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-black text-white">
      {isTalking && (
        <div className="absolute w-64 h-64 bg-purple-600 opacity-40 blur-2xl rounded-full animate-pulse" />
      )}

      <h1 className="text-3xl sm:text-4xl font-heading mb-6 z-10">🎓 Noahmatics Bot</h1>

      <div className="w-64 sm:w-80 h-64 sm:h-80 z-10">
        <Lottie animationData={botAnimation} loop={true} />
      </div>

      <button
        onClick={startListening}
        className="mt-8 bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-semibold text-white text-base sm:text-lg shadow-lg transition-all z-10"
      >
        {isListening ? "🎧 Listening..." : "🎙️ Tap to Speak"}
      </button>

      <p className="text-gray-300 mt-6 text-lg max-w-xl text-center px-4 z-10">
        {botResponse}
      </p>
    </div>
  );
}
