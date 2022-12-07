import { CountDates } from "./CountDates";

// selector button
const btnsubmit=document.querySelector('.form-submit')
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
export function handleSubmit(){
// add event 
btnsubmit.addEventListener('click',function(event){
    event.preventDefault();
    // take value of user
    const place=document.querySelector('#place').value;
    const day=document.querySelector('#planday').value;
    const data={place:place, day:day};
    const form=document.querySelector('#form-1');
    const days=CountDates(day);
    postData('/add',data)
    .then((data)=>{
        form.classList.add("invalid2");
        document.querySelector('#Img__Place').src=data.url;
        document.querySelector('.Result').classList.remove("invalid2");
        document.querySelector('.detail').querySelectorAll('.Title')[0].textContent=`MY TRIP TO: ${place}`;
        document.querySelector('.detail').querySelectorAll('.Title')[1].textContent=`DEPARTING: ${day}`;
        document.querySelector('.detail').querySelector('.clouds').textContent=`CLOUDS: ${data.clouds}%`;
        document.querySelector('.detail').querySelector('.temp').textContent=`Temperature: ${data.temp}`;
        document.querySelector('.detail').querySelector('.describe').textContent=`There is: ${data.describe}`;
        document.querySelector('.detail').querySelector('.Days__away').textContent=`${place} is ${days} days away`;
    })
    
})
}