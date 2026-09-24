/* =========================================
   KL-STEAM
   JavaScript
========================================= */


/* =========================================
   DEFAULT VIDEOS
========================================= */

const defaultVideos = [

    {
        id: 1,

        title: "Big Buck Bunny",

        category: "Movies",

        image: "https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg",

        url: "https://www.youtube.com/embed/aqz-KE-bpKQ",

        description: "A popular animated short film."
    },


    {
        id: 2,

        title: "Technology Video",

        category: "Technology",

        image: "https://i.ytimg.com/vi/aircAruvnKk/hqdefault.jpg",

        url: "https://www.youtube.com/embed/aircAruvnKk",

        description: "An educational technology video."
    },


    {
        id: 3,

        title: "Live News",

        category: "Live",

        image: "https://i.ytimg.com/vi/21X5lGlDOfg/hqdefault.jpg",

        url: "https://www.youtube.com/embed/21X5lGlDOfg",

        description: "Sample live content from YouTube."
    }
   {
    id: 8,
    title: "Dragon Glimpse - Telugu",
    category: "Movies",
    image: "",
    url: "https://www.youtube.com/embed/FlOzIM7Yov4",
    description: "Dragon Glimpse - Telugu."
},

{
    id: 9,
    title: "The Paradise - Teaser",
    category: "Movies",
    image: "",
    url: "https://www.youtube.com/embed/yX90gF4_EjI",
    description: "The Paradise official teaser."
},

{
    id: 10,
    title: "PUBG Trailer",
    category: "Movies",
    image: "",
    url: "https://www.youtube.com/embed/uCd6tbUAy6o",
    description: "PUBG trailer."
},

{
    id: 11,
    title: "Assassin's Creed Revelations - Trailer",
    category: "Movies",
    image: "",
    url: "https://www.youtube.com/embed/HMsbMK9Odoc",
    description: "Assassin's Creed Revelations trailer."
},

{
    id: 12,
    title: "Introduction to Data Science",
    category: "Technology",
    image: "",
    url: "https://www.youtube.com/embed/gDZ6czwuQ18",
    description: "An introduction to data science."
},

{
    id: 13,
    title: "Artificial Intelligence",
    category: "Technology",
    image: "",
    url: "https://www.youtube.com/embed/JMUxmLyrhSk",
    description: "An introduction to artificial intelligence."
},

{
    id: 14,
    title: "NVIDIA",
    category: "Technology",
    image: "",
    url: "https://www.youtube.com/embed/1tRTWwZ5DIc",
    description: "NVIDIA technology and developments."
}

];


/* =========================================
   INITIAL LOCAL STORAGE
========================================= */

if (!localStorage.getItem("users")) {

    localStorage.setItem(
        "users",
        JSON.stringify([])
    );

}


if (!localStorage.getItem("videos")) {

    localStorage.setItem(
        "videos",
        JSON.stringify(defaultVideos)
    );

}


/* =========================================
   LOGIN / SIGNUP PAGE
========================================= */

function showSignup() {

    document
        .getElementById("loginSection")
        .classList.add("hidden");


    document
        .getElementById("signupSection")
        .classList.remove("hidden");

}


function showLogin() {

    document
        .getElementById("signupSection")
        .classList.add("hidden");


    document
        .getElementById("loginSection")
        .classList.remove("hidden");

}


/* =========================================
   SIGNUP
========================================= */

function signup() {

    let name =
        document
        .getElementById("signupName")
        .value
        .trim();


    let email =
        document
        .getElementById("signupEmail")
        .value
        .trim();


    let password =
        document
        .getElementById("signupPassword")
        .value;


    if (
        name === "" ||
        email === "" ||
        password === ""
    ) {

        document
            .getElementById("signupMessage")
            .textContent =
            "Please fill all fields.";

        return;
    }


    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    let existingUser =
        users.find(function(user) {

            return user.email === email;

        });


    if (existingUser) {

        document
            .getElementById("signupMessage")
            .textContent =
            "Email already registered.";

        return;
    }


    let newUser = {

        name: name,

        email: email,

        password: password,

        watchlist: []

    };


    users.push(newUser);


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    document
        .getElementById("signupMessage")
        .textContent =
        "Signup successful. Please login.";


    document
        .getElementById("signupName")
        .value = "";


    document
        .getElementById("signupEmail")
        .value = "";


    document
        .getElementById("signupPassword")
        .value = "";

}


/* =========================================
   LOGIN
========================================= */

function login() {

    let email =
        document
        .getElementById("loginEmail")
        .value
        .trim();


    let password =
        document
        .getElementById("loginPassword")
        .value;


    /* ADMIN LOGIN */

    if (
        email === "admin@klsteam.com" &&
        password === "admin123"
    ) {

        let admin = {

            name: "Administrator",

            email: email,

            role: "admin"

        };


        localStorage.setItem(
            "currentUser",
            JSON.stringify(admin)
        );


        window.location.href =
            "admin.html";


        return;
    }


    /* USER LOGIN */

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    let user =
        users.find(function(user) {

            return (
                user.email === email &&
                user.password === password
            );

        });


    if (user) {

        let currentUser = {

            name: user.name,

            email: user.email,

            role: "user",

            watchlist: user.watchlist || []

        };


        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );


        window.location.href =
            "home.html";

    }

    else {

        document
            .getElementById("loginMessage")
            .textContent =
            "Invalid email or password.";

    }

}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
        "index.html";

}


/* =========================================
   GET VIDEOS
========================================= */

function getVideos() {

    return JSON.parse(
        localStorage.getItem("videos")
    ) || [];

}


/* =========================================
   HOME PAGE
========================================= */

function displayVideos() {

    let videoList =
        document.getElementById(
            "videoList"
        );


    if (!videoList) {

        return;

    }


    let search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    let category =
        document
        .getElementById("categoryFilter")
        .value;


    let videos = getVideos();


    let filteredVideos =
        videos.filter(function(video) {

            let searchMatch =
                video.title
                .toLowerCase()
                .includes(search);


            let categoryMatch =
                category === "All" ||
                video.category === category;


            return (
                searchMatch &&
                categoryMatch
            );

        });


    if (filteredVideos.length === 0) {

        videoList.innerHTML =
            "<p>No videos found.</p>";

        return;

    }


    videoList.innerHTML =
        filteredVideos
        .map(createVideoCard)
        .join("");

}


/* =========================================
   VIDEO CARD
========================================= */

function createVideoCard(video) {

    return `

        <div class="video-card">

            <img
                src="${video.image}"
                alt="${video.title}"
            >

            <div class="content">

                <h3>
                    ${video.title}
                </h3>

                <p>
                    Category: ${video.category}
                </p>

                <p>
                    ${video.description}
                </p>


                <button
                    onclick="watchVideo(${video.id})"
                >
                    Watch Now
                </button>


                <button
                    onclick="addToWatchlist(${video.id})"
                >
                    Add to Watchlist
                </button>

            </div>

        </div>

    `;

}


/* =========================================
   WATCH VIDEO
========================================= */

function watchVideo(id) {

    window.location.href =
        "watch.html?id=" + id;

}


/* =========================================
   WATCH PAGE
========================================= */

function loadWatchPage() {

    let parameters =
        new URLSearchParams(
            window.location.search
        );


    let id =
        Number(
            parameters.get("id")
        );


    if (!id) {

        return;

    }


    let videos = getVideos();


    let video =
        videos.find(function(video) {

            return video.id === id;

        });


    if (!video) {

        return;

    }


    document
        .getElementById("watchTitle")
        .textContent =
        video.title;


    document
        .getElementById("watchDescription")
        .textContent =
        video.description;


    document
        .getElementById("videoPlayer")
        .src =
        video.url;

}


function goHome() {

    window.location.href =
        "home.html";

}


/* =========================================
   WATCHLIST
========================================= */

function addToWatchlist(id) {

    let currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    if (!currentUser) {

        return;

    }


    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    let userIndex =
        users.findIndex(function(user) {

            return (
                user.email ===
                currentUser.email
            );

        });


    if (userIndex === -1) {

        return;

    }


    if (
        !users[userIndex].watchlist
            .includes(id)
    ) {

        users[userIndex]
            .watchlist
            .push(id);


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        alert(
            "Video added to watchlist."
        );

    }

    else {

        alert(
            "Video is already in your watchlist."
        );

    }

}


/* =========================================
   DISPLAY WATCHLIST
========================================= */

function displayWatchlist() {

    let list =
        document.getElementById(
            "watchlist"
        );


    if (!list) {

        return;

    }


    let currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    if (!currentUser) {

        return;

    }


    let users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        ) || [];


    let user =
        users.find(function(user) {

            return (
                user.email ===
                currentUser.email
            );

        });


    if (!user) {

        return;

    }


    let videos = getVideos();


    let watchlistVideos =
        videos.filter(function(video) {

            return user.watchlist
                .includes(video.id);

        });


    if (watchlistVideos.length === 0) {

        list.innerHTML =
            "<p>Your watchlist is empty.</p>";

        return;

    }


    list.innerHTML =
        watchlistVideos
        .map(createWatchlistCard)
        .join("");

}


/* =========================================
   WATCHLIST CARD
========================================= */

function createWatchlistCard(video) {

    return `

        <div class="video-card">

            <img
                src="${video.image}"
                alt="${video.title}"
            >

            <div class="content">

                <h3>
                    ${video.title}
                </h3>

                <p>
                    Category: ${video.category}
                </p>

                <p>
                    ${video.description}
                </p>


                <button
                    onclick="watchVideo(${video.id})"
                >
                    Watch Now
                </button>

            </div>

        </div>

    `;

}


/* =========================================
   RECOMMENDATIONS
========================================= */

function displayRecommendations() {

    let list =
        document.getElementById(
            "recommendationList"
        );


    if (!list) {

        return;

    }


    let videos = getVideos();


    let currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    if (!currentUser) {

        return;

    }


    let users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        ) || [];


    let user =
        users.find(function(user) {

            return (
                user.email ===
                currentUser.email
            );

        });


    if (!user) {

        return;

    }


    let recommendations =
        videos.filter(function(video) {

            return !user.watchlist
                .includes(video.id);

        });


    list.innerHTML =
        recommendations
        .slice(0, 3)
        .map(createVideoCard)
        .join("");

}


/* =========================================
   ADMIN
========================================= */

function addVideo() {

    let title =
        document
        .getElementById("videoTitle")
        .value
        .trim();


    let category =
        document
        .getElementById("videoCategory")
        .value;


    let url =
        document
        .getElementById("videoUrl")
        .value
        .trim();


    let description =
        document
        .getElementById("videoDescription")
        .value
        .trim();


    if (
        title === "" ||
        category === "" ||
        url === "" ||
        description === ""
    ) {

        document
            .getElementById("adminMessage")
            .textContent =
            "Please fill all fields.";

        return;

    }


    /*
       We use the YouTube video ID
       to automatically create
       the thumbnail.
    */


    let videoId =
        getYouTubeId(url);


    if (!videoId) {

        document
            .getElementById("adminMessage")
            .textContent =
            "Please enter a valid YouTube URL.";

        return;

    }


    let videos = getVideos();


    let newVideo = {

        id: Date.now(),

        title: title,

        category: category,

        image:
            "https://i.ytimg.com/vi/"
            + videoId
            + "/hqdefault.jpg",

        url:
            "https://www.youtube.com/embed/"
            + videoId,

        description: description

    };


    videos.push(newVideo);


    localStorage.setItem(
        "videos",
        JSON.stringify(videos)
    );


    document
        .getElementById("adminMessage")
        .textContent =
        "Video added successfully.";


    document
        .getElementById("videoTitle")
        .value = "";


    document
        .getElementById("videoCategory")
        .value = "";


    document
        .getElementById("videoUrl")
        .value = "";


    document
        .getElementById("videoDescription")
        .value = "";


    displayAdminVideos();

}


/* =========================================
   YOUTUBE ID
========================================= */

function getYouTubeId(url) {

    let match =
        url.match(
            /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?\/]+)/
        );


    if (match) {

        return match[1];

    }


    return null;

}


/* =========================================
   ADMIN VIDEO LIST
========================================= */

function displayAdminVideos() {

    let list =
        document.getElementById(
            "adminVideoList"
        );


    if (!list) {

        return;

    }


    let videos = getVideos();


    list.innerHTML =
        videos.map(function(video) {

            return `

                <div class="admin-item">

                    <div>

                        <strong>
                            ${video.title}
                        </strong>

                        <br>

                        <small>
                            ${video.category}
                        </small>

                    </div>


                    <button
                        onclick="deleteVideo(${video.id})"
                    >
                        Delete
                    </button>

                </div>

            `;

        }).join("");

}


/* =========================================
   DELETE VIDEO
========================================= */

function deleteVideo(id) {

    let videos =
        getVideos().filter(
            function(video) {

                return video.id !== id;

            }
        );


    localStorage.setItem(
        "videos",
        JSON.stringify(videos)
    );


    displayAdminVideos();

}


/* =========================================
   PAGE SECURITY
========================================= */

window.addEventListener(
    "load",
    function() {

        let currentUser =
            JSON.parse(
                localStorage.getItem(
                    "currentUser"
                )
            );


        let page =
            window.location.pathname;


        /* USER HOME */

        if (
            page.endsWith("home.html")
        ) {

            if (
                !currentUser ||
                currentUser.role !== "user"
            ) {

                window.location.href =
                    "index.html";

                return;

            }


            displayVideos();

            displayRecommendations();

        }


        /* WATCHLIST */

        if (
            page.endsWith(
                "watchlist.html"
            )
        ) {

            if (
                !currentUser ||
                currentUser.role !== "user"
            ) {

                window.location.href =
                    "index.html";

                return;

            }


            displayWatchlist();

        }


        /* WATCH */

        if (
            page.endsWith("watch.html")
        ) {

            if (
                !currentUser ||
                currentUser.role !== "user"
            ) {

                window.location.href =
                    "index.html";

                return;

            }


            loadWatchPage();

        }


        /* ADMIN */

        if (
            page.endsWith("admin.html")
        ) {

            if (
                !currentUser ||
                currentUser.role !== "admin"
            ) {

                window.location.href =
                    "index.html";

                return;

            }


            displayAdminVideos();

        }

    }
);
