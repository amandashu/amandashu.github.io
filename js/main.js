var blue = "#5895C8";
var gold = "#daa520";

function addProject (project, projectId, rowId) {
    // outer div
    const newOuterDiv = document.createElement("div");
    newOuterDiv.classList.add('col-md-4', 'd-flex', 'align-items-center', 'flex-column', 'px-3', 'project');

    // inner div for card
    const newDivCard = document.createElement("div");
    newDivCard.classList.add('py-3', 'px-2', 'btn', 'project');
    newDivCard.style.boxShadow = "5px 8px 15px #D0D1D1";
    newDivCard.style.height = "275px";
    newDivCard.style.width = "95%";
    newDivCard.id = "card-" + projectId;
    newDivCard.style.backgroundColor="white";
    newDivCard.style.borderRadius= "5px";
    newDivCard.style.border = "solid";
    newDivCard.style.borderWidth= "5px";
    newDivCard.style.borderColor = "white";
    newDivCard.style.borderTopColor = blue;
    newDivCard.style.transition = "transform .2s"

    // event listeners to hover over cards
    newDivCard.addEventListener("mouseenter", 
        function(){
            newDivCard.style.transform= "scale(1.1)"
        }
    );
    newDivCard.addEventListener("mouseleave", 
        function(){
            newDivCard.style.transform= "scale(1)"
        }
    );

    // onclick fill in content and close content if open
    newDivCard.addEventListener("click",
    function(){
        // same content element but using jquery vs javascript
        let contentRow = $('*[id^="contentRow-' + rowId + '"]').first();
        let divContent = document.querySelectorAll('*[id^="contentRow-' +rowId + '"]')[0];

        // get id from content, -1 if not set yet
        let contentProjId = contentRow.attr("id");
        if (contentProjId.split('-').length -1 >=2){
            contentProjId = contentProjId.substring(contentProjId.lastIndexOf("-")+1, contentProjId.length);
        } else {
            contentProjId = -1;
        }

        // get id of clicked card
        let clickId = newDivCard.id;
        clickId =  clickId.substring(clickId.lastIndexOf("-")+1, clickId.length);

        // array of all cards
        let allCards =  document.querySelectorAll('*[id^="card-"]');

        // if content id matches clicked id and the content is opened
        if (contentRow.hasClass("show") && clickId == contentProjId){
            contentRow.collapse('hide');
            newDivCard.style.borderBottomColor = "white";
            divContent.style.borderTopColor = "white";
        } 
        else { 
            // delete children of content, replace with new content, and give content a new id
            let newID = "contentRow-" + rowId + "-" + projectId;
            divContent.id = newID;
            while (divContent.firstChild) {
                divContent.removeChild(divContent.firstChild);
            }
            addProjectContent(project, divContent);

            // open content with gold bottom/top borders
            $("#" +newID).collapse('show');
            newDivCard.style.borderBottomColor = gold;
            divContent.style.borderTopColor = gold;

            // make all other cards white border if click on different card within the same row
            for (var i = 0; i < allCards.length; i++){
                if (Math.floor(i/3) == rowId){
                    if (i != clickId) { 
                        document.getElementById("card-"+i).style.borderBottomColor = "white";
                    }
                }
            }

        }
    });

    // image
    const newImg = document.createElement("IMG");
    newImg.style.height = "200px";
    newImg.style.width="90%";
    newImg.style.objectFit = "cover";
    newImg.style.backgroundPosition = "50% 50%";
    newImg.classList.add('mx-auto', 'd-block')
    newImg.src = project.Image;

    // title
    const newTitle = document.createElement("p")
    newTitle.innerText = project.Title;
    newTitle.classList.add('h6', 'my-2','text-center')
    
    // put card together
    newDivCard.appendChild(newImg);
    newDivCard.appendChild(newTitle);
    newOuterDiv.appendChild(newDivCard);

    // add project to specified row
    const currentDiv = document.getElementById("projectRow-" + rowId);
    currentDiv.appendChild(newOuterDiv);
}

function addRows (i) {
    // new row for project cards
    const newDivProject = document.createElement("div");
    newDivProject.classList.add('row', 'align-items-center', 'my-3', 'py-3', 'px-5');
    newDivProject.id = "projectRow-" + i;

    // row for content
    const newDivContent = document.createElement("div")
    newDivContent.classList.add('py-3', 'px-5', 'mx-5', 'collapse');
    newDivContent.style.backgroundColor = "white"
    newDivContent.id = "contentRow-" + i;
    newDivContent.style.border = "solid";
    newDivContent.style.borderWidth= "5px";
    newDivContent.style.borderColor = "white";
    newDivContent.style.borderTopColor = gold;


    // add new rows to projects div
    const currentDiv = document.getElementById("projects");
    currentDiv.appendChild(newDivProject);
    currentDiv.appendChild(newDivContent)
}

function addProjectContent(project, divContent) {
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
    divContent.appendChild(newDescription);
    divContent.appendChild(newSpanSKLabel);
    divContent.appendChild(newSpanSK);
    divContent.appendChild(document.createElement("br"));
    divContent.appendChild(newSpanCatLabel);
    divContent.appendChild(newSpanCat);
    divContent.appendChild(document.createElement("br"));

    // buttons
    let linkKeys = Object.keys(project['Links'])
    for (var i = 0; i < linkKeys.length; i++){
        const button = document.createElement("a");
        button.classList.add('btn', 'btn-primary', 'btn-sm', 'mt-2');
        button.style.marginRight = "5px";
        button.style.borderColor = blue;
        button.style.backgroundColor = blue;
        button.style.color = "white";
        button.setAttribute("role","button");
        button.innerText = linkKeys[i].toUpperCase();
        button.href = project['Links'][linkKeys[i]];
        button.target="_blank";
        divContent.appendChild(button)
    }    
}

// function to load json 
async function loadJSON(path) {
	let response = await fetch(path);
	let dataset = await response.json(); 
	return dataset;
}

// fill html page with project cards and info
let project = loadJSON("./projects/projects.json");
project.then(
    function(p){
        projKeys = Object.keys(p);
        numProjects = projKeys.length;
        numRows = Math.ceil(numProjects/3);

        for (var i = 0; i < numProjects; i++){
            let f = Math.floor(i/3);
            if (i%3 == 0) {
                addRows(f)
            }
            key = projKeys[i]
            addProject(p[key], i, f)
        }
    }
);

// nav bar scroll event listener
window.addEventListener("scroll", function() {
    var home = document.getElementById("home");
    if (window.scrollY > (home.offsetTop + home.offsetHeight)) {
        document.getElementById('my-navbar').style.backgroundColor = blue;
        let navElems = document.querySelectorAll('.navbar-nav a');
        for (var i = 0; i < navElems.length; i++){
            navElems[i].style.color = "white"
        }                
    }
    else {
        document.getElementById('my-navbar').style.backgroundColor = "transparent";
        let navElems = document.querySelectorAll( '.navbar-nav a' );
        for (var i = 0; i < navElems.length; i++){
            navElems[i].style.color = "white"
        }
    }
});

// collapse all open content if you click outside of any card or content
$(document).click(function(e) {
    if (!$(e.target.parentNode).is('.collapse') && !$(e.target).is('.collapse') && 
        !$(e.target.parentNode).is('.project') && !$(e.target).is('.project')) {
        $('.collapse').collapse('hide');
        
        $('*[id^="card-"]').css("borderBottomColor","white");
        $('*[id^="contentRow-"]').css("borderTopColor","white");
    }
});