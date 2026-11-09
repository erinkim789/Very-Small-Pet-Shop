import { useEffect, useRef, useState } from 'react'
import CheckboxDefault from '../assets/checkbox.png'
import CheckboxHover from '../assets/checkbox-hover.png'
import '../style/Checkbox.css'

function Checkbox({ text, checked, ...props }) {
    // States to change the button image when hovered over
    const [hovering, setHovering] = useState(false);

    // Determines which image to display for the checkbox based on hover and checked states.
    var CheckboxImage = hovering ? CheckboxHover : checked ? CheckboxHover : CheckboxDefault;

    return(
        <>
            <div className="checkbox" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} {...props}>
                <img src={CheckboxImage} alt={checked ? "checked checkbox" : "unchecked checkbox"} />
                <h1>{text}</h1>
            </div>
        </>
    )
}

export default Checkbox