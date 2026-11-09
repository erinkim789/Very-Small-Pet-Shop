import ProfileFullBackground from '../assets/ProfileFullBackground.png'

import Button from '../components/Button'

import ProfileBackground from '../assets/ProfileBackground.png'

import Biscuit from '../assets/Biscuit.gif'
import Geraldine from '../assets/Geraldine.gif'
import Greg from '../assets/Greg.gif'
import Kevin from '../assets/Kevin.gif'
import Momo from '../assets/Momo.gif'
import Pickle from '../assets/Pickle.gif'

import '../style/AdoptionProfile.css'

// function that renders the adoption profile page for a pet, given by the parameter pet. It is remarkably similar to the Profile page with
// slight differences to the buttons. Mainly, if the back button is pressed it will go to the adoption page instead of the pet shop. Additionally,
// if the pet has decided to allow themselves to be adopted by the user (can check with with the acceptedAdoption parameter), the user can 
// proceed to completing their adoption. This is done by calling the completeAdoption function.
function AdoptionProfile({visible, pet, setPage, acceptedAdoption, completeAdoption}) {
    if (!visible) return null; // If the profile is not visible, render nothing.
    
    // Determine the pet's image based on its name
    const PetImg = {
        Biscuit,
        Geraldine,
        Greg,
        Kevin,
        Momo,
        Pickle
    }[pet.Name];

    // Render the adoption profile page with the pet's image and details.
    // The page has two buttons: one to go back to the results and one to adopt the pet. The adopt button is only visile if the pet has approved to be adopted by 
    // the user. If the pet has not accepted, the user cannot adopt the pet
    return(
        <>
            <img className="img_background" src={ProfileFullBackground} />
            <img id="profileBackground" src={ProfileBackground} />
            <img id="pet" src={PetImg} />
            <span id="ProfileText">
                <span>{"Name: " + pet.Name}</span> <br /> <br />
                <span>{pet.Description}</span> <br /> <br />
                <span>{"Species: " + pet.Species}</span> <br /> <br />
                <span>{"Occupation: " + pet.Occupation}</span> <br /> <br />
                <span>{"Favorite Food: " + pet.Favorite_Food}</span> <br /> <br />
                <span>{"Favorite Activity: " + pet.Favorite_Activity}</span> <br /> <br />
                <span>{"Skill: " + pet.Skill}</span> <br /> <br />
                <span>{"Likes: " + pet.Likes}</span> <br /> <br />
                <span>{"Dislikes: " + pet.Dislikes}</span> <br /> <br />
            </span>
            <Button id="adoptionProfileBackButton" color="blue" text="Back to Results" onClick={() => setPage("Adoption")} />
            <Button id="adoptButton" color="pink" text="Adopt This Pet" onClick={() => completeAdoption()} style={{display: acceptedAdoption ? "" : "none"}} />
        </>         
    )
}

export default AdoptionProfile;