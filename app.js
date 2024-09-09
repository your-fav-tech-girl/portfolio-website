document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
});

function toggleNav() {
    const navLinks = document.getElementById("navLinks");
    const changeIcon = document.querySelector(".burger");
    navLinks.classList.toggle("active");
  }

  //Aos animination
AOS.init({
    duration: 1000, // Animation duration in milliseconds
    easing: "ease-in-out", // Easing function
    once: false, // Animation happens only once as you scroll
  });
  
  let currentIndex = 0;
  const autoSlideInterval = 3000; 
  function showSlide(index) {
    const carousel = document.getElementById("carousel");
    const slides = carousel.children;
    const totalSlides = slides.length;
  
    if (index >= totalSlides) {
      currentIndex = 0; 
    } else if (index < 0) {
      currentIndex = totalSlides - 1; 
    } else {
      currentIndex = index;
    }
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
  }
  
  function nextSlide() {
    showSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    showSlide(currentIndex - 1);
  }
  
  function autoSlide() {
    nextSlide(); 
    setTimeout(autoSlide, autoSlideInterval); 
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    showSlide(0);
    setTimeout(autoSlide, autoSlideInterval); 
  });
  
  // contact form validation
  (function () {
    emailjs.init({
      publicKey: "K-xoeFdOa5Cr7guU7",});
  })();
  
  const msg = document.querySelector(".form-message");
  
  window.onload = function () {
    document
      .getElementById("contact-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
  
        // Get form field values
        const name = document.getElementById("name").value.trim();
        const mail = document.getElementById("mail").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
  
        // Simple validation
        if (!name || !mail || !subject || !message) {
          msg.classList.add("show");
          msg.innerHTML =
            "<span class='error-msg'>All fields are required.</span>";
          setTimeout(() => msg.classList.remove("show"), 2000);
          return; // Stop the form from submitting
        }
  
        function validateEmail(email) {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(email);
        }
  
        document.querySelector(".loader").classList.add("show");
  
        // Send form using EmailJs
        emailjs.sendForm("service_zr0cmjc", "template_b93cbet", this).then(
          function () {
            document.getElementById("contact-form").reset();
            document.querySelector(".loader").classList.remove("show");
            msg.innerHTML = "";
            msg.innerHTML += "<span class='success-msg'>Email Sent</span>";
            msg.classList.add("show");
            setTimeout(() => msg.classList.remove("show"), 2000);
          },
  
          //Error display message
          function (error) {
            document.querySelector(".loader").classList.toggle("show");
            msg.classList.add("show");
            msg.innerHTML += "<span class='error-msg'>Email Not Sent</span>";
          }
        );
      });
  };  