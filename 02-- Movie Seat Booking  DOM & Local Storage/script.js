const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

/* 
    - (+) change type of data from string to number 
    - you can also do that with parseInt() 
*/
let ticketPrice = +movieSelect.value; 



// Save Selected Movie and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


// Update Total And Count 
function updateSelectedCount(){

    const  selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat)
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


    const selectedSeatCount = selectedSeats.length;

    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;

}

// Get Dtat From Localstorage and Populate Ui ()
function populateUI(){
    const selectedSeats =  JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0 ){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null ){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie Select event
movieSelect.addEventListener('change', (e) => {

    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
 
 })

// Seat Click Event
container.addEventListener('click', (e) => {

   if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
   }

})

// Initial Count and Total Set
updateSelectedCount();