document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const close = document.querySelector(".close");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const searchBar = document.getElementById("search-bar");
    const sortOptions = document.getElementById("sort-options");

    const images = [
        { src: "images/puppies.jpg", description: "Pets-puppies", metadata: "Location: Home" },
        { src: "images/kitten.jpg", description: "Pets-kitten", metadata: "Location: Home" },
        { src: "images/petbird.jpg", description: "Pets-Chirping bird", metadata: "Location: Home" },
        { src: "images/fishes.jpg", description: "Pets-Aquatic life", metadata: "Location: Home" },

        { src: "images/vts.jpg", description: "VTS office", metadata: "Location: Chennai" },
        { src: "images/google office.jpg", description: "Google office", metadata: "Location: Banglore" },
        { src: "images/microsoft office.jpg", description: "Microsoft office", metadata: "Location: Hyderabad" },

        { src: "images/biryani.jpg", description: "Food-Hyderabadi Biryani", metadata: "Location: Hyderabad" },
        { src: "images/baguettes.jpg", description: "Food-Baguettes", metadata: "Location: Paris" },
        { src: "images/vada pav.jpg", description: "Food-Vada Pav", metadata: "Location: Mumbai" },   
        { src: "images/thatte idli.jpg", description: "Food-Thatte Idli", metadata: "Location: Banglore" },
        { src: "images/dosa.jpg", description: "Food-South Indian Dosa", metadata: "Location: Hyderabad" },
        { src: "images/chicken sticks.jpg", description: "Food-Chicken Sticks", metadata: "Location: Vizag" },
        { src: "images/panipuri.jpg", description: "Food-North Indian Golgappa", metadata: "Location: Delhi" },
        { src: "images/sambhar.jpg", description: "Food-Sambhar", metadata: "Location: Chennai" },
        { src: "images/mutton.jpg", description: "Food-mutton", metadata: "Location: Nallamalla" },     
        { src: "images/puttu and kadala curry.jpg", description: "Food-Puttu Kadala Curry", metadata: "Location: Kerala" }, 
  

        { src: "images/bharathanatyam.jpg", description: "Dance-Bharthanatyam", metadata: "Location: Chennai" },
        { src: "images/kuchipudi.jpg", description: "Dance-Kuchipudi", metadata: "Location: Vizag" },
        { src: "images/kathakali.jpg", description: "Dance-Kathakali", metadata: "Location: kerala" },

        { src: "images/lion.jpg", description: "Wild Animal-Lion", metadata: "Location: Amazon forest" },
        { src: "images/tiger.jpg", description: "Wild animal-Tiger", metadata: "Location: Amazon forest" },
        { src: "images/elephant.jpg", description: "Wild animal-Elephant", metadata: "Location: Amazon forest" },
        { src: "images/leapord.jpg", description: "Wild animal-Leapord", metadata: "Location: Nallamalla" },

       
        { src: "images/goa.jpg", description: "Travel-Goa trip", metadata: "Location: Goa" },
        { src: "images/solo travel.jpg", description: "Travel-Peaceful me", metadata: "Location: Ladakh" },   
        { src: "images/flight take off.jpg", description: "Travel-First flight", metadata: "Location: Hyderabad" },
        { src: "images/road trip.jpg", description: "Travel-Ladakh Road trip", metadata: "Location: Ladakh" },

        { src: "images/onam.jpg", description: "Onam Festival", metadata: "Location: Kerala" },
        { src: "images/holi.jpg", description: "Holi Festival", metadata: "Location: Hyderabad" }, 
        { src: "images/diwali.jpg", description: "Diwali Festival", metadata: "Location: Home" }, 
        { src: "images/christmas.jpg", description: "Christamas Festival", metadata: "Location: Goa" }, 

 


        { src: "images/tajmahal.jpg", description: "Wonders-Tajmahal", metadata: "Location: Agra" },
        { src: "images/eiffel tower.jpg", description: "Wonders-Eiffel Tower", metadata: "Location: Paris" },
        { src: "images/charminar.jpg", description: "Wonders-Charminar", metadata: "Location: Hyderabad" },
        { src: "images/golden temple.jpg", description: "Wonders-Golden Temple", metadata: "Location: Amritsar" },
        { src: "images/qutub minar.jpg", description: "Wonders-Qutub Minar", metadata: "Location: Delhi" },
        { src: "images/india gate.jpg", description: "Wonders-India Gate", metadata: "Location: Delhi" },
        { src: "images/gate way of india.jpg", description: "Wonders-GateWay of India", metadata: "Location: Mumbai" },
        { src: "images/bangalore palace.jpg", description: "Wonders-Bangalore Palace", metadata: "Location: Banglore" },
        { src: "images/Srisailam temple.jpg", description: "Wonders-Srisailam Temple", metadata: "Location: Nallamalla" },


        { src: "images/sanjay national park.jpg", description: "Nature-Sanjay National Park", metadata: "Location: Mumbai" },
        { src: "images/lalbagh botanical park.jpg", description: "Nature-LalBagh Botanical Park", metadata: "Location: Banglore" },
        { src: "images/sunrise.jpg", description: "Nature-Sunrise", metadata: "Location: Kanyakumari" },
        { src: "images/araku valley.jpg", description: "Nature-Araku Valley", metadata: "Location: Vizag" },
        { src: "images/rishi konda.jpg", description: "Nature-Rishi Konda beach view", metadata: "Location: Vizag" },
        { src: "images/sunset.jpg", description: "Nature-Sunset", metadata: "Location: Kanyakumari" },
        { src: "images/mountains.jpg", description: "Nature-Kashmiri mountains", metadata: "Location: Kashmir" },
        { src: "images/forest.jpg", description: "Nature-Nallamalla forest", metadata: "Location: Nallamalla" },
        { src: "images/mallela theertham.jpg", description: "Nature-Mallela Theertham", metadata: "Location: Nallamalla" },
        { src: "images/marina beach.jpg", description: "Nature-Marina beach", metadata: "Location: Chennai" },

        { src: "images/women paint.jpg", description: "Art-Women paint", metadata: "Location: Paris" },
        { src: "images/eye art.jpg", description: "Art-Pain in eyes", metadata: "Location: Paris" },
        { src: "images/mona lisa.jpg", description: "Art-Mona Lisa", metadata: "Location: Banglore" },

    ];

    let currentImageIndex = 0;
    let currentFilter = "";
    let currentSort = "description";

    function displayImages(filter = "", sort = "description") {
        gallery.innerHTML = "";

        const filteredImages = images.filter(image =>
            image.description.toLowerCase().includes(filter.toLowerCase()) ||
            image.metadata.toLowerCase().includes(filter.toLowerCase())
        );

        filteredImages.sort((a, b) => {
            if (a[sort].toLowerCase() < b[sort].toLowerCase()) {
                return -1;
            }
            if (a[sort].toLowerCase() > b[sort].toLowerCase()) {
                return 1;
            }
            return 0;
        });

        const fragment = document.createDocumentFragment();
        filteredImages.forEach((image, index) => {
            const img = document.createElement("img");
            img.src = image.src;
            img.alt = image.description;
            img.dataset.index = images.indexOf(image);
            img.addEventListener("click", openLightbox);
            fragment.appendChild(img);
        });

        gallery.appendChild(fragment);
    }

    function openLightbox(event) {
        currentImageIndex = parseInt(event.target.dataset.index);
        lightbox.style.display = "block";
        lightboxImg.src = images[currentImageIndex].src;
        lightboxCaption.innerText = images[currentImageIndex].description + " - " + images[currentImageIndex].metadata;
    }

    function closeLightbox() {
        lightbox.style.display = "none";
    }

    function changeImage(step) {
        currentImageIndex += step;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        lightboxImg.src = images[currentImageIndex].src;
        lightboxCaption.innerText = images[currentImageIndex].description + " - " + images[currentImageIndex].metadata;
    }

    searchBar.addEventListener("input", (e) => {
        currentFilter = e.target.value;
        displayImages(currentFilter, currentSort);
    });

    sortOptions.addEventListener("change", (e) => {
        currentSort = e.target.value;
        displayImages(currentFilter, currentSort);
    });

    close.addEventListener("click", closeLightbox);
    prev.addEventListener("click", () => changeImage(-1));
    next.addEventListener("click", () => changeImage(1));

    displayImages();
});
