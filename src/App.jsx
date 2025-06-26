import { useRef, useState, useEffect } from 'react'
import './App.css'
import screenshot from "html2canvas"
// import { backgroundImage } from 'html2canvas/dist/types/css/property-descriptors/background-image'


export default function App(){

  const[tcolor, setTColor] = useState('000')
  const[bgCol, setBgCol] = useState('000')
  const[bgImage, setBgImage] = useState('');
  const image = useRef()

  const textColor= (colorName)=>{
    image.current.style.color=colorName
  }

  const bgColor= (colorName)=>{
    image.current.style.backgroundColor=colorName;
    image.current.style.backgroundImage='';
  }

  const fontFamily = (fontName) =>{
    image.current.style.fontFamily=fontName
  }

  const downloadImage = () =>{
    screenshot(image.current).then(canvas => {
      const imageData = canvas.toDataURL("image/png")
      const link = document.createElement('a')
      link.href=imageData
      link.download="font-fusion.png"
      link.click()
  });
  }

  useEffect(() => {
  image.current.style.backgroundImage = bgImage;
  image.current.style.backgroundSize = 'cover'; 
  image.current.style.backgroundRepeat = 'no-repeat';
  image.current.style.backgroundColor = '';
  }, [bgImage]);


  return(
    <>
        <div className='heading'>
          <h1 id="heading">Style Fusion</h1>
        </div>
        
        <div className='parent'>
            <div id='child1'>
                <h1 ref={image} contentEditable="true" id="text">Write your text...</h1>
                <button id="download-btn" onClick={downloadImage}>Download</button>
            </div>

            <div id='child2'>
                <div id='text-color'>
                  <h2 id="sub-heading">Choose your text Color</h2>
                  <div id="text-color-names">
                    <button id='red' onClick={()=>{textColor('red')}}></button>
                    <button id='green' onClick={()=>{textColor('green')}}></button>
                    <button id='blue' onClick={()=>{textColor('blue')}}></button>
                    <button id='yellow' onClick={()=>{textColor('yellow')}}></button>
                    <button id='purple' onClick={()=>{textColor('purple')}}></button>
                    
                    <input 
                    className='input'
                    type='color'
                    value={tcolor}
                    onChange={(event)=>{
                      setTColor(event.target.value)
                      textColor(event.target.value)
                    }}
                    />
                  </div>

                </div>

                <div id='bg-image'>
                 <h2 id='sub-heading'>Choose Background Image</h2>
                 <div id="bg-image-options">
                    <button onClick={() => setBgImage('url("https://i.pinimg.com/236x/0a/50/cc/0a50cc85a787c9b83357a975ba9bb143.jpg")')}>Nature</button>
                    <button onClick={() => setBgImage('url("https://c0.wallpaperflare.com/preview/785/923/654/flowers-frame-ornament-shabby.jpg")')}>Card</button>
                    <button onClick={() => setBgImage('url("https://cdn.pixabay.com/photo/2023/02/01/21/40/pink-7761356_1280.png")')}>Abstract</button>
                    <button onClick={() => setBgImage('')}>Remove Image</button>

                     <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                      setBgImage(`url(${event.target.result})`);
                      };
                      reader.readAsDataURL(file);
                   }
                   }} 
                  />
                  </div>
                </div>

                <div id='bg-color'>
                  <h2 id='sub-heading'>Choose your Background Color</h2>
                  <div id="text-color-names">
                    <button id='red' onClick={()=>{bgColor('red')}}></button>
                    <button id='green' onClick={()=>{bgColor('green')}}></button>
                    <button id='blue' onClick={()=>{bgColor('blue')}}></button>
                    <button id='yellow' onClick={()=>{bgColor('yellow')}}></button>
                    <button id='purple' onClick={()=>{bgColor('purple')}}></button>
                    <input 
                    className='input'
                    type='color'
                    value={bgCol}
                    onChange={(event)=>{
                      setBgCol(event.target.value)
                      bgColor(event.target.value)
                    }}
                    />
                  </div>
                </div>

                <div id='fonts'>
                      <h1 id='times-new' onClick={()=>{fontFamily('Times New Roman')}}>Hello</h1>
                      <h1 id='cursive' onClick={()=>{fontFamily('cursive')}}>Hello</h1>
                      <h1 id='verdana' onClick={()=>{fontFamily('verdana')}}>Hello</h1>
                      <h1 id='arial'  onClick={()=>{fontFamily('arial')}}>Hello</h1>
                      <h1 id='impact' onClick={()=>{fontFamily('Impact')}}>Hello</h1>
                </div>

                
            </div>
        </div> 
    </>
  );
}