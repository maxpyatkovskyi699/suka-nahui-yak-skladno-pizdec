// masters.js
document.addEventListener("DOMContentLoaded", () => {
  const mastersSection = document.querySelector(".masters-section");
  if (mastersSection) {
    mastersSection.innerHTML = "<h2>Наші майстри</h2>";

    const mastersData = [
      {
        name: "Борис Васильович",
        description:
          "Професійний барбер із 7 роками стажу, який володіє мистецтвом створення бездоганного чоловічого стилю. Блискуче виконує стрижки будь-якої складності, надає форму бороді та вусам з урахуванням індивідуальних побажань клієнта.",
        image: "images/master1.png",
      },
      {
        name: "Олег Іванович",
        description:
          "Досвідчений перукар із понад 10 роками практики, спеціалізується на класичних та сучасних жіночих стрижках. Майстерно володіє техніками фарбування, колорування та створення образів для особливих подій.",
        image: "images/master2.png",
      },
      {
        name: "Катерина Сергіївна",
        description:
          "Майстер манікюру та педикюру з 5-річним стажем. Професійно виконує апаратний та класичний манікюр, педикюр, художній розпис нігтів. Завжди стежить за останніми трендами догляду та дизайну.",
        image: "images/master3.png",
      },
      {
        name: "Світлана Миколаївна",
        description:
          "Жінка із 15-річним досвідом роботи в індустрії краси. Спеціалізується на жіночих стрижках, складних фарбуваннях та укладках. Індивідуально підходить до кожного клієнта, підкреслюючи природну красу та особливості зовнішності.",
        image: "images/master4.png",
      },
      {
        name: "Андрій Петрович",
        description:
          "Перукар із 1,5 роками стажу, який швидко набирає популярності завдяки уважності до деталей та сучасному підходу до чоловічих і жіночих стрижок. Завжди враховує побажання клієнта та надає професійні поради щодо догляду за волоссям.",
        image: "images/master5.png",
      },
    ];
    let currentIndex = 0;
    const sliderContainer = document.createElement("div");
    sliderContainer.classList.add("masters-slider-container");
    const slider = document.createElement("div");
    slider.classList.add("masters-slider");

    mastersData.forEach((master) => {
      const slide = document.createElement("div");
      slide.classList.add("master-slide");
      const img = document.createElement("img");
      img.src = master.image;
      img.alt = master.name;
      const info = document.createElement("div");
      info.classList.add("master-info");
      const nameHeading = document.createElement("h3");
      nameHeading.textContent = master.name;
      const descriptionParagraph = document.createElement("p");
      descriptionParagraph.textContent = master.description;
      info.appendChild(nameHeading);
      info.appendChild(descriptionParagraph);
      slide.appendChild(img);
      slide.appendChild(info);
      slider.appendChild(slide);
    });

    sliderContainer.appendChild(slider);

    const controls = document.createElement("div");
    controls.classList.add("slider-controls");

    const prevButton = document.createElement("button");
    prevButton.classList.add("slider-control", "prev");
    prevButton.innerHTML = "&#10094;"; // Символ лівої стрілки
    prevButton.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + mastersData.length) % mastersData.length;
      updateSlider();
    });

    const nextButton = document.createElement("button");
    nextButton.classList.add("slider-control", "next");
    nextButton.innerHTML = "&#10095;"; // Символ правої стрілки
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % mastersData.length;
      updateSlider();
    });

    controls.appendChild(prevButton);
    controls.appendChild(nextButton);

    sliderContainer.appendChild(controls);
    mastersSection.appendChild(sliderContainer);

    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }
});
