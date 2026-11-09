import Biscuit from '../assets/Biscuit.gif'
import Geraldine from '../assets/Geraldine.gif'
import Greg from '../assets/Greg.gif'
import Kevin from '../assets/Kevin.gif'
import Momo from '../assets/Momo.gif'
import Pickle from '../assets/Pickle.gif'

import PetStore from '../assets/PetShop.png'

import PetStoreDialogue from '../assets/PetStoreDialogue.png'
import Dialogue from '../components/Dialogue.jsx'

import Button from '../components/Button.jsx'

import '../style/PetStore.css'

function PetStoreJsx({ visible, setPage, getAnimal }) {

  if (!visible) return null;

  return (
    <>
      <img className="img_background" src={PetStore} />

      {/* Pet Images */}
      <img id="Biscuit" src={Biscuit} onClick={() => getAnimal("Biscuit")} />
      <img id="Geraldine" src={Geraldine} onClick={() => getAnimal("Geraldine")} />
      <img id="Greg" src={Greg} onClick={() => getAnimal("Greg")} />
      <img id="Kevin" src={Kevin} onClick={() => getAnimal("Kevin")} />
      <img id="Momo" src={Momo} onClick={() => getAnimal("Momo")} />
      <img id="Pickle" src={Pickle} onClick={() => getAnimal("Pickle")} />

      <img id="PetStoreDialogue" className="Dialogue" src={PetStoreDialogue} />
      <Dialogue id="PetStoreDialogueText" text="Click on a pet to get to know them better!" />

      <Button id="adoptButton" color="pink" text="Adopt Your Pet" onClick={() => setPage("Application")} />
    </>
  )
}
export default PetStoreJsx
