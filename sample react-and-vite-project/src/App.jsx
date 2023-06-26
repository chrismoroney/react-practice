import { useState, useEffect } from 'react'
import './styles.css'

export default function App() {
  const [buttonColor, setButtonColor] = useState('')

  const handleButtonClick = (color) => {
    setButtonColor(color);
  }

  useEffect(() => {
    if (buttonColor) {
      const timer = setTimeout(() => {
        setButtonColor('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [buttonColor]);


  return (
    <div className="form-row">
      <button onClick={() => handleButtonClick('Red')} className="btn-red">Red</button>
      <button onClick={() => handleButtonClick('Yellow')} className="btn-yellow">Yellow</button>
      <button onClick={() => handleButtonClick('Blue')} className="btn-blue">Blue</button>
      
      {buttonColor && <p>You Pressed: {buttonColor}</p>}
    </div>
    

  )
}