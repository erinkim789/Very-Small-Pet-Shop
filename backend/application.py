from pydantic import BaseModel
from animals import Animals

# The purpose of the following is to calculate the personality metrics of the user based on
# the user's responses to a series of questions.

# The personality metrics are defined under four categories:
#     Sociability -> &S
#     Persistence -> &P
#     Patience -> *P
#     Spontaneity -> *S

# The following code will receive the user's responses, calculate the personality metrics based on them,
# and provide a vector representing the user's personality metrics. Along with this, it will also add 
# the user's metrics to the database and provide average metrics for comparison.

# /// Questions /// -> &S | &P | *P | *S

# 1) You are invited to a party where you know absolutely no one.
#     a) Politely decline -> +0 | +0 | +0 | +0
#     b) I'll go, but I'm finding a quiet corner -> +1 | +0 | +1 | +0
#     c) Sure, as long as I can bring a friend -> +1 | +0 | +0 | +1
#     d) Even better, I can't wait to meet new people -> +2 | +0 | +0 | +2

# 2) You have a free afternoon with no plans.
#     a) I'll stay home and relax -> +0 | +0 | +1 | +0
#     b) No plans? I'm finding a new adventure -> +0 | +0 | +0 | +1
#     c) That's impossible. I have so much work on my calendar already -> +0 | +1 | +0 | +0
#     d) Let me call some friends -> +1 | +0 | +0 | +0

# 3) You are asked to work on a project with a tight deadline.
#     a) I'll panic and stress out -> +0 | +0 | +0 | +0
#     b) I'll plan and split my tasks efficiently -> +0 | +1 | +1 | +0
#     c) I'll find teammates to split the workload with -> +1 | +0 | +0 | +1
#     d) I'll work overtime to ensure it's completed on time -> +0 | +2 | +0 | +0

# 4) You are faced with a sudden change in plans.
#     a) I'll get upset and frustrated -> +0 | +0 | +0 | +0
#     b) I'll adapt and find a new way to proceed -> +0 | +0 | +1 | +1
#     c) Can I phone a friend? -> +1 | +0 | +0 | +0
#     d) I'll try to stick to the original plan as much as possible -> +0 | +1 | +0 | +0

# 5) You are given a choice between two equally appealing options.
#     a) I'll flip a coin to decide -> +0 | +0 | +0 | +2
#     b) I'll ask for advice from someone I trust -> +1 | +0 | +0 | +0
#     c) I'll go with my gut feeling -> +0 | +0 | +1 | +1
#     d) I'll analyze the pros and cons carefully before deciding -> +0 | +1 | +1 | +0

# 6) You are tasked with learning a new skill.
#     a) I have twenty different skills waiting to be learned -> +0 | +0 | +0 | +1
#     b) I'll look for a mentor or guide to help me learn -> +1 | +0 | +0 | +0
#     c) I'll research and gather resources before starting -> +0 | +1 | +0 | +0
#     d) I'll take my time and learn at my own pace -> +0 | +0 | +1 | +0

# 7) How do you feel about potatoes?
#     a) I love them -> Kevin pass
#     b) They're fine -> Kevin fail
#     c) I don't care much for them -> Kevin fail
#     d) I dislike them -> Kevin fail

# 8) You are picking an outfit for a special occasion. What are you wearing?
#     a) Matching outfits with my friends! -> +2 | +0 | +0 | +0
#     b) I'll stick to my usual style -> +0 | +0 | +1 | +0
#     c) I'll experiment with a new look -> +0 | +0 | +0 | +2
#     d) Socks with sandals. -> +0 | +1 | +0 | +0, Geraldine fail

# Application class for representing a user's application and their answers to the personality questions.
# This class will also be used to receive the post request to the "submit_application" endpoint.
class UserApplication(BaseModel):
    q1: str
    q2: str
    q3: str
    q4: str
    q5: str
    q6: str
    q7: str
    q8: str

# Class for representing the results of the personality assessment and pet compatibility calculations.
# This class will be used to store and return the computed scores and compatibility results for each user application.
class ApplicationResults:
    scores: list[float]
    kevin_result: bool
    kevin_reason: str
    geraldine_result: bool
    geraldine_reason: str
    biscuit_result: bool
    biscuit_reason: str
    greg_result: bool
    greg_reason: str
    momo_result: bool
    momo_reason: str
    pickle_result: bool
    pickle_reason: str

max_range = 5 # maximum possible score for each dimension

num_personality_dimensions = 4 # number of personality dimensions in the model: sociability, persistence, patience, and spontaneity
num_questions = 8 # number of questions in the personality assessment

# Personality stats for each question
question_personality_stats = {
    "q1": {
        "a": [0, 0, 0, 0],
        "b": [1, 0, 1, 0],
        "c": [1, 0, 0, 1],
        "d": [2, 0, 0, 2]
    },
    "q2": {
        "a": [0, 0, 1, 0],
        "b": [0, 0, 0, 1],
        "c": [0, 1, 0, 0],
        "d": [1, 0, 0, 0]
    },
    "q3": {
        "a": [0, 0, 0, 0],
        "b": [0, 1, 1, 0],
        "c": [1, 0, 0, 1],
        "d": [0, 2, 0, 0]
    },
    "q4": {
        "a": [0, 0, 0, 0],
        "b": [0, 0, 1, 1],
        "c": [1, 0, 0, 0],
        "d": [0, 1, 0, 0]
    },
    "q5": {
        "a": [0, 0, 0, 2],
        "b": [1, 0, 0, 0],
        "c": [0, 0, 1, 1],
        "d": [0, 1, 1, 0]
    },
    "q6": {
        "a": [0, 0, 0, 1],
        "b": [1, 0, 0, 0],
        "c": [0, 1, 0, 0],
        "d": [0, 0, 1, 0]
    },
    "q7": {
        "a": [0, 0, 0, 0],
        "b": [0, 0, 0, 0],
        "c": [0, 0, 0, 0],
        "d": [0, 0, 0, 0]
    },
    "q8": {
        "a": [2, 0, 0, 0],
        "b": [0, 0, 1, 0],
        "c": [0, 0, 0, 2],
        "d": [0, 1, 0, 0]
    }

}

# Calculate each pet's compatibility with the user and determine whether the pet will accept or reject the adoption.
# If the pet is rejecting the adoption, the reason for rejection will be determined based on the calculated difference
# and the pet's maximum tolerated difference.
def calculate_difference(animal_profile, compatibility_weights, scores):
    max_difference = 0 # maximum difference found so far
    max_index = 0 # index of the dimension with the maximum difference

    difference_arr = [] # array to store the differences for each personality dimension

    # Loop through each personality dimension and calculate the weighted (each pet has their own weights, depending on 
    # what personality traits that the pet priorotizes) difference between the animal's profile and the user's scores.
    # The weighted difference is calculated for each dimension and stored in the difference_arr. Additionally,
    # the maximum (weighted) difference and its index are tracked to determine the most significant discrepancy.
    for i in range(num_personality_dimensions):
        diff = abs(animal_profile[i] - scores[i]) * compatibility_weights[i]

        if diff > max_difference:
            max_difference = diff
            max_index = i

        difference_arr.append(diff)

    return sum(difference_arr) / max_range, max_index

# Function to generate the final results of the personality assessment and pet compatibility calculations.
# It takes the user's scores and the dealbreaker information for Kevin and Geraldine. It then calculates
# whether each pet will accept or reject the adoption based on their calculated compatibility.
def generate_results(scores, kevin_fail, geraldine_fail):
    results = ApplicationResults()

    results.scores = scores

    # Calculating differences for each animal and the max difference accepted for a pet to accept adoption
    max_tolerated_differences = [Animals[i]["Max_Difference"] for i in range(len(Animals))]
    result = [calculate_difference(Animals[i]["Personality_Profile"], Animals[i]["Compatibility_Weights"], scores) for i in range(len(Animals))]

    difference_arr = [result[i][0] for i in range(len(result))] # array of calculated differences for each animal for the user's scores
    max_diff_indices = [result[i][1] for i in range(len(result))] # indices of the maximum difference for each animal (will be used to generate reasons for rejection)

    for i in range(len(Animals)):
        # If the calculated difference is within the pet's maximum tolerated difference, the pet will accept the adoption.
        if difference_arr[i] <= max_tolerated_differences[i]:
            match Animals[i]["Name"]:
                case "Kevin":
                    # Kevin's acceptance is dependent on not only the calculated difference but also on whether he has specific complaints about the user's respect for potatoes.
                    results.kevin_result = False if kevin_fail[0] else True
                    results.kevin_reason = kevin_fail[1] if kevin_fail[0] else "Kevin has determined that you respect potatoes an acceptable amount."
                case "Geraldine":
                    # Geraldine's acceptance is dependent on not only the calculated difference but also on whether she has specific complaints about the user's fabulousness.
                    results.geraldine_result = False if geraldine_fail[0] else True
                    results.geraldine_reason = geraldine_fail[1] if geraldine_fail[0] else "Geraldine has decided that you are sufficiently fabulous. You may proceed."
                case "Biscuit":
                    results.biscuit_result = True
                    results.biscuit_reason = "Biscuit has determined that you are unlikely to interfere with productivity."
                case "Greg":
                    results.greg_result = True
                    results.greg_reason = "Greg approves. He would tell you himself, but that would require moving."
                case "Momo":
                    results.momo_result = True
                    results.momo_reason = "You seem like you would make questionable decisions with Momo."
                case "Pickle":
                    results.pickle_result = True
                    results.pickle_reason = "Pickle has reviewed your results. He has decided you seem survivable."
        # If none of the animals have been processed yet, it means the user's scores did not meet the animal's requirements.
        else:
            match Animals[i]["Name"]:
                case "Kevin":
                    results.kevin_result = False

                    # Kevin's rejection is based on either a specific dealbreaker or the maximum difference in personality traits.
                    if kevin_fail[0] is True:
                        results.kevin_reason = kevin_fail[1]
                    else:
                        # If there is no specific dealbreaker, the rejection is based on the maximum difference in personality traits.
                        match max_diff_indices[i]:
                            case 0:
                                results.kevin_reason = "Your sociability is too different from Kevin's. Kevin requires proper company."
                            case 1:
                                results.kevin_reason = "Your persistence is too different from Kevin's. Kevin is a potato of principles."
                            case 2:
                                results.kevin_reason = "Your patience is too different from Kevin's. Unfortunately, potatoes have high standards."
                            case 3:
                                results.kevin_reason = "Your spontaneity is too different from Kevin's. He prefers to avoid potato-related complications."
                case "Geraldine":
                    # Like Kevin, Geraldine's rejection is based on either a specific dealbreaker or the maximum difference in personality traits.
                    results.geraldine_result = False
                    if geraldine_fail[0] is True:
                        results.geraldine_reason = geraldine_fail[1]
                    else:
                        match max_diff_indices[i]:
                            case 0:
                                results.geraldine_reason = "Your sociability is too different from Geraldine's. She requires an appropriate audience."
                            case 1:
                                results.geraldine_reason = "Your persistence differs from Geraldine's. Looking fabulous is a non-negotiable."
                            case 2:
                                results.geraldine_reason = "Your patience differs from Geraldine's. She cannot spend an eternity waiting to be admired."
                            case 3:
                                results.geraldine_reason = "Your spontaneity differs from Geraldine's. Even surprises must match her wardrobe."
                case "Biscuit":
                    # Unlike Kevin and Geraldine, Biscuit's (and all other pets) rejection is solely based on the maximum difference in personality traits.
                    results.biscuit_result = False
                    match max_diff_indices[i]:
                        case 0:
                            results.biscuit_reason = "Your sociability is too different from Biscuit's. He has scheduled a meeting to discuss the discrepancy."
                        case 1:
                            results.biscuit_reason = "Your persistence is too different from Biscuit's. The numbers are not adding up."
                        case 2:
                            results.biscuit_reason = "Your patience is too different from Biscuit's. He has reviewed the data and is concerned."
                        case 3:
                            results.biscuit_reason = "Your spontaneity differs from Biscuit's. He schedules his surprises at least two weeks in advance."
                case "Greg":
                    results.greg_result = False
                    match max_diff_indices[i]:
                        case 0:
                            results.greg_reason = "Your sociability differs from Greg's. He prefers to ease into friendships over several business days."
                        case 1:
                            results.greg_reason = "Your persistence is too different from Greg’s. He’s in no particular hurry."
                        case 2:
                            results.greg_reason = "Your patience is too different from Greg's. He is alarmed by your speed."
                        case 3:
                            results.greg_reason = "Your spontaneity is too different from Greg's. He prefers his plans to have plenty of time to happen."
                case "Momo":
                    results.momo_result = False
                    match max_diff_indices[i]:
                        case 0:
                            results.momo_reason = "Your sociability is too different from Momo's. Momo wants to meet everyone. And their frogs."
                        case 1:
                            results.momo_reason = "Your persistence is too different from Momo's. Momo got distracted halfway through trying."
                        case 2:
                            results.momo_reason = "Your patience is too different from Momo's. Momo does not know what patience is yet."
                        case 3:
                            results.momo_reason = "Your spontaneity is too different from Momo's. Momo saw a puddle and forgot there was a plan."
                case "Pickle":
                    results.pickle_result = False
                    match max_diff_indices[i]:
                        case 0:
                            results.pickle_reason = "Your sociability is too different from Pickle's. Pickle would prefer to meet you from a safe distance."
                        case 1:
                            results.pickle_reason = "Your persistence is too different from Pickle's. He usually stops when things become frightening."
                        case 2:
                            results.pickle_reason = "Your patience differs from Pickle's. Pickle needs five business days to feel comfortable."
                        case 3:
                            results.pickle_reason = "Your spontaneity differs from Pickle's. He needs a warning for literally everything."

    return results

# adds the personality scores for a given question and answer to the current scores and
# returns the updated scores as a list
def add_scores(scores, question, answer):
    return [scores[i] + question_personality_stats[question][answer][i] for i in range(num_personality_dimensions)]

# The function below calculates user's personality vector based on their answers to the applicaiton
# and returns that vector as a list of scores, along with the dealbreaker question results to 
# Kevin and Geraldine.
def evaluate_compatibility(application: UserApplication):
    # User's scores for each category: [&S, &P, *P, *S]
    scores = [0, 0, 0, 0]
    max_possible_scores = [9, 7, 7, 10]
    kevin_fail = (False, "")
    geraldine_fail = (False, "")

    # Go by question by question for the user's answers and update the scores accordingly
    for i in range(1, num_questions + 1):
            question = f"q{i}"

            scores = add_scores(scores, question, getattr(application, question))

            # Check for dealbreaker questions and update Kevin and Geraldine's fail status accordingly
            match question:
                case "q7":
                   match application.q7:
                        case "b":
                            kevin_fail = (True, 'You said potatoes are “fine.” Kevin is taking this personally.')
                        case "c":
                            kevin_fail = (True, 'You do not care for potatoes. Kevin does not accept this level of disrespect.')
                        case "d":
                            kevin_fail = (True, 'You dislike potatoes. Kevin has asked you to leave his premises immediately.')
                case "q8":
                    if (application.q8 == "d"):
                        geraldine_fail = (True, 'Socks with sandals? Geraldine is disappointed. She expected better.')

    # Normalizing scores on a scale of 0 to 5
    for i in range(num_personality_dimensions):
        scores[i] = (float) (scores[i] / max_possible_scores[i]) * max_range
        scores[i] = round(scores[i], 2)

    return generate_results(scores, kevin_fail, geraldine_fail)