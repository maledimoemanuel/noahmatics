import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import botAnimation from "../assets/bot_animation.json";
import micAnimation from "../assets/mic_pulse.json";
import { BlockMath } from "react-katex";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function BotAvatar() {
  const [isListening, setIsListening] = useState(false);
  const [sentences, setSentences] = useState([]);
  const [katexExpression, setKatexExpression] = useState(null);
  const [isTalking, setIsTalking] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  const textContainerRef = useRef(null);
  const shapeRef = useRef(null);
  const botContainerRef = useRef(null);
  const particlesRef = useRef([]);
  const particleContainerRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // Initialize particles
  useEffect(() => {
    particlesRef.current = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      ref: React.createRef()
    }));
  }, []);

  // Setup speech recognition
  useEffect(() => {
    if (!recognition) {
      console.warn("Speech recognition not supported.");
      return;
    }

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      processInput(transcript);
    };

    recognition.onerror = (e) => {
      console.error("Voice error:", e);
      stopListening();
      setTimeout(startListening, 500);
    };

    recognition.onend = () => {
      if (isListening) startListening();
    };

    return () => recognition.stop();
  }, []);

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
        animateParticles("start");
      } catch (e) {
        console.error("Recognition error:", e);
      }
    }
  };

  const stopListening = () => {
    if (recognition) {
      try {
        recognition.stop();
        setIsListening(false);
        animateParticles("stop");
      } catch (e) {
        console.error("Stop error:", e);
      }
    }
  };

  const animateParticles = (action) => {
    particlesRef.current.forEach((particle, i) => {
      const element = particle.ref.current;
      if (!element) return;

      gsap.killTweensOf(element);
      
      if (action === "start") {
        gsap.fromTo(element,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            x: gsap.utils.random(-50, 50),
            y: gsap.utils.random(-50, 50),
            duration: 0.8,
            delay: i * 0.05,
            ease: "back.out(1.7)"
          }
        );
        
        gsap.to(element, {
          motionPath: {
            path: [
              { x: gsap.utils.random(-100, 100), y: gsap.utils.random(-100, 100) },
              { x: gsap.utils.random(-150, 150), y: gsap.utils.random(-150, 150) }
            ],
            curviness: 1.5
          },
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      } else {
        gsap.to(element, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          delay: i * 0.03,
          ease: "back.in(1.7)"
        });
      }
    });
  };

  const processInput = async (input) => {
    try {
      const response = await fetch('http://localhost:5000/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      respond(data.reply, data.katex, data.animation);
    } catch (error) {
      console.error("Server error:", error);
      respond("Sorry, something went wrong.");
    }
  };

  const respond = (text, katex = null, animation = null) => {
    setIsTalking(true);
    setSentences([]);
    setKatexExpression(katex);
    setAnimationData(animation);

    // Animate bot container
    gsap.to(botContainerRef.current, {
      y: -20,
      duration: 0.5,
      repeat: 1,
      yoyo: true,
      ease: "power1.inOut"
    });

    const splitSentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    animateSentences(splitSentences);

    if (animation) {
      setTimeout(() => animateShape(animation.type), 200);
    }
  };

  const animateSentences = (sentences) => {
    const tl = gsap.timeline();
    
    sentences.forEach((sentence, i) => {
      tl.to({}, { duration: 0.3 });
      tl.call(() => {
        setSentences(prev => [...prev, sentence.trim()]);
        speak(sentence.trim());
      }, null, "+=0.2");
    });

    tl.call(() => setIsTalking(false));
  };

  const animateShape = (type) => {
    if (!shapeRef.current) return;

    gsap.fromTo(shapeRef.current,
      { opacity: 0, scale: 0, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }
    );

    // Add glow effect
    const glow = document.createElement('div');
    glow.className = 'absolute inset-0 rounded-full opacity-0';
    glow.style.boxShadow = '0 0 30px 10px rgba(0, 255, 255, 0.7)';
    shapeRef.current.appendChild(glow);

    gsap.to(glow, {
      opacity: 0.8,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      onComplete: () => glow.remove()
    });
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    synth.speak(utter);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Floating particles */}
      <div ref={particleContainerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlesRef.current.map(particle => (
          <div
            key={particle.id}
            ref={particle.ref}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-0"
            style={{
              left: '50%',
              top: '50%',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Animated background elements */}
      {isTalking && (
        <>
          <div className="absolute w-full h-full bg-radial-gradient from-cyan-500/10 via-purple-500/5 to-transparent opacity-30" />
          <div className="absolute w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        </>
      )}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Noahmatics AI
        </h1>

        {/* Bot/animation container */}
        <div ref={botContainerRef} className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
          {animationData ? (
            <div
              ref={shapeRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.5))'
              }}
            >
              {animationData.type === "draw_circle" && (
                <div
                  className="border-4 border-cyan-400 rounded-full"
                  style={{
                    width: `${animationData.params.radius * 2}px`,
                    height: `${animationData.params.radius * 2}px`,
                    borderColor: animationData.params.strokeColor,
                    borderWidth: `${animationData.params.strokeWidth}px`
                  }}
                />
              )}
              {animationData.type === "draw_triangle" && (
                <svg width="150" height="150" viewBox="0 0 150 150">
                  <polygon
                    points="0,150 75,0 150,150"
                    fill="none"
                    stroke={animationData.params.strokeColor}
                    strokeWidth={animationData.params.strokeWidth}
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
          ) : (
            <Lottie
              animationData={botAnimation}
              loop={true}
              style={{ filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.5))' }}
            />
          )}
        </div>

        {/* Response container */}
        <div
          ref={textContainerRef}
          className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50 shadow-lg transition-all duration-300"
        >
          {sentences.map((sentence, index) => (
            <div
              key={index}
              className="text-gray-200 text-lg md:text-xl mb-3 last:mb-0 animate-fadeIn"
            >
              {sentence}
            </div>
          ))}

          {katexExpression && (
            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-cyan-400/20">
              <BlockMath math={katexExpression} className="text-cyan-400" />
            </div>
          )}
        </div>

        {/* Microphone button */}
        <div className="flex space-x-4">
          {!isListening ? (
            <button
              onClick={startListening}
              className="relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white text-lg shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-2">🎙️</span> Start
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ) : (
            <button
              onClick={stopListening}
              className="relative px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-semibold text-white text-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-2">🛑</span> Stop
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          )}
        </div>

        {/* Listening indicator */}
        {isListening && (
          <div className="absolute bottom-32 md:bottom-40 animate-pulse">
            <Lottie
              animationData={micAnimation}
              loop={true}
              style={{ width: 100, height: 100, filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}