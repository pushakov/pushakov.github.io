
includeHTML()

fillJobs()


function fillJobs() {
    var jobs, template, jsonJobsData, xhttp;

    var request = new XMLHttpRequest();
    request.open("GET", "./jobs-data.json", false);
    request.send(null)
    
    jsonJobsData = JSON.parse(request.responseText)
    

    jobs = document.getElementById("jobs")
    
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./html-components/job-template.html", false);
    xhttp.send(null);
    template = xhttp.responseText
    
    for (let date in jsonJobsData){
        let wrap = document.createElement("div")
        wrap.innerHTML = template
        wrap.getElementsByClassName("date-from")[0].innerHTML = jsonJobsData[date].date_from
        wrap.getElementsByClassName("date-to")[0].innerHTML = jsonJobsData[date].date_to
        wrap.getElementsByClassName("job")[0].innerHTML = jsonJobsData[date].job
        wrap.getElementsByClassName("duties")[0].innerHTML = ""
        let duties = jsonJobsData[date].duties
        for (let duty in duties){
            let dutyDiv = document.createElement("div")
            dutyDiv.innerHTML = duties[duty]
            wrap.getElementsByClassName("duties")[0].appendChild(dutyDiv)
        }
        jobs.prepend(wrap)        
    }

}




// function from w3school https://www.w3schools.com/howto/howto_html_include.asp
function includeHTML() {
    var dom, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    dom = document.getElementsByTagName("*");
    for (let i = 0; i < dom.length; i++) {
        elmnt = dom[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}