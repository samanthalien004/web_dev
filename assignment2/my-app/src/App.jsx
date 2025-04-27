import { useState } from 'react'
import './App.css'

//color array
const colorModes = [
  { name: "Red", background: "FireBrick",},
  { name: "Orange", background: "orange",},
  { name: "Yellow", background:"Gold",},
  { name: "Green", background: "LightGreen",},
  { name: "Blue", background: "DodgerBlue",},
  { name: "Purple", background: "BlueViolet",}
];

function App() {
  const [color, setColor] = useState(0);  // tracks the current color index

  function changeColor(){
    if(color === colorModes.length-1){    //  if the color is the last color in the array is reached
      setColor(0);                        //  set it back to the first color
    }
    else{
      setColor(color+1);                  //  otherwise, increment through the colorMode array by 1
    }
  }

  let currentColor = colorModes[color];   //  the currentColor --> the display color

  return (
    <div className="app" style={{ backgroundColor: currentColor.background }}>
        <h1>{currentColor.name}</h1>
        <button className='button' onClick={changeColor}>Change Color</button>
    </div>
  );
}

export default App
