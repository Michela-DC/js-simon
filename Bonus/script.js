// Visualizzare in pagina 5 numeri casuali. ( con un alert )
// Dopo la chiusura dell’alert parte un timer di 30 secondi.
// Alla fine dei 30 secondi l’utente dovrà inserire, uno alla volta, i numeri che ha visto precedentemente ( se li ricorda ), tramite il prompt() (servirà un ciclo…?).
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

let randomNumbers = [];
let seconds = 30;
let right = [];
let wrong = [];

const introHtml = document.querySelector('.intro');
const numbersHtml = document.querySelector('.numbers');
const readyButton = document.getElementById('btn-ready');
const timerContainer = document.querySelector('.timer-container')
const timer = document.getElementById('timer');
const inputContainer = document.querySelector('.input-container');
const guessedNumbers = document.querySelector('.guessed-numbers');


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// creo i numeri random e li pusho dentro l'array vuoto solo se non sono doppioni
do{

    const num = getRandomInt(1,100);
    console.log(num);

    if (!randomNumbers.includes(num)) {
        randomNumbers.push(num);
    }

} while(randomNumbers.length < 5);

// rendo visibile la pagina iniziale e ci stampo dentro i 5 numeri random
introHtml.style.display = 'flex';
numbersHtml.innerHTML += `${randomNumbers.join(', ')}`;

//click su readyButton
readyButton.addEventListener('click', function(){

    introHtml.style.display = 'none';
    timerContainer.style.display = 'flex';
    
    //Parte il timer che si aggiorna ogni secondo
    let checkNumbers = () => {

        timer.innerHTML = seconds;

        if (seconds === 0){
            //se i secondi arrivano a 0 interrompo il conto alla rovescia
            clearInterval(clock);
            
            timerContainer.style.display = 'none';
            inputContainer.style.display = 'flex';
    
            //Finiti i 30 secondi chiedo di inserire i 5 numeri che si ricorda
            for(let i = 1; i <= randomNumbers.length; i++){ 

                //Creo il div che farà da wrapper a label, input, bottone e lo inserisco deltro all'input container nell'html   
                let inputWrapper = document.createElement('div');
                inputWrapper.classList.add('input-wrapper');
                inputContainer.append(inputWrapper);
                
                //creo label, input e bottone che inserisco dentro al wrapper
                let inputLabel = document.createElement('label');
                inputLabel.innerHTML += `Inserisci il ${i}° numero`;

                let input = document.createElement('input');
                input.classList.add('input');

                let insertButton = document.createElement('button');
                insertButton.setAttribute('id','btn-insert');
                insertButton.innerHTML += `insert`;   

                inputWrapper.append(inputLabel, input, insertButton);
                console.log(inputContainer)
                
                //quando viene schiacciato il bottone insert si salva il numero inserito dall'user 
                insertButton.addEventListener('click', function(){
                    
                    insertButton.style.backgroundColor = '#66cc00';  
                    insertButton.innerHTML = `checking...`; // mettendo solo = va a sovrascrivere quello che c'era prima

                    let userNumber = parseInt(input.value);
                    console.log(userNumber);
                    
                    // se il numero inserito dall'utente è incluso nell'array dei numeri da ricordare e NON è già tra i numeri indovinati
                    if( randomNumbers.includes(userNumber) && !right.includes(userNumber)){
                        right.push(userNumber);
                
                    } else { 
                        // qui ci finiscono i numeri sbagliato o doppi
                        wrong.push(userNumber);
                    }
                    
                    
                    if (i === randomNumbers.length){
                        inputContainer.style.display = 'none';
                        guessedNumbers.style.display = 'flex';
                        guessedNumbers.innerHTML += `Hai indovinato ${right.length} numeri --> ${right.join(', ')}`
                        console.log(guessedNumbers);
                        
                        console.log('sbagliati o doppi', wrong);
                    }
                })
            }
        } 

        //ora posso decrementare i secondi - l'ho messo dopo if perché prima controlla a che secondo siamo(che non sia zero) e poi si può decrementare
        seconds--; 
    }; 

    // invoco la funzione prima del setInterval così la funzione viene eseguita prima una volta 
    // poi la invoco con il set interval così la esegue nelle varie esecuzione dell'interval 
    // -> in questo modo il conto alla rovescia parte subito e non dopo un secondo
    checkNumbers();
    
    const clock = setInterval(checkNumbers, 1000); // la funzione deve partire ogni 1 secondo per far decrementare seconds

})









