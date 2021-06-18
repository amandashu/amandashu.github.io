var blue = "#5895C8";
var gold = "#daa520";
var controller = new ScrollMagic.Controller();

function addProject(project, projectId) {
    // new project div
    const newProjectDiv = document.createElement("div");
    newProjectDiv.id = "project-" + projectId;
    newProjectDiv.classList.add('row', 'my-3', 'py-3', 'align-items-center');

    // new image div
    const newImageDiv = document.createElement("div");
    newImageDiv.classList.add('col-md-4');

    // new description div
    const newDescDiv = document.createElement("div");
    newDescDiv.classList.add('col-md-8');

    // create image
    const newImg = document.createElement("IMG");
    newImg.style.width = "100%"
    newImg.style.objectFit = "cover";
    newImg.style.backgroundPosition = "50% 50%";
    newImg.classList.add('mx-auto', 'd-block', 'img-responsive')
    newImg.src = project.Image;

    // title
    const newTitle = document.createElement("p")
    newTitle.innerText = project.Title;
    newTitle.classList.add('h6', 'my-2')

    // description
    const newDescription = document.createElement("p");
    newDescription.innerText = project.Description;

    // skills/tools
    const newSpanSKLabel = document.createElement("span");
    newSpanSKLabel.innerText = "Skills/Tools: ";
    const newSpanSK = document.createElement("span");
    newSpanSK.innerText = project["Skills/Tools"];

    // categories
    const newSpanCatLabel = document.createElement("span");
    newSpanCatLabel.innerText = "Categories: ";
    const newSpanCat = document.createElement("span");
    newSpanCat.innerText = project.Categories;

    // put it all together
    newDescDiv.appendChild(newTitle);
    newDescDiv.appendChild(newDescription);
    newDescDiv.appendChild(newSpanSKLabel);
    newDescDiv.appendChild(newSpanSK);
    newDescDiv.appendChild(document.createElement("br"));
    newDescDiv.appendChild(newSpanCatLabel);
    newDescDiv.appendChild(newSpanCat);
    newDescDiv.appendChild(document.createElement("br"));

    // buttons
    let linkKeys = Object.keys(project['Links'])
    for (var i = 0; i < linkKeys.length; i++) {
        const button = document.createElement("a");
        button.classList.add('btn', 'btn-primary', 'btn-sm', 'mt-2');
        button.style.marginRight = "5px";
        button.style.borderColor = blue;
        button.style.backgroundColor = blue;
        button.style.color = "white";
        button.setAttribute("role", "button");
        button.innerText = linkKeys[i].toUpperCase();
        button.href = project['Links'][linkKeys[i]];
        button.target = "_blank";
        newDescDiv.appendChild(button)
    }

    // put together project row
    newImageDiv.appendChild(newImg);
    newProjectDiv.appendChild(newImageDiv)
    newProjectDiv.appendChild(newDescDiv)

    // add project 
    projectouterDiv = document.getElementById("projects")
    projectouterDiv.appendChild(newProjectDiv);

    // animate borders on scroll
    new ScrollMagic.Scene({
        triggerElement: "#project-" + projectId,
        duration: 275
    })
        .setClassToggle("#project-" + projectId, "active")
        .addTo(controller);
}

// function to load json
async function loadJSON(path) {
    let response = await fetch(path);
    let dataset = await response.json();
    return dataset;
}

// fill html page with project 
let project = loadJSON("./projects/projects.json");
project.then(
    function (p) {
        projKeys = Object.keys(p);
        numProjects = projKeys.length;

        for (var i = 0; i < numProjects; i++) {
            key = projKeys[i]
            addProject(p[key], i)
        }
    }
);

// nav bar scroll event listener
window.addEventListener("scroll", function () {
    var home = document.getElementById("home");
    if (window.scrollY > (home.offsetTop + home.offsetHeight)) {
        document.getElementById('my-navbar').style.backgroundColor = blue;
        let navElems = document.querySelectorAll('.navbar-nav a');
        for (var i = 0; i < navElems.length; i++) {
            navElems[i].style.color = "white"
        }
    }
    else {
        document.getElementById('my-navbar').style.backgroundColor = "transparent";
        let navElems = document.querySelectorAll('.navbar-nav a');
        for (var i = 0; i < navElems.length; i++) {
            navElems[i].style.color = "white"
        }
    }
});


// about timeline animation
var aboutAnime = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750,
    autoplay: false
})
    .add({
        targets: '#p1',
        translateX: -50,
        opacity: 1
    })
    .add({
        targets: '#p2',
        translateX: -50,
        opacity: 1
    })
    .add({
        targets: '#p3',
        translateX: -50,
        opacity: 1
    });

new ScrollMagic.Scene({
    triggerElement: '#about',
    triggerHook: 1
})
    .on("enter", function (event) {
        aboutAnime.play();
    })
    .addTo(controller);

// footer animation
const footerAnime = anime({
    targets: '#footer',
    scaleY: 1,
    easing: 'easeOutExpo',
    duration: 700,
    autoplay: false,
});

new ScrollMagic.Scene({
    triggerElement: '#footer',
    triggerHook: 1
})
    .on("enter", function (event) {
        footerAnime.play();
    })
    .addTo(controller);
