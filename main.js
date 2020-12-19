const myTopics = document.querySelector("#myTopics");
const practiceTopicList = document.querySelector("#practiceTopicList");
const topicInput = document.querySelector("#topicInput");



// let practiceTopics = ["Scales", "Ear-training", "New repertoire", "Repertoire review"];
let practiceTopics = [];

window.onload = () => {
    document.querySelector('#topicInput').focus();

    // // Check if localStorage is available (IE8+) and make sure that the visited flag is not already set.
    if(typeof window.localStorage !== "undefined" && !localStorage.getItem('visited')) {
         // Set visited flag in local storage
        localStorage.setItem('visited', true);
        practiceTopics = [];
        practiceTopics.push("Scales", "Ear-training", "New repertoire", "Repertoire review");
        storeInLocalStorage();
         // Alert the user
        alert("Hello my friend. This is your first visit.");   
    } else if (practiceTopics == undefined) {
        practiceTopics = []
        console.log(practiceTopics)
    } else {
        practiceTopics = JSON.parse(localStorage.getItem("practiceTopics"));
        console.log(practiceTopics)
    }

    displayTopics();
}


// let tasks;
//     if (localStorage.getItem('tasks') === null) {
//         tasks = [];
//     } else {
//         tasks = JSON.parse(localStorage.getItem('tasks'));
//     }

// const storeInLocalStorage = (topic) => {
//     // if (localStorage.getItem('practiceTopics') === null) {
//     //     practiceTopics = [];
//     // } else {
//     //     practiceTopics = JSON.parse(localStorage.getItem('practiceTopics'));
//     // }
//     practiceTopics = JSON.parse(localStorage.getItem("practiceTopics"));

//     practiceTopics.push(topic);

//     localStorage.setItem("practiceTopics", JSON.stringify(practiceTopics));
// }

const addTopic = () => {

    // if (practiceTopics.length === 0){
    //     myTopics.style.display = "flex";
    // }

    let topicInput = document.querySelector("#topicInput").value;
    topicInput == "" ? alert("Add a topic") : practiceTopics.unshift(topicInput);
    practiceTopicList.innerHTML = "";
    document.querySelector("#topicInput").value = "";
    document.querySelector('#topicInput').focus();
    displayTopics();
}

const removeTopic = (e) => {
    if (confirm('Are You Sure?')) {
        practiceTopics.forEach((task, index) => {
            practiceTopicList.innerHTML = "";
            if (e.target.parentElement.textContent === task) {
                practiceTopics.splice(index, 1);
            }
        displayTopics();
        });
    }
    if (practiceTopics.length === 0){
        document.querySelector("#myTopics").style.display = "none";
    }
}

const displayTopics = () => {
    localStorage.setItem("practiceTopics", JSON.stringify(practiceTopics));
    
    practiceTopics.forEach((input) => {
        const topicDisplay = document.createElement("li");
            topicDisplay.innerHTML = input;
        const button = document.createElement("i");
            button.classList = "fas fa-trash";
            button.addEventListener("click", removeTopic);
        
        topicDisplay.appendChild(button);
        
        practiceTopicList.appendChild(topicDisplay)
    })
    // if (practiceTopics.length === 0){
    //     document.querySelector("#myTopics").style.display = "none";
    // }
    

}
// displayTopics();


const generateRandomTopic = () => {
    const display = document.querySelector("#generateTopic");

    if (practiceTopics.length === 0){
        display.innerHTML = "Please enter a topic...";
    } else {

        const random = practiceTopics[Math.floor(Math.random() * practiceTopics.length)]
    
    
        if(display.textContent === random){
            generateRandomTopic()
        } else {
            display.innerHTML = random;
        }
    }
}

const clearList = () => {

    if (confirm('Are You Sure?')) {
        practiceTopics.length = 0;
        document.querySelector("#practiceTopicList").innerHTML = "";
    
        //remove from LS
        // removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

    if (practiceTopics.length === 0){
        document.querySelector("#myTopics").style.display = "none";
    }

}


//TODO:


//IDEAS:

// eventually add generate practice topics by level

//hover over trashcan for delete

//Help feature describing the functionality

//Local storage