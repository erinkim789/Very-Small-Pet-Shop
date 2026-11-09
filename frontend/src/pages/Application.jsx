import { useEffect, useRef, useState } from 'react'
import ApplicationBackground from '../assets/ApplicationBackground.png'
import DefaultButton from '../assets/Button.png'
import HoverButton from '../assets/HoverButton.png'
import Checkbox from '../components/Checkbox.jsx'
import Button from '../components/Button.jsx'
import '../style/Application.css'

// The following is an application for the user to fill out. At the end of the application, the
// system will send a post request to the backend to receive the pets' decisions.

// /// Introduction ///

// Thank you for your interest in adopting a pet from the Very Little Pet Shop.

// Before you can take one home, you’ll have to pass their review process. Our pets will examine your application and make the final decision.

// Please proceed below to begin your application.

// /// Questions ///

// 1) You are invited to a party where you know absolutely no one.
//     a) Politely decline 
//     b) I'll go, but I'm finding a quiet corner 
//     c) Sure, as long as I can bring a friend 
//     d) Even better, I can't wait to meet new people 

// 2) You have a free afternoon with no plans.
//     a) I'll stay home and relax 
//     b) No plans? I'm finding a new adventure 
//     c) That's impossible. I have so much work on my calendar already
//     d) Let me call some friends 

// 3) You are asked to work on a project with a tight deadline.
//     a) I'll panic and stress out 
//     b) I'll plan and split my tasks efficiently 
//     c) I'll find teammates to split the workload with 
//     d) I'll work overtime to ensure it's completed on time 

// 4) You are faced with a sudden change in plans.
//     a) I'll get upset and frustrated 
//     b) I'll adapt and find a new way to proceed
//     c) Can I phone a friend? 
//     d) I'll try to stick to the original plan as much as possible

// 5) You are given a choice between two equally appealing options.
//     a) I'll flip a coin to decide 
//     b) I'll ask for advice from someone I trust
//     c) I'll go with my gut feeling
//     d) I'll analyze the pros and cons carefully before deciding

// 6) You are tasked with learning a new skill.
//     a) I have twenty different skills waiting to be learned
//     b) I'll look for a mentor or guide to help me learn
//     c) I'll research and gather resources before starting
//     d) I'll take my time and learn at my own pace

// 7) How do you feel about potatoes?
//     a) I love them
//     b) They're fine
//     c) I don't care much for them
//     d) I dislike them

// 8) You are picking an outfit for a special occasion. What are you wearing?
//     a) Matching outfits with my friends!
//     b) I'll stick to my usual style
//     c) I'll experiment with a new look
//     d) Socks with sandals.

function Application({visible, setPage, setApplication}) {
    // States to control the dialogue flow
    const [gameState, setGameState] = useState(0);
    // States to show introduction to the application before the application begins
    const [showIntro, setshowIntro] = useState(true);
    // States to control the dialogue text
    const [headerText, setHeaderText] = useState("");
    // States to control the question multiple choice options
    const [questionOptions, setQuestionOptions] = useState(["", "", "", ""]);
    const [selectedOption, setSelectedOption] = useState(["", "", "", "", "", "", "", ""]);

    if (!visible) return null; // Don't render the application if it's not visible

    // Function to set the question and its options based on the question number
    const setQuestion = (question_num) => {
        switch (question_num) {
            case 1:
                setHeaderText("You are invited to a party where you know absolutely no one.");
                setQuestionOptions(["Politely decline", "I'll go, but I'm finding a quiet corner", "Sure, as long as I can bring a friend", "Even better, I can't wait to meet new people"]);
                break;
            case 2:
                setHeaderText("You have a sunny afternoon with no plans.");
                setQuestionOptions(["I'll stay home and relax", "No plans? I'm finding a new adventure", "That's impossible. I have so much work on my calendar already", "Let me call some friends"]);
                break;
            case 3:
                setHeaderText("You are tasked with working on a project with a tight deadline.");
                setQuestionOptions(["I'll panic and stress out", "I'll plan and split my tasks efficiently", "I'll find teammates to split the workload with", "I'll work overtime to ensure it's completed on time"]);
                break;
            case 4:
                setHeaderText("You are faced with a sudden change in plans.");
                setQuestionOptions(["I'll get upset and frustrated", "I'll adapt and find a new way to proceed", "Can I phone a friend?", "I'll try to stick to the original plan as much as possible"]);
                break;
            case 5:
                setHeaderText("You are given a choice between two equally appealing options.");
                setQuestionOptions(["I'll flip a coin to decide", "I'll ask for advice from someone I trust", "I'll go with my gut feeling", "I'll analyze the pros and cons carefully before deciding"]);
                break;
            case 6:
                setHeaderText("You are learning a new skill.");
                setQuestionOptions(["I can't wait to add it to my list of 20 other skills waiting to be learned", "I'll look for a mentor or guide to help me learn", "I'll research and gather resources before starting", "I'll take my time and learn at my own pace"]);
                break;
            case 7:
                setHeaderText("How do you feel about potatoes?");
                setQuestionOptions(["I love them", "They're fine", "I don't care much for them", "I dislike them"]);
                break;
            case 8:
                setHeaderText("You are picking an outfit for a special occasion.");
                setQuestionOptions(["I'll wear matching outfits with my friends", "I'll stick to my usual style", "I'll experiment with a new look", "Socks with sandals."]);
                break;
        }
    }

    // Function to handle the "Continue" button click, validate the selected option, and proceed to the next question or submit the application
    const onContinue = () => {
        // Check if the user has pressed the button for the first time to hide the intro section
        if (gameState == 0) {
            setshowIntro(false);
        } else { 
            // Check if the user has selected an option for the current question before continuing
            if (selectedOption[gameState - 1] === "") {
                alert("Please select an option before continuing.");
                return;
            }
        }

        // If the user has completed all questions, submit the application and transition to the loading page
        if (gameState == 8) {
            setGameState(0);
            setApplication(selectedOption); // Calls the given function setApplication with the user's answers <- This function will submit the application to the API and change the pages
        }

        setQuestion(gameState + 1); // sets the question to the next question number
        setGameState(gameState + 1); // updates the game state to the next question number
    }

    // Function to handle the checkbox click and update the selected option for the current question
    const handleCheckboxClick = (index) => {
        // sets selected to the corresponding option letter based on the index of the clicked checkbox, which is the format that the API expects for the application answers
        const optionLetters = ["a", "b", "c", "d"];
        const selected = optionLetters[index];

        // updates the selected option for the current question in the state
        setSelectedOption(prev => {
            const updated = [...prev];
            updated[gameState - 1] = selected;
            return updated;
        });
    }

    // rendering the page with h2 for the question, checkboxes for the options, and a continue button. Question intro is only shown when the page is first
    // shown and is hidden after the user has seen it once and presses the continue button.
    return(
        <>
            <img className="img_background" src={ApplicationBackground} />

            <h2 id="headerText">{headerText}</h2>

            <div id="questionIntro" style={{ display: showIntro ? "block" : "none" }}>
                <h1>Thank you for your interest in adopting a pet from the Very Little Pet Shop.</h1>
                <h1>Before you can take one home, you’ll have to pass their review process. Our pets will examine your application and make the final decision.</h1>
                <h1>Please proceed below to begin your application.</h1>
            </div>

            <div id="questionContainer" style={{ display: showIntro ? "none" : "block" }}>
                <Checkbox text={questionOptions[0]} onClick={() => handleCheckboxClick(0)} checked={selectedOption[gameState - 1 >= 0 ? gameState - 1 : 0] === "a"} />
                <Checkbox text={questionOptions[1]} onClick={() => handleCheckboxClick(1)} checked={selectedOption[gameState - 1 >= 0 ? gameState - 1 : 0] === "b"} />
                <Checkbox text={questionOptions[2]} onClick={() => handleCheckboxClick(2)} checked={selectedOption[gameState - 1 >= 0 ? gameState - 1 : 0] === "c"} />
                <Checkbox text={questionOptions[3]} onClick={() => handleCheckboxClick(3)} checked={selectedOption[gameState - 1 >= 0 ? gameState - 1 : 0] === "d"} /> 
            </div>

            <Button id="applicationNextButton" onClick={onContinue} text="Continue" color="pink" />
        </>
    )
}

export default Application