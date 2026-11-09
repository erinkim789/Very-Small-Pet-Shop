import { useEffect, useRef, useState } from 'react'
import AcceptedStamp from '../assets/AcceptedStamp.png'
import RejectedStamp from '../assets/RejectedStamp.png'
import Plaque from '../assets/Plaque.png'
import PictureFrame from '../assets/PictureFrame.png'
import Biscuit from '../assets/Biscuit.gif'
import Geraldine from '../assets/Geraldine.gif'
import Greg from '../assets/Greg.gif'
import Kevin from '../assets/Kevin.gif'
import Momo from '../assets/Momo.gif'
import Pickle from '../assets/Pickle.gif'
import '../style/AdoptionFrame.css'

// A reusable component for displaying an adoption frame with a pet's image, acceptance status, and a plaque with text.
function AdoptionFrame({ text, accepted, pet, ...props }) {
    // Determines which pet image to display based on the pet prop.
    const petImage = {
        Biscuit,
        Geraldine,
        Greg,
        Kevin,
        Momo,
        Pickle
    }[pet]; 

    // Renders the adoption frame with the pet image, acceptance/rejection stamps, and a plaque containing the text.
    return(
        <>
            <div className="adoptionFrameContainer" {...props} >
                <div className="pictureFrameStack" >
                    <img id="pictureFrame" src={PictureFrame} alt={"Picture Frame"} />
                    <img id="petImage" src={petImage} alt={pet} />
                    <img id="AcceptedStamp" src={AcceptedStamp} style={{ display: accepted ? 'block' : 'none' }} alt={"Accepted Stamp"} />
                    <img id="RejectedStamp" src={RejectedStamp} style={{ display: !accepted ? 'block' : 'none' }} alt={"Rejected Stamp"} />
                </div>

                <div className="plaqueContainer">
                    <img id="Plaque" src={Plaque} alt={"Plaque"} />
                    <h2>{text}</h2>
                </div>
            </div>
        </>
    )
}

export default AdoptionFrame