// JavaScript for the work page

document.querySelectorAll(".work-option").forEach(button => {
  button.onclick = () => {

    document.querySelectorAll(".work-option").forEach(button2 => {
      if (button2.dataset.work != button.dataset.work) {
        button2.classList.toggle("active", false);
        document.querySelector(`#work-${button2.dataset.work}`).classList.toggle("d-flex", false);
        document.querySelector(`#work-${button2.dataset.work}`).classList.toggle("d-none", true);
      }
    });

    button.classList.toggle("active", true);
    document.querySelector(`#work-${button.dataset.work}`).classList.toggle("d-flex", true);
    document.querySelector(`#work-${button.dataset.work}`).classList.toggle("d-none", false);
  }
});
