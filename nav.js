
var script=document.createElement('script')
script.type='text/jsx'


switch (location.pathname) {
  case '/index.html':
  case '/':
  document.title='text and speech tool'

   script.src='home.js'
    break;
  case '/text-to-speech.html':
  case '/text-to-speech':
    document.title='text to speech converter'
    script.src='text-to-speech.js'
    break;
    case '/speech-to-text.html':
  case '/speech-to-text':
        document.title='speech to text converter'

    script.src='speech-to-text.js'
    break;
  case '/image-to-text.html':
  case '/image-to-text':
   document.title='image to text converter'

    script.src='image-to-text.js'
    break;
   case '/image-to-speech.html':
  case '/image-to-speech':
      document.title='image to speech converter'

    script.src='image-to-speech.js'
    break;
    default :
     document.title='not found'

    script.src='404.js'
  break;
}

document.body.append(script)
