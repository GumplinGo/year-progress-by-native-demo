let currentYear;
let daysHavePast;
let percent;
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

    const dayAmount = getDaysOfYear(year);

    //TODO:figure out how many day has passed from new year
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(year, 1, 1);
    const today = new Date(year, month + 1, day);

    const diffDays = Math.round(Math.abs((startDate - today) / oneDay));
    daysHavePast = diffDays;

    //TODO:figure out the progress
    return `${(diffDays / dayAmount) * 100}%`;
}

const setProgressToPage = () => {
    const finishEle = document.querySelector('.finish');
    const yearEle = document.querySelectorAll('.year');
    const pastEle = document.querySelector('.days-has-past');
    const percentEle = document.querySelector('.percent');
    percent = getProgress();
    finishEle.style.width = percent;
    yearEle.forEach(item => item.innerHTML = currentYear);
    percentEle.innerHTML = Math.round(parseFloat(percent));
    pastEle.innerHTML = daysHavePast;
}

// setProgressToPage();
window.onload = setProgressToPage;
