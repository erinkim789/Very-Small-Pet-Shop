import BarBackground from '../assets/BarBackground.png'
import BarStart from '../assets/BarStart.png'
import BarEnd from '../assets/BarEnd.png'
import BarMiddle from '../assets/BarMiddle.png'
import '../style/Bar.css'

// reusable component for rendering a progress bar with a given text and percentage.
// It accepts a text prop for the label and a percent prop for the progress value.
function Bar({ text, percent, ...props }) {
    return(
        <>
            <div className="FullBarContainer" {...props} >
                <div className="BarContainer" >
                    <img id="BarBackground" src={BarBackground} alt="bar background" />
                    <div className="BarInnerContainer">
                        <img id="BarStart" src={BarStart} alt="bar beginning" />
                        <div id="BarMiddleContainer" style={{ width: percent * 2100 + "px"}} className="BarMiddleContainer">
                            <img id="BarMiddle" src={BarMiddle} alt="bar middle" />
                        </div>
                        <img id="BarEnd" src={BarEnd} alt="bar end" />
                    </div>
                </div>
                <h2>{text}</h2>
            </div>
        </>
    )
}

export default Bar