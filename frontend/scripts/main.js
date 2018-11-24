$(document).ready(function () {
   
    $("#left").load("/content/left.html")

    $.getJSON('/data/projects', function(data) {
        let i = 1;
        for (project of data.projects) {
            $("#proj-list").append(fillProject(project, i++))
        }
        addCollapseListeners()
    })
    
    
})

function fillProject(x, i) {
    let html = `<div id="proj-list-${i}" class="proj">\n`
    html += `<div class="proj-head">\n`
    html += `<div id="proj-name-${i}" class="head-font">${x.name.toUpperCase()}</div>\n`
    html += `<div id="dropdown-${i}" class="dropdown"></div>\n`
    html += `<div class="proj-tags">`
    for (let tag of x.tags)
        html += `<div class="proj-tag">${tag.toUpperCase()}</div>\n`
    html += `</div>\n</div>\n`
    html += `<div id="proj-cont-${i}" class="proj-cont">\n`
    html += x.description
    html += `</div>\n</div>`
    return html;
}

function addCollapseListeners() {
    let coll = document.getElementsByClassName("proj-head")

    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active")
            var content = this.nextElementSibling
            var icon = this.childNodes[3];
            console.log(this.childNodes)
            if (content.style.maxHeight){
                content.style.maxHeight = null
                content.style.padding = "0 0.5em"
                content.style.borderBottom = ".1em solid transparent"
                icon.style.borderTop = ".5em solid grey"
                icon.style.borderBottom = "none"
            } 
            else {
                content.style.padding = "0.5em"
                content.style.maxHeight = content.scrollHeight + "px"
                content.style.borderBottom = ".1em solid dimgrey"
                icon.style.borderBottom = ".5em solid grey"
                icon.style.borderTop = "none"
            } 
        });
    }
}