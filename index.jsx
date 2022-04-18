

  

var root=document.querySelector('main')
var val
var imageref
var imagesrc
function convert(e){
  
let  file=e.target.files[0]
  console.log(file)
  if (!file) return
  textholder=document.querySelector('.text')
  imagesrc=URL.createObjectURL(file)
  
  /* var worker=Tesseract.recognize(file,'eng',{
      logger:e=>{

      textholder.innerHTML= `<span class='blue' >status </span>:<span class='green'>${e.status}</span><br /><span class='blue' >progress </span>:<span class='green'>${e.progress}</span>
   ` }}
    ).then((value)=>{
  
    val=value
          textholder.innerHTML=`<h2 class='blue' >confidence</h2>:<span class='green'>${value.data.confidence}💪</span>
         <br />
           <br />
         <h2 class='blue' >text </h2>:<span class='green'>${value.data.text}</span>
           <br />
           <br />
          <h2 class='blue' >hocr</h2>:<span class='green'>${value.data.hocr}</span>
      `})

*/
console.time('time')
 const worker=Tesseract.createWorker({
   workerPath:'node_modules/tesseract.js/dist/worker.min.js',
langPath: 'libs',
corePath:'node_modules/tesseract.js-core/tesseract-core.wasm.js'

,
   logger:e=>{     
val=e

render()
   }
 })
 
/* const worker=Tesseract.createWorker({
   logger:e=>{     
val=e

render()
   }
 })*/
  
      worker.load().then(()=>{
         worker.loadLanguage('eng').then(()=>{
         worker.initialize('eng').then(()=>{
      worker.recognize(imagesrc).then(value=>{
        
        worker.terminate()
        console.timeEnd('time')
        val=value
        render()
        speechSynthesis.speak(new SpeechSynthesisUtterance(value.data.text))
   console.log(value)  
        
       }) })})})
    
     
}

function App(){
  return(
    <div>
    <h1><span className='green'>Image</span> to <span className='blue'>text </span>converter</h1>
    {imagesrc ?
    <div style={{
      display:'flex',
      justifyContent:"center",
    }}>
    
    <img style={{
      width:'250px',
      height:'250px',
      objectFix:'contain',
      aspectRatio:1,
      
    }} src={imagesrc} ref={(ref)=>imageref=ref} alt='your image' />
    </div>
    : ''}
   <div className='hr'></div>
   <h3> Upload your image here</h3>
<input type='file' accept='image/*' onChange={convert} />

   <div className='hr'></div>


<h3>Output text</h3>
{val ?
val.status ?
<div className='text'>
<h3 className='blue' >
status 
</h3>👉
<span className='green'>
{val.status}
</span>
<br />
<h3 className='blue' >
progress 
</h3>👉
<span className='green'>
{val.progress}
</span>
</div>
:
<div className='text' >
{val.data.text}
</div>

 
    
    
    
    : ''}
    

</div>
)
}



function render(){
ReactDOM.render(<App />,root)
}
render()
