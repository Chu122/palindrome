const birthDayInput =document.querySelector("#bday-input");
const showButton = document.querySelector("#show-btn")
const outputEl = document.querySelector("#result")
//take string and reverse the string 
function reverseStr(str){
    // var listOfChar = str.split('');// ['h', 'e', 'l' ...] we need to reverse this now
    // var reverseListOfChars =listOfChar.reverse();
    // var reverseStr =reverseListOfChars.join('');
    // return reverseStr;
    //all this can done in single line
    return str.split('').reverse().join('')
}
//take own string and return the string and  check if the string is palindrome or not.
function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse;

}
//converts date number to string
function convertDateToString(date){
   var dateStr= {day: '', month: '', year: ''};

   if(date.day <10){
    dateStr.day = '0' + date.day; // 10-<- 0 is added in the day 03- 11
   }else{
    dateStr.day = date.day.toString();
   }

   if(date.month <10){
    dateStr.month = '0' + date.month;// 10- 03 <- 0 is added in the month- 11
   }else{
    dateStr.month = date.month.toString();
   }

   dateStr.year = date.year.toString()

   return dateStr;
}

//console.log(convertDateToString(date));

//take a date  fomate and return all the variables 
function getAllDateFormates(date){
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month+ dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day+ dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month+ dateStr.day;
    var ddmmyy   = dateStr.day + dateStr.month+ dateStr.year.slice(-2); //for two digit of year
    var mmddyy   = dateStr.month + dateStr.day+ dateStr.year.slice(-2);
    var yymmdd   = dateStr.year.slice(-2) + dateStr.month+ dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd, ddmmyy , mmddyy ,yymmdd ];
}



//use the previous function and check the all the formates the we will run palindrome and retrun if any if there is true or false
function checkDateFormates(date){
    var listOfPalindromes = getAllDateFormates(date);

    var palindrome= false;

    for (var i =0; i< listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
         palindrome = true;
         break;
        }
    }
    return palindrome;
}
//check leap year 
function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year %100 === 0){
        return false;
    }
    if (year % 4 ===0){
        return false;
    }
}

//increments the date (adding +1).. to get the next date
function getNextDate(date){
    var day = date.day+ 1; 
    var month =date.month;
    var year = date.year;

    var dayInmonth= [31, 28,31, 30, 31,30,31,31,30,31,30,31] //for months index [0-11]
    if(month ===2){ //check for feb
        //check for leap year
        if(isLeapYear(year)){
            if(day >29){
                day = 1;
                month++;
            }

        }else{
            if(day >28){ 
                day =1;
                month++;
            }

        }

    }
    //check for other months
    else{
        //if dates exceeds the current days (max days in month)
        if(day > dayInmonth[month - 1])
        day = 1 ;
        month++;

    }
    //increment the year if month is greater then 12
    if(month > 12){
        month =1;
        year++;
    }
    return{
        day:day, 
        month:month,
        year:year
    }

}
//using leapyear and getNextDate function we build getNextPalindromeDAte function 
//to find the next palindrome date and how many days are in between
function getNextPalindromeDate(date){
    var count = 0;
    var nextDate = getNextDate(date);

    while(1){
        count++;
        var isPalindrome = checkDateFormates(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate =getNextDate(nextDate);
    }

    return [count, nextDate];
}


function clickHandler(e){
    var bdayStr = birthDayInput.value;

    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-');//['2020', '10', '12']
        var date ={
            day:Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
      
        var isPal =checkDateFormates(date);

        if(isPal){
            outputEl.innerText ='Yay! Your birthday is a plaindrome!!🥳'
        }else{
            var [count, nextDate] = getNextPalindromeDate(date);
            outputEl.innerText =`the next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days!😔 ` 
        }

    }
}


showButton.addEventListener('click', clickHandler);