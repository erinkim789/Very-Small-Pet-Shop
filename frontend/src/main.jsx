import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PetStore from './pages/PetStore.jsx'
import House from './pages/House.jsx'
import Profile from './pages/Profile.jsx'
import Loading from './pages/Loading.jsx'
import Application from './pages/Application.jsx'
import Adoption from './pages/Adoption.jsx'
import AdoptionProfile from './pages/AdoptionProfile.jsx'
import AdoptionResults from './pages/AdoptionResults.jsx'

// Main component that handles the overall layout and state management for the pet shop application. Main controls
// switching between different pages and managing the state for pet profiles, applications, and adoption results.
// It is also responsible for making all API requests to fetch and submit data related to pets, applications, and adoptions.
function Main() {
  // Used to scale the store_stack div, which contains all elements of the
  // pet shop, such as the background image, the pet gifs, etc.
  const [scale, setScale] = useState(1);

  // Scaling the store_stack div every time the window is resized so that everything fits properly
  useEffect(() => {
    const updateScale = () => {
      const scale = Math.min(
        (window.innerWidth - 20) / 5120, // 5120 because the background images of all pages are 5120px x 5120px
        (window.innerHeight - 20) / 5120
      )

      setScale(scale)
    }

    updateScale() // Initial scale update
    window.addEventListener('resize', updateScale) // Update scale on window resize

    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // state variables to control game flow and switching of the pages without user control.
  const [page, setPage] = useState("House"); // Initial page is set to "House"
  // state variables for pet profiles and to control which pet is being shown for pet profiles and adoption profiles
  const [pet, setPet] = useState(); // pet will be set to a pet object fetched from the API
  // state variable for application results. It contains the personality vector of the user based on their application answers, along with the pet's
  // decisions of whether they accept or reject the adoption request (and a message behind their reasoning!)
  const [applicationResults, setApplicationResults] = useState(); // applicationResults will be set to the result of the application submission
  // state variable to track whether the adoption has been accepted. It will be set to true if the adoption is accepted, and false otherwise.
  // It will be used by adoption profiles to see if the button to proceed with adopting should be available
  const [acceptedAdoption, setAcceptedAdoption] = useState(false);
  // state variable to track the user's data returned when completing the adoption. It is an object that contains
  // information on the user's personality score percentiles and the percentage of users who chose the same pet to adopt.
  const [completeAdoptionVar, setCompleteAdoptionVar] = useState(); // will be set to the returned value from the API call to complete the adoption

  // function to check the health of the backend API by calling the /health/ endpoint.
  const getHealth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/health/`);

      if (!response.ok) {
        throw new Error("Backend health check failed");
      }

      const data = await response.json();
      console.log("Backend status:", data);

      return data;
    } catch (error) {
      console.error("Could not connect to backend:", error);
    }
  };

  useEffect(() => {
    getHealth();
  }, []);

  // function to fetch a pet's information from the API by its name and update the state accordingly.
  // It also updates the current page to the specified page after fetching the pet's information.
  const getAnimal = async (animalName, pageToGo) => {
    setPage("Loading"); // sets to the Loading page during the API call

    const response = await fetch(`${import.meta.env.VITE_API_URL}/animals/${animalName}`);
    const data = await response.json();

    setPet(data); // sets pet to the fetched pet object from the API
    setPage(pageToGo); 
  };

  // function to submit the user's application for adoption and update the state accordingly.
  // It sends the user's answers to the API and updates the applicationResults state with the response.
  const submitApplication = async (answers) => {
    setPage("Loading"); // sets to the Loading page during the API call

    const response = await fetch(`${import.meta.env.VITE_API_URL}/submit_application/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            q1: answers[0],
            q2: answers[1],
            q3: answers[2],
            q4: answers[3],
            q5: answers[4],
            q6: answers[5],
            q7: answers[6],
            q8: answers[7],
        }),
    });

    const data = await response.json();
    setApplicationResults(data);

    setPage("Adoption");
  };

  // function to complete the adoption process and update the state accordingly.
  // It sends the user's scores and chosen pet to the API and updates the completeAdoptionVar state with the response.
  const completeAdoption = async () => {
    setPage("Loading"); // sets to the Loading page during the API call

    const scores = applicationResults.scores; // gets the scores from the application results

    const response = await fetch(`${import.meta.env.VITE_API_URL}/complete_adoption/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            sociability: scores[0],
            persistence: scores[1],
            patience: scores[2],
            spontaneity: scores[3],
            chosen_pet: pet.Name
        }),
    });

    const data = await response.json();
    setCompleteAdoptionVar(data); // sets the complete adoption variable to the response from the API

    setPage("AdoptionResults"); // sets the page to AdoptionResults after completing the adoption
  };

  // return the main component containing all the sub-components for different pages.
  return (
    <section id="component_stack" style={{transform: `scale(${scale})`}}>
      <House 
        visible = {page === "House"}
        setPage = {setPage}
      />
      <PetStore 
        visible = {page === "PetStore"}
        getAnimal = {(animalName) => getAnimal(animalName, "Profile")}
        setPage = {setPage}
      />
      <Profile 
        visible = {page === "Profile"}
        pet = {pet}
        setPage = {setPage}
      />
      <Loading visible={page === "Loading"} />
      <Application visible={page === "Application"} 
        setApplication={submitApplication} 
        setPage={setPage} 
      />
      <Adoption 
        visible={page === "Adoption"} 
        applicationResults={applicationResults}
        getAnimalAdoption={(animalName) => getAnimal(animalName, "AdoptionProfile")}
        setPet={setPet}
        setAcceptedAdoption={setAcceptedAdoption}
      />
      <AdoptionProfile 
        visible={page === "AdoptionProfile"} 
        pet={pet}
        acceptedAdoption={acceptedAdoption}
        setPage={setPage}
        completeAdoption={completeAdoption}
      />
      <AdoptionResults 
        visible={page === "AdoptionResults"} 
        pet={pet?.Name}
        AdoptionData={completeAdoptionVar}
        scores={applicationResults?.scores}
      />

      <div id="infoLinks">
        <h1><a>Github</a></h1>
        <h1><a>Resume</a></h1>
      </div>
    </section>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <section id="center">
      <Main />
    </section>
  </StrictMode>,
)
