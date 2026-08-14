/* =========================================================
   TAMIL TRADERS - WEBSITE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton = document.querySelector(".menu");
    const navigation = document.querySelector("nav");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("show");

            if (navigation.classList.contains("show")) {
                menuButton.innerHTML = "✕";
            } else {
                menuButton.innerHTML = "☰";
            }
        });

        // Close menu when a link is clicked
        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("show");

                menuButton.innerHTML = "☰";

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const header = document.querySelector("header");

                const headerHeight = header
                    ? header.offsetHeight
                    : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }

        });

    });


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".card, .about, .about-img, .heading, .industry, .stat, .box"
    );

    const revealObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       ANIMATED STATISTICS
       ===================================================== */

    const counters = document.querySelectorAll(".stat strong");

    const counterObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                if (counter.dataset.animated === "true") {
                    return;
                }

                counter.dataset.animated = "true";

                const originalText =
                    counter.textContent.trim();

                const numberMatch =
                    originalText.match(/\d+/);

                if (!numberMatch) {
                    return;
                }

                const targetNumber =
                    parseInt(numberMatch[0]);

                const prefix =
                    originalText.substring(
                        0,
                        originalText.indexOf(numberMatch[0])
                    );

                const suffix =
                    originalText.substring(
                        originalText.indexOf(numberMatch[0]) +
                        numberMatch[0].length
                    );

                let current = 0;

                const duration = 1500;

                const intervalTime = 25;

                const increment =
                    Math.max(
                        1,
                        Math.ceil(
                            targetNumber /
                            (duration / intervalTime)
                        )
                    );

                const counterTimer =
                    setInterval(function () {

                        current += increment;

                        if (current >= targetNumber) {

                            current = targetNumber;

                            clearInterval(counterTimer);

                        }

                        counter.textContent =
                            prefix +
                            current +
                            suffix;

                    }, intervalTime);

                counterObserver.unobserve(counter);

            });

        },

        {
            threshold: 0.6
        }

    );

    counters.forEach(function (counter) {

        counterObserver.observe(counter);

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll("nav a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
   TAMIL TRADERS ENQUIRY FORM
   GOOGLE SHEETS + WHATSAPP
   ===================================================== */

const GOOGLE_SHEET_WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbxXNGbxrxcCcbmVAx6HhuPjxZdBLbK_EDyRjP5zdYOe276InoihmI_y26ZF2KXCw0m7/exec";

const WHATSAPP_NUMBER = "916369787005";

const contactForm = document.getElementById("enquiryForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameInput = document.getElementById("formName");
        const phoneInput = document.getElementById("formPhone");
        const emailInput = document.getElementById("formEmail");
        const requirementInput = document.getElementById("formRequirement");
        const messageInput = document.getElementById("formMessage");
        const submitBtn = document.getElementById("submitBtn");

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const requirement = requirementInput.value;
        const message = messageInput.value.trim();

        /* Required field validation */
        if (!name || !phone || !requirement) {

            alert("Please fill in all required fields.");
            return;

        }

        /* Phone validation */
        const cleanPhone = phone.replace(/\D/g, "");

        if (cleanPhone.length < 10) {

            alert("Please enter a valid phone number.");
            phoneInput.focus();
            return;

        }

        /* Disable submit button */
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";

        const formData = {

            name: name,
            phone: phone,
            email: email,
            requirement: requirement,
            message: message

        };

        /* Send enquiry to Google Sheets */
        fetch(GOOGLE_SHEET_WEB_APP_URL, {

            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(formData)

        })

        .then(function () {

            /* WhatsApp message */
            const whatsappMessage =
                "*New Tamil Traders Enquiry*\n\n" +
                "*Name:* " + name + "\n" +
                "*Phone:* " + phone + "\n" +
                "*Email:* " + (email || "N/A") + "\n" +
                "*Requirement:* " + requirement + "\n" +
                "*Message:* " + (message || "N/A");

            const whatsappURL =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(whatsappMessage);

            alert(
                "Thank you, " +
                name +
                "!\n\nYour enquiry has been submitted successfully."
            );

            /* Open WhatsApp */
            window.open(whatsappURL, "_blank");

            /* Reset form */
            contactForm.reset();

            /* Restore button */
            submitBtn.disabled = false;
            submitBtn.innerText = "Submit Enquiry";

        })

        .catch(function (error) {

            console.error("Enquiry submission error:", error);

            alert(
                "Unable to submit your enquiry.\n\n" +
                "Please try again."
            );

            submitBtn.disabled = false;
            submitBtn.innerText = "Submit Enquiry";

        });

    });

}


    /* =====================================================
       BACK TO TOP BUTTON
       ===================================================== */

    const backToTop =
        document.createElement("button");

    backToTop.innerHTML = "↑";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    backToTop.title = "Back to top";

    backToTop.style.cssText = `
        position:fixed;
        right:20px;
        bottom:145px;
        width:48px;
        height:48px;
        border:none;
        border-radius:50%;
        background:#E0A41A;
        color:#01011A;
        font-size:25px;
        font-family:"Times New Roman",serif;
        font-weight:bold;
        cursor:pointer;
        z-index:997;
        display:none;
        align-items:center;
        justify-content:center;
        box-shadow:0 6px 20px rgba(0,0,0,.2);
        transition:.3s;
    `;

    document.body.appendChild(backToTop);


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                backToTop.style.display = "flex";

            } else {

                backToTop.style.display = "none";

            }

        }
    );


    backToTop.addEventListener(
        "mouseenter",
        function () {

            backToTop.style.transform =
                "translateY(-4px)";

        }
    );


    backToTop.addEventListener(
        "mouseleave",
        function () {

            backToTop.style.transform =
                "translateY(0)";

        }
    );


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       IMAGE LAZY LOADING
       ===================================================== */

    document.querySelectorAll("img").forEach(
        function (image) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }
    );


    /* =====================================================
       HERO PARALLAX EFFECT
       ===================================================== */

    const hero =
        document.querySelector(".hero");

    if (hero) {

        window.addEventListener(
            "scroll",
            function () {

                const scrollPosition =
                    window.scrollY;

                if (scrollPosition < 700) {

                    hero.style.backgroundPosition =
                        "center " +
                        (scrollPosition * 0.25) +
                        "px";

                }

            }
        );

    }


    /* =====================================================
       ESC KEY - CLOSE MOBILE MENU
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (navigation) {
                    navigation.classList.remove("show");
                }

                if (menuButton) {
                    menuButton.innerHTML = "☰";
                }

            }

        }
    );


    /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "Tamil Traders website loaded successfully."
    );

});