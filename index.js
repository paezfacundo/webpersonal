document.addEventListener("DOMContentLoaded", function() {
  const whiteText = "<¡Hola, soy ";
  const magentaText = "Facundo Paez";
  const endingText = "!>";

  const whiteTextElement = document.querySelector('.banner h1 .white');
  const magentaTextElement = document.querySelector('.banner h1 .magenta');
  const whiteExclamationElement = document.querySelector('.banner h1 .white-exclamation');
  const cursorElement = document.querySelector('.banner h1 .cursor');

  let index = 0;

  function addLetter() {
    if (index < whiteText.length) {
      whiteTextElement.textContent += whiteText[index];
    } else if (index < whiteText.length + magentaText.length) {
      magentaTextElement.textContent += magentaText[index - whiteText.length];
    } else if (index < whiteText.length + magentaText.length + endingText.length) {
      whiteExclamationElement.textContent += endingText[index - whiteText.length - magentaText.length];
    }
    index++;
    if (index <= whiteText.length + magentaText.length + endingText.length) {
      setTimeout(addLetter, 100);
    }
  }

  addLetter();

  setInterval(function() {
    cursorElement.style.visibility = (cursorElement.style.visibility === 'hidden') ? 'visible' : 'hidden';
  }, 500);

  document.querySelector('.navbar-nav .nav-link:first-child').classList.add('active');
});

function detectVisibleSection() {
  const sections = document.querySelectorAll('section');
  let visibleSection = null;

  let maxVisibleArea = 0;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    const visibleArea = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    if (visibleArea > maxVisibleArea) {
      maxVisibleArea = visibleArea;
      visibleSection = section;
    }
  }

  if (!visibleSection && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    visibleSection = document.getElementById('contacto');
  }

  return visibleSection;
}

function updateActiveLink() {
  const visibleSection = detectVisibleSection();
  const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');

  for (const link of navbarLinks) {
    link.classList.remove('active');
  }

  if (window.scrollY === 0) {
    document.querySelector('.navbar-nav .nav-link:first-child').classList.add('active');
  }

  if (visibleSection) {
    const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${visibleSection.id}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);
updateActiveLink();


document.addEventListener("DOMContentLoaded", function() {
  var accordions = document.querySelectorAll(".accordion");

  accordions.forEach(function(accordion) {
      var title = accordion.querySelector(".accordion-title");
      var content = accordion.querySelector(".accordion-content");

      title.addEventListener("click", function() {
          if (content.style.maxHeight) {
              content.style.maxHeight = null;
              title.querySelector(".accordion-arrow").innerHTML = "&#9660;";
          } else {
              content.style.maxHeight = content.scrollHeight + "px";
              title.querySelector(".accordion-arrow").innerHTML = "&#9650;";
          }
      });

      content.style.maxHeight = null;
  });
});
