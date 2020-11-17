let shuffledArray = [];
let cardNum = -1;
let restarted = false;

// Fisher-Yates shuffle
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[ array[i], array[j] ] = [ array[j], array[i] ];
	}
	shuffledArray = array;
	return shuffledArray;
}

function getCard() {
	if (cardNum >= shuffledArray.length-1) {
        cardNum = -1;
        restarted = true;
    }
    cardNum++;
	let setCard = shuffledArray[cardNum];
	console.log(cardNum);
	displayCard(setCard);
	
}

function getPrevCard() {
	if (cardNum > 0) {
        cardNum--;
        let setCard = shuffledArray[cardNum];
        console.log(cardNum);
        displayCard(setCard);
	} else if(restarted == true){
        cardNum = shuffledArray.length - 1;
        let setCard = shuffledArray[cardNum];
        console.log(cardNum);
        displayCard(setCard);
    }
    
    
	
	
}

function displayCard(card) {
	$('#cardSection').replaceWith(
		`<div id="cardSection">
            <p>${card.question}</p>
        </div>`
	);
}

function displayAnswer(card) {
	$('#cardSection').replaceWith(
        `<div id="cardSection">
           <p> ${card.question} </p>
           <p> ${card.answer}   </p>
        </div>`
	);
}

// Events for all of the buttons
function buttons() {
	$('#cardForm').on('click', '#newGame', function() {
		event.preventDefault();
		getCard();
		if (!$('#rules').hasClass('hidden')) {
			$('#rules').addClass('hidden');
		}
		$('#newGame').addClass('hidden');
        $('#newCard').removeClass('hidden');
        $('#prevCard').removeClass('hidden');
        $('#btnRules').removeClass('hidden');
        $('#answerBtn').removeClass('hidden');
	});

	$('#cardForm').on('click', '#newCard', function() {
		event.preventDefault();
		getCard();
    });
    
    $('#cardForm').on('click', '#prevCard', function() {
		event.preventDefault();
		getPrevCard();
    });
    
    $('#cardForm').on('click', '#answerBtn', function() {
        event.preventDefault();
        let setCard = shuffledArray[cardNum];
		displayAnswer(setCard);
	});

	$('#cardForm').on('click', '#btnRules', function() {
		event.preventDefault();
		$('#rules').toggleClass('hidden');
	});
}

// Items to run in the beginning of the page load
$(function() {
	buttons();
	shuffle(STORE);
});
