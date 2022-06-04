var root = document.querySelector('main');
var val;
var imageref;
var imagesrc;
var present = 0;

function getres(file) {
  var func_present = present;
  var firstform = new FormData();
  firstform.append('file', file);
  val = {
    status: 'extracting'
  };
  render();
  fetch('/api', {
    method: 'POST',
    body: firstform
  }).then(res => {
    return res.json();
  }).then(data => {
    if (func_present != present) return;
    console.log(data);
    val = data;
    render();
  }).catch(err => {
    val = {
      text: 'An unexpected error occured please try again',
      confidence: '100%'
    };
    render();
  });
}

function convert(e) {
  present += 1;
  e.preventDefault();
  let file = e.target.file.files[0];
  if (!file) return;
  var filename = file.name.split('.');
  var ext = filename[filename.length - 1];

  if (ext != 'jpg' && ext != 'jpeg' && ext != 'png') {
    alert('unsupported format');
    return;
  }

  imagesrc = URL.createObjectURL(file);

  if (!navigator.onLine) {
    const worker = Tesseract.createWorker({
      workerPath: 'libs/tesseract.js/dist/worker.min.js',
      langPath: 'libs',
      corePath: 'libs/tesseract.js-core/tesseract-core.wasm.js',
      logger: e => {
        console.log(e);
      }
    });
    val = {
      status: 'loading'
    };
    render();
    worker.load().then(() => {
      worker.loadLanguage('eng').then(() => {
        worker.initialize('eng').then(() => {
          worker.recognize(imagesrc).then(value => {
            if (present != present) return;
            worker.terminate();
            val = {
              text: value.data.text,
              confidence: value.data.confidence
            };
            if (val.text == '') val.text = 'no image detected';
            render();
          });
        });
      });
    }).catch(err => val = {
      text: 'An unexpected error occured please try again',
      confidence: '100%'
    });
  } else {
    var options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    imageCompression(file, options).then(cfile => {
      getres(cfile);
    }).catch(err => {
      alert('unexpected error occured please try again');
    });
  }
}

function App() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
    className: "green"
  }, "Image"), " to ", /*#__PURE__*/React.createElement("span", {
    className: "blue"
  }, "text "), "converter"), !navigator.onLine ? /*#__PURE__*/React.createElement("h3", null, "Note for super fast\uD83E\uDDB8 performance  turn on your internet connection") : '', /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: "hr"
  }), /*#__PURE__*/React.createElement("h3", null, " Upload Your Image "), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '300px',
      height: '400px',
      display: 'flex',
      justifyContent: "center",
      border: '2px dotted currentcolor',
      alignItems: 'center',
      margin: 'auto'
    }
  }, /*#__PURE__*/React.createElement("form", {
    style: {
      position: 'absolute',
      opacity: '0',
      width: '100%',
      height: '100%',
      display: 'flex'
    },
    onSubmit: convert
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    name: "file",
    style: {
      position: 'absolute',
      opacity: '0',
      width: '100%',
      height: '100%'
    },
    accept: "image/jpeg,image/png",
    onChange: e => {
      document.querySelector('.submit').click();
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "submit",
    className: "submit",
    style: {
      display: "none"
    }
  })), imagesrc ? /*#__PURE__*/React.createElement("img", {
    style: {
      width: '300px',
      height: '400px',
      objectFix: 'contain',
      aspectRatio: 1
    },
    src: imagesrc,
    ref: ref => imageref = ref,
    alt: "your image"
  }) : /*#__PURE__*/React.createElement("h3", null, " ", /*#__PURE__*/React.createElement("span", {
    className: "blue"
  }, "click "), "to select your image   ")), /*#__PURE__*/React.createElement("div", {
    className: "hr"
  }), val ? !val.status ? /*#__PURE__*/React.createElement("h3", null, "Output ") : /*#__PURE__*/React.createElement("h3", null, " Processing ") : '', val ? val.status ? /*#__PURE__*/React.createElement("div", {
    className: "text ",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("img", {
    style: {
      width: '300px',
      height: '200px',
      objectFix: 'contain',
      aspectRatio: 1
    },
    src: "loading.gif",
    ref: ref => imageref = ref,
    alt: "your image"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "text"
  }, /*#__PURE__*/React.createElement("h3", null, "confidence"), val.confidence, "%", /*#__PURE__*/React.createElement("h3", null, "Text"), val.text) : '');
}

function render() {
  ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);

  if (imageref) {
    imageref.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

render();