// Quotes Data
const quotes = [
    {
        quote: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier",
        published: "1926 (The Secret of the Ages)"
    },
    {
        quote: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
        published: "Around 500 BC (The Analects)"
    },
    {
        quote: "The future depends on what you do today.",
        author: "Mahatma Gandhi",
        published: "Early 20th Century"
    },
    {
        quote: "Education is the most powerful weapon which you can use to change the world.",
        author: "Nelson Mandela",
        published: "2003"
    },
    {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        published: "1899"
    },
    {
        quote:"Learning becomes easier when you practice daily.",
        author:"My Learning Note",
        published:"2026"

    },
    {
        quote: "Opportunities don't happen. You create them.",
        author: "Chris Grosser",
        published: "Modern Quote"
    },
    {
        quote: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson",
        published: "1973"
    }
];


const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const published = document.getElementById("published");

const newQuoteBtn = document.getElementById("newQuoteBtn");
const copyBtn = document.getElementById("copyBtn");
const tweetBtn = document.getElementById("tweetBtn");
const favouriteBtn = document.getElementById("favBtn");

const copiedMsg = document.getElementById("copiedMsg");
const favouriteList = document.getElementById("favList");



let lastQuotes = [];
let currentQuote = quotes[0];
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];


function displayQuote(item) {

    quoteText.classList.add("fade");
    authorText.classList.add("fade");
    published.classList.add("fade");

    setTimeout(function () {

        quoteText.textContent = `"${item.quote}"`;
        authorText.textContent = "- " + item.author;
        published.textContent = "- " + item.published;

        quoteText.classList.remove("fade");
        authorText.classList.remove("fade");
        published.classList.remove("fade");

    }, 300);

    currentQuote = item;

    updateFavouriteButton();
}


function getRandomQuote() {

    let randomIndex;
    let selectedQuote;

    do {

        randomIndex = Math.floor(Math.random() * quotes.length);
        selectedQuote = quotes[randomIndex];

    } while (lastQuotes.includes(selectedQuote.quote));

    lastQuotes.push(selectedQuote.quote);

    if (lastQuotes.length > 2) {
        lastQuotes.shift();
    }

    displayQuote(selectedQuote);
}

copyBtn.addEventListener("click", () => {

    let text = `"${currentQuote.quote}" - ${currentQuote.author}`;

    navigator.clipboard.writeText(text);

    copiedMsg.style.display = "inline";

    setTimeout(function () {

        copiedMsg.style.display = "none";

    }, 2000);

});

tweetBtn.addEventListener("click", () => {

    let tweetText =
        `"${currentQuote.quote}" - ${currentQuote.author}`;

    let url =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(tweetText);

    window.open(url, "_blank");

});

favouriteBtn.addEventListener("click", () => {

    let index = favourites.findIndex(function (item) {

        return item.quote === currentQuote.quote;

    });

    if (index === -1) {

        favourites.push(currentQuote);

    } else {

        favourites.splice(index, 1);

    }

function saveFavourites(){

    localStorage.setItem(
        "favourites",
        JSON.stringify(favourites)
    );

}
    saveFavourites();
    showFavourites();

    updateFavouriteButton();

});

function showFavourites() {

    favouriteList.innerHTML = "";

    favourites.forEach(function (item) {

        let li = document.createElement("li");

        li.innerHTML =
            `<strong>"${item.quote}"</strong><br>
             <em>- ${item.author}</em><br>
             <em>- ${item.published}</em>`;

        favouriteList.appendChild(li);

    });

}

function updateFavouriteButton() {

    let exists = favourites.some(function (item) {

        return item.quote === currentQuote.quote;

    });

    if (exists) {

        favouriteBtn.textContent = "❤️ Favourite";

    } else {

        favouriteBtn.textContent = "🤍 Favourite";

    }

}

newQuoteBtn.addEventListener("click", getRandomQuote);

displayQuote(currentQuote);

showFavourites();