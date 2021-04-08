import React, { useEffect, useState } from "react";

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

export const useRecognizer = () => {
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState("");

  var recognition;

  useEffect(() => {
    recognition = new SpeechRecognition();
    var pikachus = ["피카"];
    var speechRecognitionList = new SpeechGrammarList();
    var grammar =
      "#JSGF V1.0; grammar pikachu; public <picachu> = " +
      pikachus.join(" | ") +
      " ;";

    speechRecognitionList.addFromString(grammar, 1);

    recognition.continuous = false;
    recognition.lang = "ko-KR";
    recognition.interimResults = true;
    recognition.maxAlternatives = 5;
    recognition.grammars = speechRecognitionList;

    recognition.onaudioend = function (event) {
      //console.log(event);
    };

    recognition.onresult = function (event) {
      var text = event.results[0][0].transcript;
      for (let result of event.results[0]) {
        console.log(result.transcript);
      }
      if (text) {
        console.log("get result");
        recognition.stop();
      }
      //recognition.start();
    };

    recognition.onerror = function (event) {
      console.log(event);
    };

    recognition.onnomatch = function (event) {
      var text = event.results[0][0].transcript;
      for (let result of event.results[0]) {
        console.log(result.transcript);
      }

      console.log(event.results);
      console.log("get nomatch");
      if (text) {
        recognition.stop();
      }
      //recognition.start();
    };

    recognition.onsoundstart = (evt) => {
      console.log("sound start");
    };

    recognition.onsoundend = (evt) => {
      console.log("sound end");
    };

    recognition.onend = (evt) => {
      console.log("end and start");
      recognition.start();
    };

    recognition.onspeechend = (evt) => {
      console.log("speechend");
    };

    //onError도 한 번!
  }, []);

  const startRecognizer = () => {
    recognition.start();
  };

  const endRecognizer = () => {
    recognition.stop();
  };

  return [outputText, startRecognizer, endRecognizer, error];
};
