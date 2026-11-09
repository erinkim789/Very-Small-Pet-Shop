import AdoptionBackground from '../assets/AdoptionBackground.png'
import AdoptionFrame from '../components/AdoptionFrame.jsx'
import '../style/Adoption.css'

// The following is a page that displays the pets' decisions after the user has completed the application.
// When a pet is clicked, the system will take them to the pet's profile page where the user can confirm adoption.
function Adoption({visible, applicationResults, setPet, setAcceptedAdoption, getAnimalAdoption }) {
    if (!visible || !applicationResults) return null; // Don't render the adoption page if it's not visible or if there are no application results

    // Function to handle the click event on a pet's adoption frame
    // It updates the accepted adoption status for the selected pet and sets the current pet in the state.
    const handlePetClick = (petName) => {
        switch (petName) {
            case "Kevin":
                setAcceptedAdoption(applicationResults.kevin_result);
                break;
            case "Biscuit":
                setAcceptedAdoption(applicationResults.biscuit_result);
                break;
            case "Geraldine":
                setAcceptedAdoption(applicationResults.geraldine_result);
                break;
            case "Greg":
                setAcceptedAdoption(applicationResults.greg_result);
                break;
            case "Momo":
                setAcceptedAdoption(applicationResults.momo_result);
                break;
            case "Pickle":
                setAcceptedAdoption(applicationResults.pickle_result);
                break;
        }

        setPet(petName);
        getAnimalAdoption(petName); // Calls the given getAnimalAdoption function with the selected pet name. The function will change the page to the profile details of the pet
    };

    // Rendering the adoption page with adoption frames for each pet. Each frame displays the pet's name, adoption reason, and acceptance status.
    return(
        <>
            <img className="img_background" src={AdoptionBackground} />
            <AdoptionFrame id="kevinFrame" text={applicationResults.kevin_reason} accepted={applicationResults.kevin_result} pet="Kevin" onClick={() => handlePetClick("Kevin")} />
            <AdoptionFrame id="biscuitFrame" text={applicationResults.biscuit_reason} accepted={applicationResults.biscuit_result} pet="Biscuit" onClick={() => handlePetClick("Biscuit")} />
            <AdoptionFrame id="geraldineFrame" text={applicationResults.geraldine_reason} accepted={applicationResults.geraldine_result} pet="Geraldine" onClick={() => handlePetClick("Geraldine")} />
            <AdoptionFrame id="gregFrame" text={applicationResults.greg_reason} accepted={applicationResults.greg_result} pet="Greg" onClick={() => handlePetClick("Greg")} />
            <AdoptionFrame id="momoFrame" text={applicationResults.momo_reason} accepted={applicationResults.momo_result} pet="Momo" onClick={() => handlePetClick("Momo")} />
            <AdoptionFrame id="pickleFrame" text={applicationResults.pickle_reason} accepted={applicationResults.pickle_result} pet="Pickle" onClick={() => handlePetClick("Pickle")} />
        </>
    )
}

export default Adoption