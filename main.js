let day = document.getElementById("Day");
let month = document.getElementById("Month");
let year = document.getElementById("Year");

let dayResult = document.querySelector(".dayResult > span");
let monthResult = document.querySelector(".monthResult > span");
let yearResult = document.querySelector(".yearResult > span");

let dError = document.getElementsByClassName("dError")[0]
let mError = document.getElementsByClassName("mError")[0]
let yError = document.getElementsByClassName("yError")[0]

let submit = document.getElementsByClassName("submit")[0];


submit.onclick = function(){

    let dayValidate = false;
    let monthValidate = false;
    let yearValidate = false;

    let dayResonError=""
    let monthResonError=""
    let yearResonError=""


    let month31 = [1,3,5,7,8,10,12];
    let month30 = [4,6,9,11];


    if(day.value != ""){
        //validate days that has 31 days
        month31.includes(+month.value) && (day.value > 0 && day.value <= 31)? dayValidate = true : dayResonError = "Must be a valid day"
        //validate days that has 30 days
        month30.includes(+month.value) && (day.value > 0 && day.value <= 30)? dayValidate = true : dayResonError = "Must be a valid day"

    }else if(day.value == ""){
        dayResonError = "The Field Is required"
    }

    //validate days in febraury
    if (+month.value === 2) {
        let isLeapYear = (+year.value % 4 === 0 && +year.value  % 100 !== 0) || (+year.value  % 400 === 0);
        if (isLeapYear && +day.value > 0 && +day.value <= 29) {  // Corrected day range for leap year
            dayValidate = true;
        } else if (!isLeapYear && +day.value > 0 && +day.value <= 28) {  // Corrected day range for non-leap year
            dayValidate = true;
        }
    }

    //validate month
    if(month.value !=""){
        month.value > 0 && month.value <= 12 ? monthValidate = true : monthResonError = "Must be a valid month"
    }else if(month.value == ""){
        monthResonError = "The Field Is required"
    }

    //validate year
    if(year.value !=""){
        year.value <= new Date().getFullYear() && year.value >0? yearValidate = true : yearResonError = "Must be a in the past"
    }else if(year.value == ""){
        yearResonError = "The Field Is required"
    }

    if(dayValidate  && monthValidate  && yearValidate ){

        dError.innerHTML=""
        mError.innerHTML=""
        yError.innerHTML=""

        dError.previousElementSibling.classList.replace("border-red-500", "border-[#f3f4f6]")
        mError.previousElementSibling.classList.replace("border-red-500", "border-[#f3f4f6]")
        yError.previousElementSibling.classList.replace("border-red-500" , "border-[#f3f4f6]")
    
        yError.parentElement.firstElementChild.classList.replace("text-red-500" , "text-gray-400" )
        dError.parentElement.firstElementChild.classList.replace("text-red-500", "text-gray-400" )
        mError.parentElement.firstElementChild.classList.replace( "text-red-500" , "text-gray-400" )

        let birthDay = new Date(`${year.value} ${month.value} ${day.value}`);
        birthDay.setHours(0,0,0)
        let now = new Date();

        let result = now - birthDay;

        let daysRes  = Math.floor(result / 1000 / 60 / 60 / 24); 
        let yearRes  = daysRes / 365.25;

        let remainMonths = (yearRes - Math.floor(yearRes)) * 12
        let remainDays = (remainMonths - Math.floor(remainMonths)) * 30
        

        let Y = 0;
        let M = 0;
        let D = 0;

        let intervalY = setInterval(function(){
            if(Y === Math.floor(yearRes)){
                clearInterval(intervalY)
            }
            yearResult.innerHTML = Y;
            Y++
        },20)

        let intervalM = setInterval(function(){
            if(M === Math.floor(remainMonths)){
                clearInterval(intervalM)
            }
            monthResult.innerHTML = M;
            M++
        },20)

        let intervalD = setInterval(function(){
            if(D === Math.floor(remainDays)){
                clearInterval(intervalD)
            }
            dayResult.innerHTML = D;
            D++
        },20)

}else{

    dError.innerHTML=""
    mError.innerHTML=""
    yError.innerHTML=""

    dError.previousElementSibling.classList.replace("border-[#f3f4f6]" , "border-red-500")
    mError.previousElementSibling.classList.replace("border-[#f3f4f6]" , "border-red-500")
    yError.previousElementSibling.classList.replace("border-[#f3f4f6]" , "border-red-500")

    yError.parentElement.firstElementChild.classList.replace("text-gray-400" , "text-red-500")
    dError.parentElement.firstElementChild.classList.replace("text-gray-400" , "text-red-500")
    mError.parentElement.firstElementChild.classList.replace("text-gray-400" , "text-red-500")

    dError.innerHTML= dayResonError
    mError.innerHTML= monthResonError
    yError.innerHTML= yearResonError

}

}

