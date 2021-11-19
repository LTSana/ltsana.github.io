// JavaScript for Index Page

document.addEventListener("DOMContentLoaded", () => {
	// Google PageSpeed API
	function run() {
		document.querySelectorAll(".pagespeed-heading").forEach(speedscore => {
            let _num_dots = 0;
            speedscore.loading_gif = setInterval(() => {
                _num_dots += 1
                if (_num_dots === 1) {
                    _loading_dots = ".";
                } else if (_num_dots === 2) {
                    _loading_dots = "..";
                } else if (_num_dots === 3) {
                    _loading_dots = "...";
                } else {
                    _num_dots = 0;
                    _loading_dots = "";
                }
                document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).innerHTML = `Loading${_loading_dots}`;
            }, 500);
			const url = setUpQuery(speedscore.dataset.website);
			fetch(url).then(response => response.json()).then(json => {
				// See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
        // to learn more about each of the properties in the response object.

        clearInterval(speedscore.loading_gif); // Clear the loading dots

        // For good (high) scores
				if ((json.lighthouseResult.categories["performance"].score * 100) >= 90 && (json.lighthouseResult.categories["performance"].score * 100) <= 100) {
					document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).classList.toggle("score-good", true)
          document.querySelector(`#score-status-${speedscore.dataset.score_id}`).classList.toggle("score-good", true)
          document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).classList.toggle("crazy_font_glitch", false)
          let counter = 0;
          speedscore.numberScale = setInterval(() => {
              if (counter >= (json.lighthouseResult.categories["performance"].score * 100)) {
                  clearInterval(speedscore.numberScale);

                  // Update the chart for Insight Score
                  let chart = document.querySelector(`#chart-${speedscore.dataset.score_id} > canvas`).chart;
                  chart.data.datasets[0].data[0] = json.lighthouseResult.categories["performance"].score * 100;
                  chart.data.datasets[0].data[1] =  100 - (json.lighthouseResult.categories["performance"].score * 100);
                  chart.data.datasets[0].backgroundColor[0] = "#00d266"; // Set the color of the Score
                  chart.update()

                  document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).innerHTML = (json.lighthouseResult.categories["performance"].score * 100);
              } else {
                  document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).innerHTML = counter;
                  counter += 1;
              }
          }, 50);
          document.querySelector(`#score-status-${speedscore.dataset.score_id}`).innerHTML = " High";

    		// For medium scores
				} else if ((json.lighthouseResult.categories["performance"].score * 100) >= 50 && (json.lighthouseResult.categories["performance"].score * 100) <= 89) {
					document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).classList.toggle("score-medium", true);
          document.querySelector(`#score-status-${speedscore.dataset.score_id}`).classList.toggle("score-medium", true);
          document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).classList.toggle("crazy_font_glitch", false);
					let counter = 0;
          speedscore.numberScale = setInterval(() => {
              if (counter >= (json.lighthouseResult.categories["performance"].score * 100)) {
                  clearInterval(speedscore.numberScale);

                  // Update the chart for Insight Score
                  let chart = document.querySelector(`#chart-${speedscore.dataset.score_id} > canvas`).chart;
                  chart.data.datasets[0].data[0] = json.lighthouseResult.categories["performance"].score * 100;
                  chart.data.datasets[0].data[1] =  100 - (json.lighthouseResult.categories["performance"].score * 100);
                  chart.data.datasets[0].backgroundColor[0] = "#ffa400";
                  chart.update();

                  document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).innerHTML = (json.lighthouseResult.categories["performance"].score * 100);
              } else {
                  document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).innerHTML = counter;
                  counter += 1;
              }
          }, 50)
          document.querySelector(`#score-status-${speedscore.dataset.score_id}`).innerHTML = " Medium";

      	// For low scores
				} else if ((json.lighthouseResult.categories["performance"].score * 100) >= 0 && (json.lighthouseResult.categories["performance"].score * 100) <= 49) {
					document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).classList.toggle("score-low", true);
          document.querySelector(`#score-status-${speedscore.dataset.score_id}`).classList.toggle("score-low", true);
          document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).classList.toggle("crazy_font_glitch", false);
					let counter = 0;
          speedscore.numberScale = setInterval(() => {
              if (counter >= (json.lighthouseResult.categories["performance"].score * 100)) {
                  clearInterval(speedscore.numberScale);

                  // Update the chart for Insight Score
                  let chart = document.querySelector(`#chart-${speedscore.dataset.score_id} > canvas`).chart;
                  chart.data.datasets[0].data[0] = json.lighthouseResult.categories["performance"].score * 100;
                  chart.data.datasets[0].data[1] =  100 - (json.lighthouseResult.categories["performance"].score * 100);
                  chart.data.datasets[0].backgroundColor[0] = "#ff4e42";
                  chart.update();

                  document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).innerHTML = (json.lighthouseResult.categories["performance"].score * 100);
              } else {
                  document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).innerHTML = counter;
                  counter += 1;
              }
          }, 50);
					document.querySelector(`#score-status-${speedscore.dataset.score_id}`).innerHTML = " Low";
				}
			}).catch((err) => {
				document.querySelector(`#score-status-${speedscore.dataset.score_id}`).classList.toggle("score-error", true);
				document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).classList.toggle("crazy_font_glitch", false);

				document.querySelector(`#score-holder-${speedscore.dataset.score_id}`).innerHTML = ``;
				document.querySelector(`#score-status-${speedscore.dataset.score_id}`).innerHTML = " Unavailable";
			});
		});
	}

	function setUpQuery(website) {
		const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
		const parameters = {
			url: encodeURIComponent(`http://${website}`)
		};

		let query = `${api}?`;
		for (key in parameters) {
			query += `${key}=${parameters[key]}`;
		}

		// Add API key
		query += "&key=AIzaSyBuvoszTjP7QrS_aLwbIboqx8Of23As-nA";

		return query;
	}

	run();
})
