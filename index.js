let currentYear;
let daysHavePast;
let percent;
let dayAmount;
const getDaysOfYear = (year) => {

    isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);

    return isLeapYear ? 366 : 365;
}

const getProgress = () => {
    //TODO:get the full year's day amount
    const time = new Date();
    const year = time.getFullYear();
    currentYear = year;
    const month = time.getMonth();
    const day = time.getDate();

    dayAmount = getDaysOfYear(year);

    //TODO:figure out how many day has passed from new year
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(year, 1, 1);
    const today = new Date(year, month + 1, day);

    const diffDays = Math.round(Math.abs((startDate - today) / oneDay));
    daysHavePast = diffDays;

    //TODO:figure out the progress
    return (diffDays / dayAmount).toFixed(4) ;
}

const setProgressToPage = () => {
    const finishEle = document.querySelector('.finish');
    const yearEle = document.querySelectorAll('.year');
    const pastEle = document.querySelector('.days-has-past');
    const percentEle = document.querySelector('.percent');
    percent = getProgress();
    finishEle.style.width = percent * 100 + '%';
    yearEle.forEach(item => item.innerHTML = currentYear);

    const unitPercent = parseFloat((percent / 180).toFixed(4));
    const timeGap = 3000 / 180;
    let dynamicPercent = 0;
    let Timer = setTimeout(function increateByPercent() {
        dynamicPercent += unitPercent;
        if (dynamicPercent < percent) {
            percentEle.innerHTML = (dynamicPercent * 100).toFixed(2);
            pastEle.innerHTML = Math.round(dayAmount * dynamicPercent);
            Timer = setTimeout(increateByPercent, timeGap);
        } else {
            percentEle.innerHTML = (percent * 100).toFixed(2);
            pastEle.innerHTML = daysHavePast;
            clearTimeout(Timer)
        }
    }, timeGap)
}

window.onload = setProgressToPage;
