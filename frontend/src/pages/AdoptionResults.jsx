import AdoptionResultsBackground from '../assets/AdoptionResultsBackground.png'
import Biscuit from '../assets/Biscuit.gif'
import Geraldine from '../assets/Geraldine.gif'
import Greg from '../assets/Greg.gif'
import Kevin from '../assets/Kevin.gif'
import Momo from '../assets/Momo.gif'
import Pickle from '../assets/Pickle.gif'
import Bar from '../components/Bar'
import ResultsTitle from '../assets/ResultsTitle.png'
import PetShadow from '../assets/PetShadow.png'
import '../style/AdoptionResults.css'

// Page that displays the results of a pet adoption, including the adopted pet's image and personality trait scores.
// The page also displays the user's percentile rankings for each personality trait and the overall adoption statistics.
// These statistics are all accessed using the AdoptionData object, and the scores array contains the user's personality 
// trait scores.
function AdoptionResults({ visible, pet, AdoptionData, scores }) {
    // Determine the image of the adopted pet based on the pet's name.
    const petImage = {
        Biscuit,
        Geraldine,
        Greg,
        Kevin,
        Momo,
        Pickle
    }[pet]; 

    if (!visible || !AdoptionData || !scores) return null; // Return null if the page is not visible or if necessary data is missing.

    const scorePercents = scores.map(score => parseFloat((score * 100 / 5).toFixed(2))); // Convert each score to a percentage and round to two decimal places.

    // Render the adoption results page with the adopted pet's image, personality trait scores, and percentile rankings.
    return(
        <>
            <div className="AdoptionResultsWrapper">
                <img className="resultsTitle" src={ResultsTitle} alt="Results" />
                <img className="img_background" src={AdoptionResultsBackground} />
                
                {/* Display the adopted pet's image and shadow, and the congratulatory message for adopting the pet. It also includes the percentage of users who chose to adopt the pet. */}
                <div className="adoptedPetContainer">
                    <div className="adoptedPetDetail">
                        <img className="adoptedPet" src={[petImage]} alt="adopted pet" />
                        <img className="petShadow" src={PetShadow} />
                    </div>
                    
                    <div className="adoptionMessage">
                        <h3>Congratulations on adopting {pet}!</h3>
                        <h3>You were among the {parseFloat(AdoptionData.pet_percent.toFixed(2))}% of our users who chose to adopt {pet}!</h3>
                    </div>
                </div>
                
                {/* Display the user's personality trait scores and percentile rankings for sociability, persistence, patience, and spontaneity. */}
                <h3 id="sociability">Your Sociability Level: <span className="textHighlight">{scorePercents[0]}%</span></h3>
                <Bar id="socialBar" text={`You are more social than ${parseFloat(AdoptionData.sociability_percentile.toFixed(2))}% of our users!`} percent={scorePercents[0]/100} />
                
                <h3 id="persistence">Your Persistence Level: <span className="textHighlight">{scorePercents[1]}%</span></h3>
                <Bar id="persistenceBar" text={`You are more persistent than ${parseFloat(AdoptionData.persistence_percentile.toFixed(2))}% of our users!`} percent={scorePercents[1]/100} />
                
                <h3 id="patience">Your Patience Level: <span className="textHighlight">{scorePercents[2]}%</span></h3>
                <Bar id="patienceBar" text={`You are more patient than ${parseFloat(AdoptionData.patience_percentile.toFixed(2))}% of our users!`} percent={scorePercents[2]/100} />
                
                <h3 id="spontaneity">Your Spontaneity Level: <span className="textHighlight">{scorePercents[3]}%</span></h3>
                <Bar id="spontaneityBar" text={`You were more spontaneous than ${parseFloat(AdoptionData.spontaneity_percentile.toFixed(2))}% of our users!`} percent={scorePercents[3]/100} />
            </div>
        </>
    )
}

export default AdoptionResults