import { useEffect, useState } from 'react'
import '../style/Loading.css'

import Biscuit from '../assets/Biscuit.gif'
import Geraldine from '../assets/Geraldine.gif'
import Greg from '../assets/Greg.gif'
import Kevin from '../assets/Kevin.gif'
import Momo from '../assets/Momo.gif'
import Pickle from '../assets/Pickle.gif'

// Page that displays a loading animation with a rotating pet image and a "Loading..." text.
// The rotation of the pet image is controlled using a state variable and a useEffect hook with a setInterval.
function Loading({ visible }) {
    const text = "Loading..."; // The text to display during the loading animation.

    const pets = [Biscuit, Geraldine, Greg, Kevin, Momo, Pickle]; // Array of pet images to rotate during the loading animation.

    const [petIndex, setPetIndex] = useState(0); // State variable to keep track of the current pet index in the rotation.

    // Set up the interval to rotate the pet image every 2 seconds if the page is visible.
    useEffect(() => {
        if (!visible) return;

        const interval = setInterval(() => {
            setPetIndex(current => (current + 1) % pets.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [visible]);

    // If not visible, do not render
    if (!visible) return null;

    // Render the loading animation with the current pet image and the "Loading..." text.
    return (
        <div className="Loading">
            <img
                id="LoadingPet"
                src={pets[petIndex]}
                alt="Loading"
            />

            {/* Display the "Loading..." text with each letter animated sequentially. */}
            <div className="LoadingText">
                {text.split("").map((character, index) => (
                    <span
                        className="LoadingLetter"
                        key={index}
                        style={{ animationDelay: `${(index + 1) * 0.2}s` }}
                    >
                        {character}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Loading