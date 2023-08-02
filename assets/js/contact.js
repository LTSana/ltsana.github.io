// JavaScript for contact page


checkDayTime = () => {
  const timestamp = new Date();
  if (timestamp.getHours() >= 5 && timestamp.getHours() < 12) {
    document.querySelector("#time-info-greeting").innerText = "Good Morning,";
  } else if (timestamp.getHours() >= 12 && timestamp.getHours() < 18) {
    document.querySelector("#time-info-greeting").innerText = "Good Afternoon,";
  } else if (timestamp.getHours() >= 18 && timestamp.getHours() < 24) {
    document.querySelector("#time-info-greeting").innerText = "Good Evening,";
  } else if (timestamp.getHours() >= 24 && timestamp.getHours() < 5) {
    document.querySelector("#time-info-greeting").innerText = "Good Evening,";
  }
}
checkDayTime();