var root = document.querySelector('main');
var val;
var textref;
var status = 'idle';
var speaker = new SpeechSynthesisUtterance();
var text;
var char = 0;
var pause = 'pause ⏸️';

function changerate(e) {
  if (e.target.value > 5) e.target.value = 5;
  speaker.rate = e.target.value || 1;
  playtext(text.substring(char));
}

function playtext(e = text) {
  if (speechSynthesis.speaking) {
    speechSynthesis.resume();
    speechSynthesis.cancel();
  }

  speaker.text = e;
  speechSynthesis.speak(speaker);
}

function convert(e) {
  status = 'preparing';
  render();
  text = textref.value;
  playtext(text.substring(char));
  speaker.addEventListener('end', () => {
    status = 'idle';
    char = 0;
    render();
  });
  speaker.addEventListener('boundary', e => {
    char = e.charIndex;
  });
  status = 'speaking';
  render();
}

function App() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
    className: "green"
  }, "Text"), " to ", /*#__PURE__*/React.createElement("span", {
    className: "blue"
  }, "speech "), "converter"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: "hr"
  }), /*#__PURE__*/React.createElement("h3", null, " Input Your Text"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '90vw',
      height: '400px',
      display: 'flex',
      justifyContent: "center",
      alignItems: 'center',
      margin: 'auto'
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    placeholder: "input the text you want me to speak to you",
    ref: ref => textref = ref,
    style: {
      width: '100%',
      height: '100%',
      display: 'flex'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "controls",
    style: {
      display: 'grid',
      justifyContent: 'center',
      gridTemplateColumn: 'repeat(autofit,minmax(150px,1fr))',
      gridGap: '5px',
      gap: '5px',
      margin: 'auto'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: convert
  }, "Play \u25B6\uFE0F"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      if (status == 'speaking') {
        pause = 'resume🎤';
        speechSynthesis.pause();
        status = 'paused';
        render();
      } else {
        pause = 'Pause⏸️';
        speechSynthesis.resume();
        status = 'speaking';
        playtext(text.substring(char));
        render();
      }
    }
  }, pause), /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("legend", null, "Speed rate\uD83E\uDDB8"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: 0,
    step: .5,
    max: 5,
    placeholder: "0 - 5",
    defaultValue: 1,
    onInput: changerate
  })), /*#__PURE__*/React.createElement("select", {
    onChange: e => {
      speaker.voice = e.target.value;
      playtext(text.substring(char));
    }
  }, speechSynthesis.getVoices().map(voice => {
    return /*#__PURE__*/React.createElement("option", {
      value: voice,
      name: "voice"
    }, " ", voice.name, " ", voice.default ? '--default' : '');
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hr"
  }), /*#__PURE__*/React.createElement("h2", null, "status"), /*#__PURE__*/React.createElement("h3", null, status, "   "));
}

function render() {
  ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);
}

render();