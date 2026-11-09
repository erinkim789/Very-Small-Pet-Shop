import { useEffect, useRef, useState } from 'react'
import '../style/Dialogue.css'

// A component that displays dialogue text with a typing effect. It allows skipping the typing animation by clicking on it.
function Dialogue({ text, ...props }) {
    // State to keep track of the current character index being displayed
    // The typing effect will increment this index over time until it reaches the end of the text.
    const [charaIndex, setCharaIndex] = useState(0);
    // Ref to track whether the user has clicked to skip the typing animation
    // If the user clicks on the dialogue, this ref will be set to true, causing the typing effect to stop immediately.
    const skip = useRef(false);

    // Effect to handle the typing animation and allow skipping it
    // It sets up an interval to increment the character index over time and clears the interval when the component 
    // unmounts or when the text changes.
    useEffect(() => {
        setCharaIndex(0); // Reset the character index to the beginning of the text whenever the text changes
        skip.current = false; // Reset the skip flag whenever the text changes

        // Set up the interval to increment the character index over time, having the typing effect
        const interval = setInterval(() => {
            setCharaIndex(current => {
                // Check if the current character index has reached the end of the text or if the user has clicked to skip the typing effect
                if (current >= text.length || skip.current) {
                    clearInterval(interval);
                    return text.length;
                }

                // If the current character index has not reached the end of the text and the user has not clicked to skip, increment the index
                return current + 1;
            })
        }, 60); // The interval duration in milliseconds for the typing effect

        return () => clearInterval(interval); // Clear the interval when the component unmounts or the text changes
    }, [text]); // Re-run the effect whenever the text changes

    // Render the dialogue text with the typing effect
    return (
        <h1 {...props} className="DialogueText" onClick={() => skip.current = true}>
            {/* Slice the text up to the current character index and render each character with a typing effect */}
            {text.slice(0, charaIndex).split("").map((character, index) => {
                if (character === '\n') {
                    return <br key={index} />
                } else {
                    return <span className="TypeLetter" key={index}>{character == " " ? "\u00A0" : character}</span>
                }
            })}
        </h1>
    )
}

export default Dialogue