// making whole html file in JS so appending is a major task 
// second todo task is to link the api and direct it to the box 
// third is to link the question to the box and linnk the answer 
// fourth is to give a valid score checker and then to add the diffciulty level 


const game = document.querySelector('#game');
const scoreDisplay = document.querySelector('#score');
let score = 0;

const genres = [
    {   
        name : 'Anime' ,
        id : 31
    },

    {
        name : 'Computers' ,
        id : 18

    },

    {
        name : 'Mathematics',
        id: 19
    } ,
    {
        name: 'Video Games' ,
        id : 15
    }
]

const levels = ['easy' , 'medium' , 'hard'] 

function addGenre(genre) {
   const column = document.createElement('div');
   column.classList.add('genre-column');
   column.innerHTML = genre.name
   game.append(column)
    
   levels.forEach(level =>{
       const card = document.createElement('div');
       card.classList.add('card');
       column.append(card)

        if (level === 'easy'){
            card.innerHTML = 100 ;
        }
        if (level === 'medium'){
            card.innerHTML = 200 ;
        }
        if (level === 'hard'){
            card.innerHTML = 300 ;
        }


       fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                card.setAttribute('data-question' , data.results[0].question)
                card.setAttribute('data-answer' ,data.results[0].correct_answer)
                card.setAttribute('data-value', card.getInnerHTML())
            })
            .then(done =>card.addEventListener('click' , flipCard))
        
            
   })
}
genres.forEach(genre => addGenre(genre))

function flipCard(){
    console.log('clicked')
    const textDisplay = document.createElement('div');
    const trueButton = document.createElement('button');
    const falseButton = document.createElement('button');
    trueButton.innerHTML = 'True' ;
    falseButton.innerHTML = 'False';
    trueButton.addEventListener('click' , getResult)
    trueButton.classList.add('true-button');
    falseButton.addEventListener('click' , getResult)
    falseButton.classList.add('false-button');
    textDisplay.innerHTML = this.getAttribute('data-question')
    this.append(textDisplay , trueButton , falseButton);

    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.removeEventListener('click' , flipCard))
}

function getResult(){
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card=>card.addEventListener('click', flipCard)) 

    const cardOfButton  = this.parentElement
    if(cardOfButton.getAttribute('data-answer')=== this.innerHTML){
        score = score + parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score;
        cardOfButton.classList.add('correct-answer')
        setTimeout(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        },200)
   } else{
         cardOfButton.classList.add('wrong-anwer')
         setTimeout(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0;
        },200)

    }
    cardOfButton.removeEventListener('click' ,  flipCard)
}
