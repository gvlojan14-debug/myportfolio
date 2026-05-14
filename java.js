/*chatbot*/
document.addEventListener("DOMContentLoaded",() => {
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    const botResponses = {
        hello: "Hello! How can I help you today?",
        hi: "Hi there! How can I assist you?",
        "how are you": "I'm doing well, thank you! How about you?",
        "what can you do": "I can answer simple questions and have basic conversations.",
        bye: "Goodbye! Have a great day!",
        default: "I'm not sure I understand. Could you try asking something else?",
    };

    function addMessage(message, isUser = false){
        const messageDiv =  document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.classList.add(isUser ? "user-message" : "bot-message");

        const messageText = document.createElement("p");
        messageText.textContent = message;
        messageDiv.appendChild(messageText);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userMessage){
        const lowerMessage = userMessage.toLowerCase();

        for(const [key, value] of Object.entries(botResponses)){
            if(lowerMessage.includes(key)){
                return value;
            }
        }
        return botResponses.default;
    }

    function sendMessage(){
        const message = userInput.value.trim();
        if(message){
            addMessage(message, true);
            userInput.value = "";

            setTimeout(() => {
                const botResponses = getBotResponse(message);
                addMessage(botResponses);
            },500);
        }
    }

    sendButton?.addEventListener("click", sendMessage);

    userInput.addEventListener("keypress", (e) => {
        if(e.key === "Enter"){
            sendMessage();
        }
    });
});

/*chat toggle*/
const chatIcon = document.querySelector('.chat-icon');
const chatContainer = document.querySelector('.chat-container');
const chatOverlay = document.querySelector('.chat-overlay');
const chatClose = document.querySelector('.chat-close');

chatIcon.addEventListener('click', (e) => {
    e.preventDefault();
    chatContainer.classList.toggle('show');
    chatOverlay.classList.toggle('show');
});

chatOverlay.addEventListener('click', () => {
    chatContainer.classList.remove('show');
    chatOverlay.classList.remove('show');
});

chatClose.addEventListener('click', () => {
    chatContainer.classList.remove('show');
    chatOverlay.classList.remove('show');
});

/* mood toggle */
const moodIcon = document.querySelector('img[src="mood.png"]') || document.querySelector('.mood-icon');
const modeImageMap = {
    'app.png': 'appb.png',
    'bar.png': 'barb.png',
    'chat.png': 'chatb.png',
    'code.png': 'codeb.png',
    'crop.png': 'cropb.png',
    'envelope.png': 'envelopeb.png',
    'facebook.png': 'facebookb.png',
    'instagram.png': 'instagramb.png',
    'link.png': 'linkb.png',
    'linkedin.png': 'linkedinb.png',
    'location.png': 'locationb.png',
    'mark.png': 'markb.png',
    'password.png': 'passwordb.png',
    'phone.png': 'phoneb.png',
    'search.png': 'searchb.png',
    'top.png': 'topb.png',
    'username.png': 'usernameb.png',
    'x.png': 'xb.png',
    'mood.png': 'moodb.png'
};
const lightToDarkMap = Object.fromEntries(Object.entries(modeImageMap).map(([dark, light]) => [light, dark]));

function updateModeImages(isLightMode) {
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (!src) return;
        const filename = src.split('/').pop().toLowerCase();
        if (isLightMode && modeImageMap[filename]) {
            img.src = `${modeImageMap[filename]}`;
        } else if (!isLightMode && lightToDarkMap[filename]) {
            img.src = `${lightToDarkMap[filename]}`;
        }
    });
}

if (moodIcon) {
    moodIcon.style.cursor = 'pointer';
    moodIcon.addEventListener('click', () => {
        const isLightMode = document.body.classList.toggle('light-mode');
        updateModeImages(isLightMode);
    });
}

/*head*/
const nav = document.querySelector("nav");
window.addEventListener ("scroll", function(){
    nav.classList.toggle("sticky", window.scrollY >100);
});


/*login*/ 
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const loginOverlay = document.querySelector('.login-overlay');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
    loginOverlay.classList.add('show');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
    loginOverlay.classList.remove('show');
});

loginOverlay.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    loginOverlay.classList.remove('show');
});




//search
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const mainContent = document.querySelector('main') || document.body;

function clearHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(span => {
        const parent = span.parentNode;
        if (parent) {
            const textNode = document.createTextNode(span.textContent);
            parent.replaceChild(textNode, span);
            parent.normalize();
        }
    });
}

function performSearch() {
    const query = searchInput.value.trim(); 
    clearHighlights();

    if (query === '') return;

    const walk = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, null, false);
    let node;
    const nodesToProcess = [];

    while (node = walk.nextNode()) nodesToProcess.push(node);

    let foundMatch = false;
    let matchCount = 0;
    const regex = new RegExp(`(${query})`, 'gi');

    nodesToProcess.forEach(textNode => {
        if (textNode.parentNode && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(textNode.parentNode.nodeName)) {
            if (regex.test(textNode.nodeValue)) {
                const fragment = document.createDocumentFragment();
                const parts = textNode.nodeValue.split(regex);

                parts.forEach(part => {
                    if (part.toLowerCase() === query.toLowerCase()) {
                        const span = document.createElement('span');
                        span.className = 'highlight';
                        span.textContent = part;
                        fragment.appendChild(span);
                        foundMatch = true;
                        matchCount += 1;
                    } else if (part) {
                        fragment.appendChild(document.createTextNode(part));
                    }
                });
                textNode.parentNode.replaceChild(fragment, textNode);
            }
        }
    });

if(foundMatch) {
    const firstMatch = document.querySelector('.highlight');
    if (firstMatch) {
        alert(`Found ${matchCount} result${matchCount === 1 ? '' : 's'} for “${query}”`);
        const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;
        const rect = firstMatch.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({
            top: rect.top + scrollTop - navbarHeight - 20, 
            behavior: 'smooth'
        });
    }
} else {
    alert(`No results found for “${query}”`);
    searchInput.value = '';
}
}

if (searchBtn && searchInput) { 
    searchBtn.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
             e.preventDefault(); 
             performSearch();
        }
    });
    
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            clearHighlights();
        } 
    });
}

/* Smooth scrolling with offset for navigation links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        let target = document.querySelector(href);
        if (!target && href && href.startsWith('#')) {
            const id = href.slice(1).toLowerCase();
            target = Array.from(document.querySelectorAll('[id]'))
                .find(el => el.id.toLowerCase() === id);
        }

        if (target) {
            const offset = 93;
            const rect = target.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const offsetPosition = Math.max(0, rect.top + scrollTop - offset);

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

