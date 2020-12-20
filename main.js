const form = document.querySelector('#new-topic');
const topicList = document.querySelector('#practiceTopicList');
const clearBtn = document.querySelector('#clearBtn');
const generateBtn = document.querySelector("#generateBtn");
const topicInput = document.querySelector('#topicInput');
const display = document.querySelector("#generateTopic");
const myTopics = document.querySelector("#myTopics");

window.onload = () => {
    typeof window.localStorage !== "undefined" && !localStorage.getItem('visited') ? localStorage.setItem('visited', true) : displayTopics();
    
    // if(typeof window.localStorage !== "undefined" && !localStorage.getItem('visited')) {
    //     localStorage.setItem('visited', true);
    // } else {
    //     displayTopics();
    // }
    
    // let topics ;

    if (localStorage.getItem('topics') === null) {
        let topics = ["Scales", "Ear-training", "New repertoire", "Repertoire review"];
        localStorage.setItem('topics', JSON.stringify(topics));
        displayTopics();
    } else {
        let topics = JSON.parse(localStorage.getItem('topics'));
        displayTopics();
        topics.length === 0 || topics === undefined ? myTopics.style.display = "none" : myTopics.style.display = "flex";
    }
    document.querySelector('#topicInput').focus();
    loadEventListeners();
}

clearOut = (item) => {
    item.innerHTML = "";
}

const displayTopics = () => {
    clearOut(topicList);
    let topics;

    // if (localStorage.getItem('topics') === null) {
    //     topics = [];
    // } else {
    //     topics = JSON.parse(localStorage.getItem('topics'));
    // }
    localStorage.getItem('topics') === null ? topics = [] : topics = JSON.parse(localStorage.getItem('topics'));

    topics.forEach(topic => {
        const li = document.createElement('li');
            li.innerHTML = topic;
        const button = document.createElement("i");
            button.classList = "fas fa-trash";
            button.addEventListener("click", removeTopic);
        li.appendChild(button);
        topicList.appendChild(li);
    });
}

const addTopic = (e) => {
    const regex = /.*\S+.*/
    if (topicInput.value.match(regex)) {
        let topics;
        localStorage.getItem('topics') === null ? topics = [] : topics = JSON.parse(localStorage.getItem('topics'));
        topics.length >= 0 ? myTopics.style.display = "flex" : myTopics.style.display = "none";    
        storeTopicInLocalStorage(topicInput.value);
        displayTopics();
        topicInput.value = '';
        // e.preventDefault();
    } else {
        alert("Please add a topic");
    }
}

const storeTopicInLocalStorage = (topic) => {
    let topics;
    localStorage.getItem('topics') === null ? topics = [] : topics = JSON.parse(localStorage.getItem('topics'));
    topics.push(topic);
    localStorage.setItem('topics', JSON.stringify(topics));
}

const removeTopic = (e) => {
    let topics;
    if (localStorage.getItem('topics') === null) {
        topics = [];
    } else {
        topics = JSON.parse(localStorage.getItem('topics'));
    }
    
    if (confirm('Are You Sure?')) {
        topics.forEach((topic, index) => {
            // console.log(index, e.target.parentElement.textContent, topic)
            if (e.target.parentElement.textContent === topic) {
                topics.splice(index, 1);
                removeTopicFromLocalStorage(e.target.parentElement);
            }
        });
        displayTopics();
    }
    topics.length === 0 ? myTopics.style.display = "none" : myTopics.style.display = "flex";
}


//remove from ls

const removeTopicFromLocalStorage = (topicItem) => {
    let topics;
    localStorage.getItem('topics') === null ? topics = [] : topics = JSON.parse(localStorage.getItem('topics'));

    topics.forEach(function (topic, index) {
        if (topicItem.textContent === topic) {
            topics.splice(index, 1);
        }
    });

    localStorage.setItem('topics', JSON.stringify(topics));
}

//Clear topics
const clearTopics = () => {
    let topics;
    // if (localStorage.getItem('topics') === null) {
    //     topics = [];
    // } else {
    //     topics = JSON.parse(localStorage.getItem('topics'));
    // }

    localStorage.getItem('topics') === null ? topics = [] : topics = JSON.parse(localStorage.getItem('topics'));


    if (confirm('Are You Sure?')) {
        topics.length = 0;
        localStorage.setItem('topics', JSON.stringify(topics));
        displayTopics();
    }

    topics.length === 0 ? myTopics.style.display = "none" : myTopics.style.display = "flex";


}


//Filter Topics
// function filterTopics(e) {
//     const text = e.target.value.toLowerCase();

//     document.querySelectorAll('.collection-item').forEach
//         (function (topic) {
//             const item = topic.firstChild.textContent;
//             if (item.toLowerCase().indexOf(text) != -1) {
//                 topic.style.display = 'block';
//             } else {
//                 topic.style.display = 'none';
//             }
//         });
// }

const generateRandomTopic = () => {
    let topics;
    // if (localStorage.getItem('topics') === null) {
    //     topics = [];
    // } else {
    //     topics = JSON.parse(localStorage.getItem('topics'));
    // }

    localStorage.getItem('topics') === null ? topics = [] : topics = JSON.parse(localStorage.getItem('topics'));

    if (topics.length === 0){
        display.innerHTML = "Please enter a topic...";
    } else {
        const random = topics[Math.floor(Math.random() * topics.length)]
        
        // if(display.textContent === random){
        //     generateRandomTopic()
        // } else {
        //     display.innerHTML = random;
        // }
        display.textContent === random ? generateRandomTopic() : display.innerHTML = random;
        // }
    }
}

const loadEventListeners = () => {
    form.addEventListener('submit', addTopic);
    clearBtn.addEventListener('click', clearTopics);
    generateBtn.addEventListener('click', generateRandomTopic);
}

// loadEventListeners();