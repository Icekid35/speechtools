

  

var root=document.querySelector('main')
var val
var imageref
var imagesrc
var present=0
function convert(e){
 present+=1
 var func_present=present
 e.preventDefault() 
let  file=e.target.file.files[0]
 
  
  if (!file) return
   var filename=file.name.split('.')
   var ext=filename[filename.length - 1]
   
   if(ext!= 'jpg'&& ext !='jpeg' && ext !='png'){ 
     
     alert('unsupported format')
     
     return
   }
  
  
  imagesrc=URL.createObjectURL(file)
  

 

if(!navigator.onLine){
   const worker=Tesseract.createWorker({
   workerPath:'libs/tesseract.js/dist/worker.min.js',
langPath: 'libs',
corePath:'libs/tesseract.js-core/tesseract-core.wasm.js'
,
logger:(e)=>{
  console.log(e)
}

 })

val={status:'loading'}
render()

  
      worker.load().then(()=>{
         worker.loadLanguage('eng').then(()=>{
         worker.initialize('eng').then(()=>{
      worker.recognize(imagesrc).then(value=>{
       if(present!=present)return

        worker.terminate()
        
        val={text:value.data.text, confidence:value.data.confidence}
        if(val.text== '')val.text='no image detected'
        render()
        
        
       }) })})}).catch(err=>val={text:'An unexpected error occured please try again',confidence:'100%'})

    
     
}
     else{
     var form=new FormData()
     form.append('file',file)
     val={status:'loading'}
     render()
     fetch('http://speechtools.herokuapp.com/',{
       method:'POST',
     body:form,
       
     }).then((res)=>{     
       return res.json()
     }
       ).then(data=>{
         if(present!=present)return
         val=data
         if(val.text=='')val.text='no text detected'
         render()
       }).catch(err=>val={text:'An unexpected error occured please try again',confidence:'100%'})
}
}
function App(){
  return(
    <div>
    <h1><span className='green'>Image</span> to <span className='blue'>text </span>converter</h1>
            {!navigator.onLine ? <h3>Note for super fast🦸 performance  turn on your internet connection</h3>:''}

    <br />
    <div className='hr'></div>
    <h3> Upload Your Image </h3>
    <div style={{
    position:'relative',
    width: '300px',
      height: '400px',
      display:'flex',
      justifyContent:"center",
      border:'2px dotted currentcolor',
alignItems:'center',
margin:'auto',
    }}>
    
   
    <form  style={{
    position:'absolute',
  opacity:'0',
  width:'100%',
  height:'100%',
  display:'flex',
}}  onSubmit={convert} >

    <input type='file' name='file' style={{
    position:'absolute',
  opacity:'0',
  width:'100%',
  height:'100%'
}} accept="image/jpeg,image/png"  onChange={
  (e)=>{
    document.querySelector('.submit').click()
  }
}/>
<input type='submit' value='submit' className='submit' style={{display:"none"}} />
</form>
{imagesrc?
    <img style={{
      width:'300px',
      height:'400px',
      objectFix:'contain',
      aspectRatio:1,
      
    }} src={imagesrc} ref={(ref)=>imageref=ref} alt='your image' />
    :   <h3> <span className='blue'>click </span>to select your image   </h3>
}
    </div>
    
   <div className='hr'></div>

   


{val ?
!val.status ? <h3>Output </h3>:<h3> Processing </h3>
  :''
}
{val ?
val.status ?
<div className='text ' style={{
display:'flex',
justifyContent:'center',
alignItems:'center',
flexDirection:'column'
}}>
    <img style={{
      width:'300px',
      height:'200px',
      objectFix:'contain',
      aspectRatio:1,
      
    }} src='loading.gif' ref={(ref)=>imageref=ref} alt='your image' />


</div>
:
<div className='text' >
<h3>confidence</h3>
{val.confidence}%
  <h3>Text</h3>
{val.text}
</div>

 
    
    
    
    : ''}
   
</div>
)
}



function render(){
ReactDOM.render(<App />,root)
}
render()
