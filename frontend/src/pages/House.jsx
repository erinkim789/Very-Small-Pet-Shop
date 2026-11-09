import { useEffect, useState } from 'react'
import HouseBackground from '../assets/House.png'
import HouseDialogue from '../assets/HouseDialogue.png'
import Dialogue from '../components/Dialogue.jsx'
import Button from '../components/Button.jsx'
import '../style/House.css'

function House({visible, setPage}) {
    // States to control the dialogue flow
    const [gameState, setGameState] = useState(0);
    // States to control the dialogue text
    const [text, setText] = useState("It's a beautiful Saturday afternoon and your house is peaceful."); // Initial dialogue text

    // Function to handle the "Continue" button click and progress the dialogue
    const onContinue = () => {
        switch (gameState) {
            case 0:
                setGameState(1);
                setText("Perhaps even a little too peaceful... A pet would fix that. Probably.");
                break;
            case 1:
                setGameState(2);
                setPage("PetStore");
                break;
        }
    }

    // Render the house scene only if it is visible
    if (!visible) return null;

    // Render the house background with the dialogue and continue button
    return(
        <>
            <img className="img_background" src={HouseBackground} /> 
            <img id="houseDialogue" className="Dialogue" src={HouseDialogue} />
            <Dialogue id="houseDialogueText" text={text} />
            <Button id="houseNextButton" color="blue" text="Continue" onClick={onContinue} />
        </>
    )
}

export default House