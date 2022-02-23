// Visualizzare in pagina 5 numeri casuali. ( con un alert )
// Dopo la chiusura dell’alert parte un timer di 30 secondi.
// Alla fine dei 30 secondi l’utente dovrà inserire, uno alla volta, i numeri che ha visto precedentemente ( se li ricorda ), tramite il prompt() (servirà un ciclo…?).
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

let randomNumbers = [];
let seconds = 3;
let right = [];
let wrong = [];
const timer = document.getElementById('timer');
timer.innerHTML = seconds;

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

} while(randomNumbers.length < 5)

console.log(randomNumbers);

alert(`Cerca di ricordati questi 5 numeri: ${randomNumbers.join(', ')}`);

//Creo il timer di 30 secondi
const clock = setInterval( () => {

    seconds--;
    timer.innerHTML = seconds;
    
    if (seconds === 0){
        clearInterval(clock);

        //Finiti i 30 secondi chiedo di inserire i 5 numeri che si ricorda
        for (let i = 0; i < randomNumbers.length; i++){
        
            const userNumber = parseInt( prompt(`Inserisci il ${i+1}° numero`) );
            console.log(userNumber);
            
            // se il numero inserito dall'utente è incluso nell'array dei numeri da ricordare e NON è già tra i numeri indovinati
            if( randomNumbers.includes(userNumber) && !right.includes(userNumber)){
                right.push(userNumber);
        
            } else { 
                // qui ci finiscono i numeri sbagliato o doppi
                wrong.push(userNumber);
            }
        }
        alert(`Hai indovinato ${right.length} numeri --> ${right.join(', ')}`);
        console.log('Sbagliati oppure doppi', wrong.join(', '));
    } 
    
},1000); // la funzione deve partire ogni secondo per far decrementare seconds










