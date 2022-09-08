
const popapOne = document.querySelector('.popap__one');
const popapTwo = document.querySelector('.popap__two');
const popapClose = document.querySelectorAll('.popap__one_btn');
const form = document.querySelector('form.add');
const sybmut = document.getElementById('names');
const btn = document.getElementById('btn');
console.log(form);

function exit(){
    for (let i = 0; i < popapClose.length; i++) {
        popapClose[i].addEventListener("click", function() {
            popapOne.style.display = "none";
            popapTwo.style.display = "none";
        });
    }
}
exit();



function openBtn() {
    if (sybmut.value !== "") {
        btn.style.display = "flex";
    } else {
        btn.style.display = "none";
    }
}
openBtn()

form.addEventListener("submit", async (event) => {
event.preventDefault();
const formData = new FormData(event.target);
const names = formData.get('names');

    function popap(){
        if(names.search(/\d/) != -1 ){
            console.log('Error');
            popapTwo.style.display = "flex";
        } else {
            popapOne.style.display = "flex";
        }     
    }
    popap()

    const data = {names};
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };


const response = await fetch("/api/set", options);
const json = await response.json();
    console.log(json);
});


