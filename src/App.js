
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './component/SingleCard';

const cardImages = [
  {"src": "/img/helmet-1.png", matched:false},
  {"src": "/img/potion-1.png", matched:false},
  {"src": "/img/ring-1.png", matched:false},
  {"src": "/img/scroll-1.png", matched:false},
  {"src": "/img/shield-1.png", matched:false},
  {"src": "/img/sword-1.png", matched:false}
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState()
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState (false)


//suffle card
  const suffleCard = () => {
    const suffledCards = [...cardImages, ...cardImages]
      .sort(()=> Math.random() - 0.5)
      .map((card)=> ({...card, id: Math.random()}))
      console.log(suffledCards)

    setCards(suffledCards)
    setTurns(0)
  }

//handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

//compare two selected card
  useEffect(()=>{
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return{...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else{
        console.log('those cards do not match.')
        setTimeout(() => resetTurn(), 1000)
      }
    }
  },[choiceOne, choiceTwo])

  console.log(cards)

//reset choices and increase turn
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns (prevTurns => prevTurns +1)
    setDisabled(false)
  }

//start game automatically
useEffect(() => {
  suffleCard()
},[]
)

  return (
    <div className="App">
     <h1>Magic Match</h1>
     <button onClick={suffleCard}>New Game</button>
     <div className='card-grid'>
      {cards.map(card => (
        <SingleCard 
          key={card.id}  
          card={card}
          handleChoice={handleChoice}
          flipped={card===choiceOne || card===choiceTwo || card.matched}
          disabled ={disabled}
        />
      ))}
     </div>
      <div className="turn">
          Turns: {turns}
      </div>
     </div>
    
  );
}

export default App;
