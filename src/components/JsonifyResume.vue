<template>
    <div class="jsonify">
        <section class="contact-form">
            <h1>JSONify your Resume</h1>
            <p>Generate your JSON for Resume</p>
            <div class="grid-container">
                <div class="grid-child purple">
                    <form id="myForm">
                        <div class="input-group">
                            <label for="name">Your unique ID</label>
                            <input id="id" name="id" type="text" />
                        </div>

                        <div class="input-group">
                            <label for="name">Full Name</label>
                            <input id="name" name="basic" type="text" />
                        </div>

                        <div class="input-group">
                            <label for="email">Email Address</label>
                            <input id="email" name="basic" type="email" />
                        </div>

                        <div class="input-group">
                            <label for="phone">Phone Number</label>
                            <input id="phone" name="basic" type="text" />
                        </div>

                        <div class="input-group">
                            <label for="address">Home Address</label>
                            <input id="address" name="basic" type="text" />
                        </div>

                        <div class="input-group">
                            <label for="linkedin">LinkedIn</label>
                            <input id="linkedin" name="basic" type="text" />
                        </div>

                        <div class="input-group">
                            <label for="summary">Profile Summary</label>
                            <textarea id="summary" name="basic" rows="6" cols="65"></textarea>
                        </div>

                        <div class="input-group">
                            <label for="skill">Skills</label>
                            <input id="skill" name="basic" type="text" />
                        </div>

                        <div class="input-group">
                            <label for="language">Languages</label>
                            <input id="language" name="basic" type="text" />
                        </div>

                        <div class="input-group">

                            <div id="job-group">
                                Work Experience
                                <font-awesome-icon id="job-duplicator" icon="fa-solid fa-plus"
                                    @click="Duplicate($event)" class="button-plus" />
                                <br>
                                <label for="company-name">Company Name

                                    <!-- <font-awesome-icon icon="fa-solid fa-xmark" @click="closeGroup($event)"
                                        class="button-close" /> -->
                                </label>
                                <input id="company-name" name="work" />
                                <label for="job-role">Job Role/Position</label>
                                <input id="job-role" name="work" />
                                <div class="grid-fromto">
                                    <div class="grid-from">
                                        <label for="work-time-from">From</label>
                                        <input id="work-time-from" name="work" />
                                    </div>
                                    <div class="grid-to">
                                        <label for="work-time-to">To</label>
                                        <input id="work-time-to" name="work" />
                                    </div>
                                </div>
                                <label for="job-description">Role Description</label>
                                <textarea id="job-description" name="work" rows="6" cols="65"></textarea>
                            </div>
                        </div>

                        <div class="input-group">
                            <div id="edu-group">
                                Education Background
                                <font-awesome-icon id="edu-duplicator" icon="fa-solid fa-plus"
                                    @click="Duplicate($event)" class="button-plus" />

                                <br>
                                <label for="education-institution">Institution Name

                                    <!-- <font-awesome-icon icon="fa-solid fa-xmark" @click="closeGroup($event)"
                                        class="button-close" /> -->
                                </label>
                                <input id="education-institution" name="education" />
                                <label for="education-course">Course</label>
                                <input id="education-course" name="education" />
                                <div class="grid-fromto">
                                    <div class="grid-from">
                                        <label for="education-time-from">From</label>
                                        <input id="education-time-from" name="education" />
                                    </div>
                                    <div class="grid-to">
                                        <label for="education-time-to">To</label>
                                        <input id="education-time-to" name="education" />
                                    </div>
                                </div>
                                <label for="education-description">Description</label>
                                <textarea id="education-description" name="education" rows="6" cols="65"></textarea>
                            </div>
                        </div>

                        <div class="input-group">
                            <button class="btn-submit" type="submit">Generate!</button>
                        </div>

                    </form>
                </div>
                <div class="grid-child green">
                    <div class="results">
                        <h2 style="display:inline-block;margin-left: 15%;">JSON Resume Output</h2>

                        <p id="notify-copy">Copied!</p>

                        <font-awesome-icon title="Upload JSON to Database" id="button-upload" icon="fa-solid fa-upload"
                            @click="uploadJSON()" class="button-upload" />
                        
                        <font-awesome-icon title="Copy JSON to clipboard" id="button-copy" icon="fa-solid fa-copy"
                            @click="copyJSON()" class="button-copy" />

                        <pre id="results-text"></pre>
                    </div>
                </div>
            </div>
        </section>
        <div id="app">
        </div>


    </div>
</template>

<script>
import axios from 'axios';
var stringifyOutside = "";
var JSONoutside = {};
//const JSONDB = "http://localhost:3000/user";
const JSONDB = "https://api.npoint.io/a1977e9ffee4d9de5da8/user";

export default {
    name: 'JsonifyResume',
    async created() {
    try {

       const res = await axios.get(JSONDB);

      this.todos = res.data;
    } catch (e) {
      console.error(e);
    }
  },
    methods: {
        async uploadJSON() 
        {
            const text="Are you sure to add this to database?"
            var ref = this;
            try 
            {
                if(confirm(text))
                {
                    const res = await axios.post(JSONDB, JSONoutside);
                }
            } 
            catch (e) {
                console.error(e);
            }
        },
        copyJSON() {
            document.getElementById("notify-copy").style.visibility = 'visible';
            const results = document.querySelector('.results pre');
            var range = document.createRange();
            range.selectNodeContents(results);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            document.execCommand("copy");
            sel.removeAllRanges();
            console.log(sel.toString);

        },
        Duplicate(e) {
            console.log(e.target.id);
            if (e.target.id == "edu-duplicator") {
                var parentGroup = document.querySelector('#edu-group');
            }
            else if (e.target.id == "job-duplicator") {
                var parentGroup = document.querySelector('#job-group');
            }
            var cloneGroup = parentGroup.cloneNode(true);
            cloneGroup.id = parentGroup.id;
            parentGroup.parentNode.appendChild(cloneGroup);
        },

        // closeGroup(e) {
        //     var text = "Are you sure to delete this field?";
        //     var textWarn = "Deleting this last field will not include in your resume. Continue?"

        //     //console.log(e.target.id.parentNode.parentNode);
        //     console.log(e.target.parentNode.parentNode.id);
        //     console.log(e.target.parentElement.parentElement.id);
        //     //console.log(e.target.parentNode.parentNode);

        //     // if ($('#' + e.target.parentElement.parentElement.id + ' div').length > 3) {
        //     //     if (confirm(text)) {
        //     //         e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement)
        //     //     }
        //     // }
        //     // else {
        //     if (confirm(textWarn)) {
        //         e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement)
        //     }
        //     // }
        // }
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const formJSON = Object.fromEntries(data);


    const work = [];
    const education = [];
    var basic = {};
    var workInput = {};
    var eduInput = {};
    var i = 0;

    for (const pair of data) {
        if (pair[0] == 'basic') {
            switch (i) {
                case 0:
                    basic.name = pair[1];
                    break;
                case 1:
                    basic.email = pair[1];
                    break;
                case 2:
                    basic.phone = pair[1];
                    break;
                case 3:
                    basic.address = pair[1];
                    break;
                case 4:
                    basic.linkedin = pair[1];
                    break;
                case 5:
                    basic.summary = pair[1];
                    break;
                case 6:
                    basic.skill = pair[1];
                    break;
                case 7:
                    basic.language = pair[1];
                    i = -1;
                    break;
            }
            i++;
        }
        else if (pair[0] == 'work') {
            switch (i) {
                case 0:
                    workInput.company = pair[1];
                    break;
                case 1:
                    workInput.jobtitle = pair[1];
                    break;
                case 2:
                    workInput.startdate = pair[1];
                    break;
                case 3:
                    workInput.enddate = pair[1];
                    break;
                case 4:
                    workInput.description = pair[1];
                    work.push(workInput);
                    workInput = {};
                    i = -1;
                    break;
            }
            i++;
        }

        else if (pair[0] == 'education') {
            switch (i) {
                case 0:
                    eduInput.institution = pair[1];
                    break;
                case 1:
                    eduInput.course = pair[1];
                    break;
                case 2:
                    eduInput.startdate = pair[1];
                    break;
                case 3:
                    eduInput.enddate = pair[1];
                    break;
                case 4:
                    eduInput.description = pair[1];
                    education.push(eduInput);
                    eduInput = {};
                    i = -1;
                    break;
            }
            i++;
        }
    }
    formJSON.basic = basic;
    if (work.length !== 0)
        formJSON.work = work;
    if (education.length !== 0)
        formJSON.education = education;

    document.getElementById("button-copy").style.visibility = 'visible';
    document.getElementById("button-upload").style.visibility = 'visible';
    const results = document.querySelector('.results pre');
    var stringify = JSON.stringify(formJSON, null, 2);
    results.innerText = stringify;
    JSONoutside = formJSON;
}
document.addEventListener('submit', handleFormSubmit);

</script>
  
<style>
body {
    background-color: #f5f5f5;
}

*,
::before,
::after {
    margin: 0;
    box-sizing: border-box;
}

*+* {
    margin-top: 1rem;
}

.jsonify {
    background-color: #F5F5F5;
    color: #686A69;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 18px;
    line-height: 1.45;
}

h1,
h2 {
    color: #2A2F2C;
    font-size: 110%;
    line-height: 1.1;
}

h1 {
    font-size: 125%;
}

.contact-form {
    width: 90vw;
    max-width: 550px;
    margin: 8vh;
}

.results {
    width: 90vw;
    max-width: 550px;
    margin: 8vh auto;
}

p {
    margin-top: 0.5rem;
    font-size: 87.5%;
}

.results pre {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #F5F5F5;
    border: 1px solid #D6D7D7;
    overflow-x: scroll;
    text-align: left;
}

.contact-form form {
    position: relative;
    display: block;
    margin: 0;
    padding: 1rem 0 2rem;
    border-top: 1px solid #CDCFCF;
    border-bottom: 1px solid #CDCFCF;
    overflow: hidden;
}

.input-group {
    margin-top: 0.25rem;
    padding: 0.5rem 1rem;
}

.contact-form label {
    display: block;
    font-family: Lato, sans-serif;
    font-size: 90%;
    line-height: 1.125;
    text-align: left;
}

.group-label {
    display: inline-block;
    margin-right: 1rem;
    font-size: 90%;
}

.contact-form label.inline {
    display: inline-block;
    margin-left: 0.25rem;
}

.contact-form input,
.contact-form select,
.contact-form textarea {
    display: block;
    margin-top: 0.25rem;
    padding: 0.5rem 0.75rem;
    width: 100%;
    font-family: "Open Sans", sans-serif;
    font-size: 1rem;
    transition: 150ms border-color linear;
    resize: none;
}

.contact-form input:focus,
.contact-form input:active {
    border-color: #686A69;
}

.contact-form button {
    display: block;
    margin: 2.5rem 1rem 0;
    padding: 0 1rem 0.125rem;
    background-color: #686A69;
    border: 0;
    color: #F9FDFE;
    font-family: lato, sans-serif;
    font-size: 100%;
    letter-spacing: 0.05em;
    line-height: 2.5;
    text-transform: uppercase;
    transition: 200ms all linear;
    margin-left: 35%
}

.contact-form button:hover,
.contact-form button:active,
.contact-form button:focus {
    background-color: #2A2F2C;
    cursor: pointer;
}

.grid-container {
    width: 1300px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
}

.grid-fromto {
    width: 500px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
}

.grid-to {
    margin-top: 0px;
}

.button-plus {
    opacity: 0.5;
    margin-left: 14px;
    cursor: pointer;
}

.button-close {
    opacity: 0.25;
    right: 6%;
    position: absolute;
    cursor: pointer;
}

.button-plus:hover,
.button-copy:hover,
.button-close:hover {
    opacity: 0.9;
    transition: 0.3s;
}

#job-group,
#edu-group {
    margin-top: 40px;
}

.results>p {
    display: inline;
    margin-left: 10px;
    visibility: hidden;
}

.button-copy {
    cursor: pointer;
    opacity: 0.6;
    float: right;
    visibility: hidden;
}

.button-upload {
    cursor: pointer;
    opacity: 0.6;
    float: right;
    margin-left: 10px;
    visibility: hidden;
}
</style>
  