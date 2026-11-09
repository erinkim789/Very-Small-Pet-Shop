import ProfileFullBackground from '../assets/ProfileFullBackground.png'

import Button from '../components/Button.jsx'

import ProfileBackground from '../assets/ProfileBackground.png'

import Biscuit from '../assets/Biscuit.gif'
import Geraldine from '../assets/Geraldine.gif'
import Greg from '../assets/Greg.gif'
import Kevin from '../assets/Kevin.gif'
import Momo from '../assets/Momo.gif'
import Pickle from '../assets/Pickle.gif'

import '../style/Profile.css'

// function that renders the profile page for a pet. It displays the pet's image and details, along with a button to navigate back to the pet shop.
function Profile({visible, pet, setPage}) {
    if (!visible) return null; // If the profile is not visible, render nothing
    
    // Determine the pet's image based on its name
    const PetImg = {
        Biscuit,
        Geraldine,
        Greg,
        Kevin,
        Momo,
        Pickle
    }[pet.Name];

    // Render the profile page with the pet's image and details, along with a button to go back to the pet shop
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
            <Button id="profileNextButton" color="pink" text="Back to Pet Shop" onClick={() => setPage("PetStore")} />
        </>
    )
}

export default Profile