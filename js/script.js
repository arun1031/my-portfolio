/* =====================================================
   AOS INITIALIZATION
===================================================== */

AOS.init({
    duration: 800,
    once: true,
    offset: 80
});



/* =====================================================
   CURRENT YEAR
===================================================== */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



/* =====================================================
   NAVBAR ACTIVE LINK
===================================================== */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});



/* =====================================================
   CLOSE MOBILE NAVBAR AFTER CLICK
===================================================== */

const navbarCollapse =
    document.querySelector(".navbar-collapse");

const navbarLinks =
    document.querySelectorAll(
        ".navbar-collapse .nav-link"
    );


navbarLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (
            navbarCollapse &&
            navbarCollapse.classList.contains("show")
        ) {

            const navbarToggler =
                document.querySelector(".navbar-toggler");

            if (navbarToggler) {
                navbarToggler.click();
            }

        }

    });

});



/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}



/* =====================================================
   EMAILJS CONFIGURATION
===================================================== */

/*
    IMPORTANT:
    Replace ONLY these 3 values with the values
    from your EmailJS account.

    
    1. Public Key : rL78y0iixpaPgXL4r
    2. Service ID :service_mvmrxw5
    3. Template ID :template_uoy777d

    DO NOT put your EmailJS Private Key here.
*/


const EMAILJS_PUBLIC_KEY =
    "rL78y0iixpaPgXL4r";

const EMAILJS_SERVICE_ID =
    "service_mvmrxw5";

const EMAILJS_TEMPLATE_ID =
    "template_uoy777d";



/* =====================================================
   INITIALIZE EMAILJS
===================================================== */

if (
    typeof emailjs !== "undefined" &&
    EMAILJS_PUBLIC_KEY !== "rL78y0iixpaPgXL4r"
) {

    emailjs.init({

        publicKey: rL78y0iixpaPgXL4r

    });

}




/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");

const buttonText =
    document.getElementById("buttonText");

const buttonLoader =
    document.getElementById("buttonLoader");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            /*
                Stop the browser from refreshing
                the page when the form is submitted.
            */

            event.preventDefault();


            /* -----------------------------------------
               CHECK EMAILJS
            ----------------------------------------- */

            if (
                typeof emailjs === "undefined"
            ) {

                formStatus.textContent =
                    "Email service is not loaded. Please try again.";

                formStatus.style.color =
                    "#dc3545";

                return;

            }


            /* -----------------------------------------
               CHECK EMAILJS CONFIGURATION
            ----------------------------------------- */

            if (
                EMAILJS_PUBLIC_KEY === "rL78y0iixpaPgXL4r" ||
                EMAILJS_SERVICE_ID === "service_mvmrxw5" ||
                EMAILJS_TEMPLATE_ID === "template_uoy777d"
            ) {

                formStatus.textContent =
                    "Please configure EmailJS first.";

                formStatus.style.color =
                    "#dc3545";

                return;

            }


            /* -----------------------------------------
               SHOW LOADING
            ----------------------------------------- */

            if (buttonText) {

                buttonText.classList.add("d-none");

            }

            if (buttonLoader) {

                buttonLoader.classList.remove("d-none");

            }

            if (formStatus) {

                formStatus.textContent = "";

            }


            /* -----------------------------------------
               DISABLE BUTTON
            ----------------------------------------- */

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            if (submitButton) {

                submitButton.disabled = true;

            }


            try {

                /* -------------------------------------
                   SEND EMAIL
                ------------------------------------- */

                await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);


                /* -------------------------------------
                   SUCCESS
                ------------------------------------- */

                formStatus.textContent =
                    "Message sent successfully! I'll get back to you soon.";

                formStatus.style.color =
                    "#198754";


                /* -------------------------------------
                   CLEAR FORM
                ------------------------------------- */

                contactForm.reset();


            } catch (error) {

                console.error(
                    "EmailJS Error:",
                    error
                );


                /* -------------------------------------
                   ERROR
                ------------------------------------- */

                formStatus.textContent =
                    "Something went wrong. Please try again later.";

                formStatus.style.color =
                    "#dc3545";

            }


            /* -----------------------------------------
               RESET LOADING
            ----------------------------------------- */

            if (buttonText) {

                buttonText.classList.remove("d-none");

            }

            if (buttonLoader) {

                buttonLoader.classList.add("d-none");

            }


            /* -----------------------------------------
               ENABLE BUTTON
            ----------------------------------------- */

            if (submitButton) {

                submitButton.disabled = false;

            }

        }
    );

}