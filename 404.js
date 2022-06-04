var root = document.querySelector('main');
var services = [{
  name: 'speech-to-text',
  offline: false,
  online: true
}, {
  name: 'image-to-speech',
  offline: true,
  online: true
}, {
  name: 'text-to-speech',
  offline: true,
  online: true
}, {
  name: 'image-to-text',
  offline: true,
  online: true
}];

function App() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: '4rem',
      color: 'black'
    }
  }, " You Struck a wrong or broken link"), /*#__PURE__*/React.createElement("h1", null, "Welcome to the ", /*#__PURE__*/React.createElement("span", {
    className: "blue"
  }, "Ultimate "), "all in one ", /*#__PURE__*/React.createElement("span", {
    className: "green"
  }, "Speech "), "and ", /*#__PURE__*/React.createElement("span", {
    className: "blue"
  }, "Text "), "Tool"), /*#__PURE__*/React.createElement("div", {
    className: "hr"
  }), /*#__PURE__*/React.createElement("h2", null, "Our services include"), services.map(service => {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "paper"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textTransform: 'uppercase',
        paddingTop: 10
      }
    }, /*#__PURE__*/React.createElement("a", {
      className: "blue",
      href: service.name
    }, /*#__PURE__*/React.createElement("h3", {
      className: "blue",
      style: {
        marginTop: 0,
        paddingTop: 0,
        fontSize: '2rem'
      }
    }, service.name, " converter"), /*#__PURE__*/React.createElement("img", {
      src: `${service.name}.png`,
      width: "200px",
      height: "200px",
      alt: service.name,
      style: {
        margin: 'auto',
        border: '2px dotted var(--bgcolorlight)',
        transform: 'translateX(50px)'
      }
    })), " "), /*#__PURE__*/React.createElement("h3", null, "Availability"), /*#__PURE__*/React.createElement("ul", {
      style: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        margin: 'auto'
      }
    }, /*#__PURE__*/React.createElement("li", null, " offline  ", service.offline ? '✅' : '❌'), /*#__PURE__*/React.createElement("li", null, " online  ", service.online ? '✅' : '❌'))), /*#__PURE__*/React.createElement("div", {
      className: "hr",
      style: {
        width: '80vw'
      }
    }));
  }));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);