function showView(viewId) {
document.querySelectorAll(".view").forEach(view => {
view.classList.remove("active");
});

const page = document.getElementById(viewId);  

if (page) {  
    page.classList.add("active");  
    window.scrollTo(0, 0);  
}  

closeMobileMenu();

}

/* 2. MOBILE MENU */

function closeMobileMenu() {
const navigation = document.getElementById("navigation");
const menuButton = document.querySelector(".menu-button");

if (navigation) {  
    navigation.classList.remove("menu-open");  
}  

if (menuButton) {  
    menuButton.innerHTML = "☰";  
    menuButton.setAttribute("aria-expanded", "false");  
    menuButton.setAttribute("aria-label", "Open navigation menu");  
}

}

function toggleMenu() {
const navigation = document.getElementById("navigation");
const menuButton = document.querySelector(".menu-button");

if (!navigation) return;  

const isOpen = navigation.classList.toggle("menu-open");  

if (menuButton) {  
    menuButton.innerHTML = isOpen ? "✕" : "☰";  
    menuButton.setAttribute("aria-expanded", String(isOpen));  
    menuButton.setAttribute(  
        "aria-label",  
        isOpen ? "Close navigation menu" : "Open navigation menu"  
    );  
}

}

/* =====================================
3. STACKED POP-UP SYSTEM
===================================== */

// Stores all currently open pop-ups
let popupStack = [];

function createPopup(contentElement = null) {

const overlay = document.createElement("div");  

overlay.className = "modal-overlay";  
overlay.id = "activePopup";  

// Put the newest pop-up above the previous one  
overlay.style.zIndex = 9999 + popupStack.length;  

const panel = document.createElement("div");  
panel.className = "modal-panel";  

// Close button  
const closeButton = document.createElement("button");  

closeButton.type = "button";  
closeButton.className = "modal-close";  
closeButton.innerHTML = "&times;";  
closeButton.setAttribute("aria-label", "Close");  

closeButton.addEventListener("click", function(event) {  
    event.preventDefault();  
    event.stopPropagation();  
    closePopup();  
});  

panel.appendChild(closeButton);  

let placeholder = null;  
let wasHidden = false;  

// Move existing HTML content into the pop-up  
if (contentElement) {  

    if (!contentElement.parentNode) {  
        console.error("Popup content has no parent.");  
        return null;  
    }  

    placeholder = document.createComment("original position");  

    contentElement.parentNode.insertBefore(  
        placeholder,  
        contentElement  
    );  

    wasHidden = contentElement.hidden;  

    contentElement.hidden = false;  

    panel.appendChild(contentElement);  
}  

overlay.appendChild(panel);  
document.body.appendChild(overlay);  

// Save this pop-up in the stack  
const popup = {  
    overlay: overlay,  
    contentElement: contentElement,  
    placeholder: placeholder,  
    wasHidden: wasHidden  
};  

popupStack.push(popup);  

// Close only when clicking the background  
overlay.addEventListener("click", function(event) {  
    if (event.target === overlay) {  
        closePopup();  
    }  
});  

document.body.classList.add("modal-open");  

requestAnimationFrame(() => {  
    overlay.classList.add("visible");  
});  

return panel;

}

/* CLOSE ONLY THE MOST RECENT POP-UP */

function closePopup() {

if (popupStack.length === 0) return;  

// Get only the topmost pop-up  
const popup = popupStack.pop();  

// Restore its original HTML content  
if (  
    popup.contentElement &&  
    popup.placeholder &&  
    popup.placeholder.parentNode  
) {  

    popup.placeholder.parentNode.insertBefore(  
        popup.contentElement,  
        popup.placeholder  
    );  

    popup.contentElement.hidden = popup.wasHidden;  

    popup.placeholder.remove();  
}  

// Remove only the topmost overlay  
popup.overlay.remove();  

// Keep the previous pop-up visible  
if (popupStack.length === 0) {  
    document.body.classList.remove("modal-open");  
}

}

/* CLOSE TOPMOST POP-UP USING ESCAPE */

document.addEventListener("keydown", function(event) {

if (event.key === "Escape") {  
    closePopup();  
}

});

function openMemory(card) {
    document.querySelectorAll(".memory-card").forEach(item => {
        if (item !== card) {
            item.classList.remove("active");
        }
    });

    card.classList.toggle("active");
}

/* =====================================
4. PERSONAL MESSAGE POP-UPS
===================================== */

function showMessagePopup(title, message) {

const panel = createPopup();  

if (!panel) return;  

const decoration = document.createElement("div");  

decoration.className = "popup-decoration";  
decoration.textContent = "♡  ✿  ♡";  

const heading = document.createElement("h2");  

heading.textContent = title;  

const paragraph = document.createElement("p");  

paragraph.textContent = message;  

panel.appendChild(decoration);  
panel.appendChild(heading);  
panel.appendChild(paragraph);  

burstHearts(12);

}

/* =====================================
5. LOVE LETTER
===================================== */

function openLetter() {

const letter = document.getElementById("letterPaper");  

if (!letter) return;  

createPopup(letter);  

burstHearts(10);

}

/* =====================================
6. FINAL SURPRISE
===================================== */

function revealSurprise() {
    const surprise = document.getElementById("surpriseMessage");

    if (!surprise) return;

    createPopup(surprise);

    burstHearts(25);
}
/* =====================================
   ROSE SURPRISE MUSIC PLAYER
===================================== */

function toggleMusic() {
    const song = document.getElementById("ourSong");
    const button = document.getElementById("musicButton");

    if (!song || !button) {
        alert("Music player not found!");
        return;
    }

    if (song.paused) {
        song.play()
            .then(() => {
                button.textContent = "Ⅱ Pause Music";
            })
            .catch((error) => {
                console.error("Music error:", error);
                alert("Unable to play music. Please try again.");
            });
    } else {
        song.pause();
        button.textContent = "▶ Play Song";
    }
}

/* =====================================
7. SECRET VAULT
===================================== */

function revealSecret() {

const vault = document.getElementById("secretVault");  

if (!vault) return;  

createPopup(vault);  

burstHearts(15);

}

/* =====================================
8. RANDOM LOVE NOTES
===================================== */

const loveNotes = [

"cringe pero ikaw jud akong fav notif, lovee. ♡",  

"kung mawala ka, I would find you in every universe (universe?) jud (buang na ngali ko HAHA).",  

"waraman ngali ko nimo gilumay langga no? djklang mwaaps",  

"fresh eyes, dedicated to jurassic (unsa daw?HAHHA).",  

"I would still choose you, no matter what.",  

"You are one of my favorite reasons to smile. (emeHAHAHAHA)",  

"I hope we never run out of memories to make. (naparabang)",  

"Even the simplest moments are special with you.(kaayo jud)"

];

function showSecretNote() {

const note = loveNotes[  
    Math.floor(Math.random() * loveNotes.length)  
];  

// Opens above the Secret Vault  
showMessagePopup(  
    "A Little Note for You ♡",  
    note  
);

}

/* =====================================
9. RANDOM WISHES
===================================== */

const wishes = [

"unta tagaan ko ni Lord ug powers para mo teleport ara's inyoa HAHAHHA.",  

"may we become stronger through every challenge nga atong ma face",

"May our next monthsaries be even more special. (special child HAHAdjk)",  

"May we keep choosing each other every day. ",


];

function showWish() {

const wish = wishes[  
    Math.floor(Math.random() * wishes.length)  
];  

// Opens above the Secret Vault  
showMessagePopup(  
    "A Wish for Us ♡",  
    wish  
);

}
function unlockCode() {
    const input = document.getElementById("secretCode");
    const codeResult = document.getElementById("codeResult");
    const lockedNote = document.getElementById("lockedNote");

    if (!input || !lockedNote) return;

    const code = input.value.trim();

    if (code !== "08-11-26") {
        showMessagePopup(
            "Oops! Not Yet, Love ♡",
            code === ""
                ? "You need to enter the secret code first po"
                : "That's not the magic code. Try again, mylove. ♡ (if yk, yk:)"
        );
        return;
    }

    if (codeResult) {
        codeResult.textContent = "";
    }

    input.value = "";

    // Show the original message inside an overlay popup
    const panel = createPopup(lockedNote);

    if (!panel) return;

    panel.classList.add("ultimate-reveal");

    requestAnimationFrame(() => {
        panel.classList.add("reveal-active");
    });

    burstHearts(45);
    createConfetti();
}

/* CONFETTI AND PETAL EFFECT */

function createConfetti() {

const overlay = document.querySelector(  
    "#activePopup .modal-panel"  
);  

if (!overlay) return;  

const symbols = ["♥", "♡", "✿", "✦", "❀"];  

for (let i = 0; i < 35; i++) {  

    const piece = document.createElement("span");  

    piece.className = "love-confetti";  

    piece.textContent =  
        symbols[Math.floor(Math.random() * symbols.length)];  

    piece.style.left = Math.random() * 100 + "%";  

    piece.style.animationDelay =  
        Math.random() * 2 + "s";  

    piece.style.animationDuration =  
        (3 + Math.random() * 3) + "s";  

    overlay.appendChild(piece);  

    setTimeout(() => piece.remove(), 7000);  
}

}

/* =====================================
11. FLOWER ANIMATION
===================================== */

function createFlowerSurprise() {

const flower = document.querySelector(  
    "#flowerContainer .flower"  
);  

if (!flower) return;  

flower.classList.remove("blooming");  

void flower.offsetWidth;  

flower.classList.add("blooming");

}

/* =====================================
12. FLOATING HEARTS
===================================== */

function createHeart() {

const container = document.getElementById("floatingHearts");  

if (!container) return;  

const heart = document.createElement("span");  

heart.className = "floating-heart";  

const symbols = ["♥", "♡", "❤", "💕"];  

heart.textContent =  
    symbols[Math.floor(Math.random() * symbols.length)];  

heart.style.left = Math.random() * 100 + "%";  

heart.style.fontSize =  
    (14 + Math.random() * 20) + "px";  

heart.style.animationDuration =  
    (5 + Math.random() * 5) + "s";  

container.appendChild(heart);  

setTimeout(() => {  
    heart.remove();  
}, 10000);

}

function burstHearts(amount = 12) {

for (let i = 0; i < amount; i++) {  

    setTimeout(createHeart, i * 100);  

}

}

/* =====================================
13. CONNECT ALL BUTTONS
===================================== */

document.addEventListener("DOMContentLoaded", function() {

// Start on homepage  
showView("home");  

// Close the mobile menu after any navigation link is selected.  
const navigation = document.getElementById("navigation");  
if (navigation) {  
    navigation.addEventListener("click", function(event) {  
        if (event.target.closest("button")) {  
            closeMobileMenu();  
        }  
    });  
}  

// Open Secret Vault  
const secretTrigger =  
    document.getElementById("secretTrigger");  

if (secretTrigger) {  
    secretTrigger.addEventListener(  
        "click",  
        revealSecret  
    );  
}  


// Generate another love note  
const noteButton =  
    document.getElementById("noteButton");  

if (noteButton) {  
    noteButton.addEventListener(  
        "click",  
        showSecretNote  
    );  
}  


// Generate a wish  
const wishButton =  
    document.getElementById("wishButton");  

if (wishButton) {  
    wishButton.addEventListener(  
        "click",  
        showWish  
    );  
}  


// Unlock secret message  
const unlockButton =  
    document.getElementById("unlockCode");  

if (unlockButton) {  
    unlockButton.addEventListener(  
        "click",  
        unlockCode  
    );  
}  


// Allow Enter key to submit code  
const codeInput =  
    document.getElementById("secretCode");  

if (codeInput) {  

    codeInput.addEventListener("keydown", function(event) {  

        if (event.key === "Enter") {  
            unlockCode();  
        }  

    });  

}  


// Floating hearts  
setInterval(createHeart, 1500);  


console.log(  
    "The Little Universe of Us is ready! ♡"  
);

});
