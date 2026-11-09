import { useState } from 'react'
import DefaultBlueButton from '../assets/HouseButton.png'
import HoverBlueButton from '../assets/HighlightHouseButton.png'
import DefaultPinkButton from '../assets/Button.png'
import HoverPinkButton from '../assets/HoverButton.png'
import '../style/Button.css'

// A reusable button component that supports different colors and text. The button will change its appearance and will shake when hovered over.
function Button({id, onClick, color, text, ...props }) {
    // States to change the button image when hovered over
    const [hovering, setHovering] = useState(false);

    const DefaultButton = color === "blue" ? DefaultBlueButton : DefaultPinkButton;
    const HoverButton = color === "blue" ? HoverBlueButton : HoverPinkButton;

    return(
        <>
            <div {...props}>
                <button id={id} className="Button" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} onClick={onClick ? onClick : undefined}>
                    <img src={hovering ? HoverButton : DefaultButton} alt="Next" />
                    <h1 className="ButtonText" >{text}</h1>
                </button>
            </div>
        </>
    )
}

export default Button