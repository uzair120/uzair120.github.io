$(document).ready(function () {
  const portfolioSlider = $(".portfolio-slider");

  // Fetch projects data from JSON file
  $.getJSON("projects.json")
    .done(function (projects) {
      projects.forEach((project, index) => {
        const projectElem = `
                    <div class="project" onclick="showPopup(${index})">
                        <img src="${
                          project.image || "https://via.placeholder.com/600x400"
                        }" alt="Project Image">
                        <h2>${project.name}</h2>
                        <p>${project.description}</p>
                    </div>
                `;
        portfolioSlider.append(projectElem);
      });

      portfolioSlider.slick({
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 3,
        arrows: true,
        prevArrow:
          '<button id="arrowbtn" type="button" class="slick-prev"></button>',
        nextArrow:
          '<button id="arrowbtn" type="button" class="slick-next"></button>',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: true,
              centerMode: true,
              centerPadding: "40px",
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: true,
              centerMode: true,
              centerPadding: "40px",
              slidesToShow: 1
            }
          }
        ]
      });

      // Store projects data globally
      window.projectsData = projects;
    })
    .fail(function (jqxhr, textStatus, error) {
      console.error("Error loading JSON: ", textStatus, ", Detail: ", error);
    });
});

function showPopup(index) {
  const project = window.projectsData[index];
  const secondaryImages = project.secondaryImages
    ? project.secondaryImages
        .map((image) => `<img src="${image}" alt="Secondary Image">`)
        .join("")
    : "";
  const projectLink = project.link
    ? `<p><strong>Link:</strong> <a href=${project.link} target="_blank"> ${project.link}</a></p>`
    : "";
  const popupContent = `
        <img src="${project.image}" alt="Project Image">
        <p>${project.description}</p>
        ${projectLink}
        <p><strong>Role:</strong> ${project.role}</p>
        <p><strong>Technologies:</strong> ${Object.values(project.technologies)
          .flat()
          .join(", ")}</p>
        <p><strong>Challenges:</strong></p>
        <ul>
            ${project.challenges
              .map(
                (challenge) => `
                <li><strong>${challenge.challenge}:</strong> ${challenge.solution}</li>
            `
              )
              .join("")}
        </ul>
        <div class="secondary-images">
            ${secondaryImages}
        </div>
    `;
  document.getElementById("popupProjectName").textContent = project.name;
  document.getElementById("popupContent").innerHTML = popupContent;
  document.getElementById("projectPopup").style.display = "flex";
  // Hide slider arrows when popup is shown
  $(".slick-prev, .slick-next").hide();
}

function closePopup() {
  document.getElementById("projectPopup").style.display = "none";
  // Show slider arrows when popup is closed
  $(".slick-prev, .slick-next").show();
}
