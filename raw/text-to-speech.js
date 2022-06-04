        
            
            var root=document.querySelector('main')
            var val
            var textref
            var status='idle'
           var speaker=new SpeechSynthesisUtterance()
var text
var char=0
           var pause ='pause ⏸️'
           function changerate(e){
             if(e.target.value>5)e.target.value=5
      
             speaker.rate=e.target.value||1
 playtext(text.substring(char))

           }
           function playtext(e=text){
     if(speechSynthesis.speaking){
                       speechSynthesis.resume()
          speechSynthesis.cancel()
          
        }
      speaker.text=e

 speechSynthesis.speak(speaker)

           }
            function convert(e){
              status='preparing'
              render()
  text=textref.value
playtext(text.substring(char))
speaker.addEventListener('end',()=>{
  status='idle'
  char=0
  render()
})
speaker.addEventListener('boundary',(e)=>{
  char=e.charIndex

})
     status='speaking'
       render()
            }
            
            function App(){
            return(
            <div>
            <h1><span className='green'>Text</span> to <span className='blue'>speech </span>converter</h1>
            
            <br />
            <div className='hr'></div>
            <h3> Input Your Text</h3>
            <div style={{
            position:'relative',
            width: '90vw',
            height: '400px',
            display:'flex',
            justifyContent:"center",
           
            alignItems:'center',
            margin:'auto',
            }}>
            
            
            <textarea placeholder='input the text you want me to speak to you' ref={(ref)=>textref=ref} style={{
            width:'100%',
            height:'100%',
            display:'flex',
            }}  >
            
         </textarea>
            </div>
            <div className='controls' style={{
            display:'grid',
            justifyContent:'center',
            gridTemplateColumn:'repeat(autofit,minmax(150px,1fr))',
            gridGap:'5px',
            gap:'5px',
              margin:'auto'
            }}>
            
      <button onClick={convert}>Play ▶️</button>
            <button onClick={(e)=>{
              if(status=='speaking'){
              pause='resume🎤'
                speechSynthesis.pause()
  
                status='paused'
                render()
              }else{
              pause='Pause⏸️'
                speechSynthesis.resume()
                status='speaking'
    playtext(text.substring(char))

                render()
              }
            }}>{pause}</button>
            <fieldset>
            <legend>Speed rate🦸</legend>
     <input type='number' min={0} step={.5} max={5} placeholder='0 - 5'
     defaultValue={1} onInput={changerate}/>
</fieldset>
<select onChange={(e)=>{

  speaker.voice=e.target.value
  playtext(text.substring(char))

}}>
{speechSynthesis.getVoices().map(voice=>{
 
  return(
  <option value={voice} name='voice' > {voice.name} {voice.default ? '--default':''}</option>)
})}

</select>
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
