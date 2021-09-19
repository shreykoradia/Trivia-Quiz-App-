// making whole html file in JS so appending is a major task 
// second todo task is to link the api and direct it to the box 
// third is to link the question to the box and linnk the answer 
// fourth is to give a valid score checker and then to add the diffciulty level 


const game = document.querySelector('#game');
const score = document.querySelector('#score');

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
        
            card.addEventListener('click' , flipCard)
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
    falseButton.addEventListener('click' , getResult)
    textDisplay.innerHTML = this.getAttribute('data-question')
    this.append(textDisplay , trueButton , falseButton);

    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => removeEventListener('click' , flipCard))
}
