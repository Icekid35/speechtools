
            var root=document.querySelector('main')

var services=[
 {name: 'speech-to-text',offline:false,online:true },
 {name: 'image-to-speech',offline:true,online:true},
 {name: 'text-to-speech',offline:true, online:true},
 {name: 'image-to-text',offline:true,online:true}
  ]
function App() {
  return(
    <div>
    <h1>Welcome to the <span className='blue'>Ultimate </span>all in one <span className='green'>Speech </span>and <span className='blue'>Text </span>PWA</h1>
    <div className='hr'></div>
    <h2>Our services include</h2>
    
    
    {services.map(service=>{
    
    return(
    <div>
    <div className='paper'>
 <div style={{
   margin:'auto',
     display:'flex',
     flexDirection:'column',
     alignItems:'center',
     textTransform:'uppercase',
     paddingTop:10
   }}><a className='blue' href={service.name}>
   <h3 className='blue' style={{
     marginTop:0,
     paddingTop:0,
     fontSize:'2rem'
   }}>{service.name} converter</h3>
   
   <img src={`${service.name}.png`} width='200px' height='200px' alt={service.name} style={{
     margin:'auto',
     border:'2px dotted var(--bgcolorlight)',
     transform:'translateX(50px)'
   }}/>
   
   </a> </div>
   <h3>Availability</h3>
   <ul style={{
     fontWeight:'bold',
     textTransform:'uppercase',
     margin:'auto'
   }}>
  <li> offline  {service.offline ? '✅':'❌'}</li>
  <li> online  {service.online ? '✅':'❌'}</li>
   </ul>

   </div>
   <div className='hr' style={{
     width:'80vw'
   }}></div>
   </div>
     )} )}



</div>

    )
}
ReactDOM.render(<App />,root)
