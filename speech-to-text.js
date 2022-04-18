        
            
            var root=document.querySelector('main')
            var val
            var textref
            var status='idle'
        
var text=''
var SpeechRecognition=window.SpeechRecognition || webkitSpeechRecognition

var recognition=new SpeechRecognition()

recognition.continuous=true
recognition.onspeechend=(e)=>{
  status='idle '
  listening='no'
  render()
}
recognition.onerror=()=>{
  status='an unexpected error just occurred'
  render()
  listening='no'
}
var listening='no'
var prevtrans=''
recognition.onresult=(e)=>{
  
  var current=e.resultIndex
  var transcript=e.results[0][0].transcript
 if(prevtrans==transcript)return
   prevtrans=transcript

  text +=`${transcript} `
  recognition.stop()
  listening='no'
  render()
  setTimeout(()=>{
  recognition.start()
  listening='yes'
  render()
  },100)
}


        function copy(){
          navigator.clipboard.writeText(text)
        }
            function convert(e){
              status='preparing'
              render()
              if(listening!='yes'){
 if(text.length)text+=' '
 recognition.start()
 listening='yes'
     status='listening'
              }else{
                recognition.stop()
                listening='no'
                status='idle'
              }
       render()
            }
            if(!navigator.onLine){
              alert('this feature cannot work offline please turn on your internet connection')
            }
            function App(){
            return(
            <div>
            <h1><span className='green'>Speech</span> To <span className='blue'>Text </span>Converter</h1>
            
            <br />
            <div className='hr'></div>
            <h3> click start to begin</h3>
            <div style={{
            position:'relative',
            width: '90vw',
            height: '400px',
            display:'flex',
            justifyContent:"center",
           
            alignItems:'center',
            margin:'auto',
            }}>
            
            <button style={{
              position:'absolute',
              right:'0px',
              top:'0px',
              opacity:'.5',
              color:'black',
              padding:'2px'
            }} onClick={copy}>Copy🦸</button>
            <textarea placeholder='you speech will show up here' ref={(ref)=>textref=ref} style={{
            width:'100%',
            height:'100%',
            display:'flex',
            }} readOnly={true} value={text} >
            
         </textarea>
            </div>
            <div className='controls' style={{
            display:'grid',
            justifyContent:'center',
            gridTemplateColumn:'repeat(autofit,minmax(150px,1fr))',
            gridGap:'5px',
            gap:'5px',
              margin:'auto',
              marginTop:'5px'
            }}>
            
      <button style={{
       width:'95vw',

      }} onClick={convert}>{listening=='no' ? 'Start recording ▶️':'stop recording ⏸️'}</button>
            <button style={{
          width:'95vw',

            }} onClick={(e)=>{
    text=''  
  render()

            }}>restart🔁</button>
</div>
            <div className='hr'></div>
   <h2>status</h2><h3>{status}   </h3>      
            
            
            
          
            
            </div>
            )
            }
            
            
            
            function render(){
            ReactDOM.render(<App />,root)
            }
            render()
