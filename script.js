// making whole html file in JS so appending is a major task 
// second todo task is to link the api and direct it to the box 
// third is to link the question to the box and linnk the answer 
// fourth is to give a valid score checker and then to add the diffciulty level 


const game = document.querySelector('#game');
const score = document.querySelector('#score');

const anime = 31;
const levels = ['easy' , 'medium' , 'hard'] 

function addGenre() {
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


       fetch(`https://opentdb.com/api.php?amount=1&category=31&difficulty={level}&type=boolean`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            //    // card.setAttribute('data-question' , data.results[0].question)
            //     cards.setAttribute('data-answer' ,data.results[0].correct_answer)
            //     card.setAttribute('data-value', card.getInnerHTML())
            })
   })
}
addGenre()