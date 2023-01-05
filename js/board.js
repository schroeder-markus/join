let toDoDiv = document.getElementById('tododiv');
let inProgressDiv = document.getElementById('inprogressdiv');
let awaitingFeedbackDiv = document.getElementById('awaitingfeedbackdiv');
let doneDiv = document.getElementById('donediv');
let open;
let inProgress;
let awaitingFeedback;
let done;
let searchTask;


async function renderTasks() {
    await downloadFromServer();
    let allTasksAsJson = backend.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsJson) || [];
    updateTasks();
};


function clearCards(){
    toDoDiv.innerHTML = '';
    inProgressDiv.innerHTML = '';
    awaitingFeedbackDiv.innerHTML = '';
    doneDiv.innerHTML = '';
}


function sortCards(){
    open = allTasks.filter(t => t['status'] == 'todo');
    inProgress = allTasks.filter(t => t['status'] == 'inprogress');
    awaitingFeedback = allTasks.filter(t => t['status'] == 'awaitingfeedback');
    done = allTasks.filter(t => t['status'] == 'done');
}


function updateOpen(){
    for (let i = 0; i < open.length; i++) {
        const task = open[i];
        toDoDiv.innerHTML += cardHTML(task)
    }
}


function updateInProgress(){
    for (let i = 0; i < inProgress.length; i++) {
        const task = inProgress[i];
        inProgressDiv.innerHTML += cardHTML(task)
    }
}


function updateAwaitingFeedback(){
    for (let i = 0; i < awaitingFeedback.length; i++) {
        const task = awaitingFeedback[i];
        awaitingFeedbackDiv.innerHTML += cardHTML(task)
    }
}


function updateDone(){
    for (let i = 0; i < done.length; i++) {
        const task = done[i];
        doneDiv.innerHTML += cardHTML(task)
    }
}


function updateTasks() { 
    sortCards();
    clearCards();
    updateOpen();
    updateInProgress();
    updateAwaitingFeedback();
    updateDone();
}


function cardHTML(task){
    let position = allTasks.map(object => object.taskID).indexOf(task['taskID']);
    return ` <div draggable="true" onclick="renderCardInformation(${position})" ondragstart="startDragging(${task['taskID']})" class="card">
    <div class="title">
        <div class="headline ${task['category']}">${task['category']}</div>
    </div>
    <div class="cardcontent">
        <h3 id="title">${task['title']}</h3>
        <span class="span" id="todo">${task['description']}</span>
    </div>
    <div class="progressbardiv">
        <div class="progressbar"></div>
        <span>1/2 Done</span>
    </div>
    <div class="cardfooter">
        <div id="userbox${task}" class="userbox">
            <div class="user" id="user">${task['assigned'][0]['initials']}</div>
        </div>
        <svg width="32" height="33" viewBox="0 0 32 33" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="32" height="32" rx="10" fill="white" />
            <g clip-path="url(#clip0_19696_3309)">
                <path
                    d="M15.9999 17.7452C15.8004 17.7456 15.6062 17.6837 15.4456 17.5686L7.87712 12.1347C7.77865 12.0639 7.69547 11.975 7.63235 11.873C7.56923 11.7709 7.52739 11.6578 7.50922 11.5401C7.47254 11.3023 7.53451 11.0601 7.6815 10.8667C7.8285 10.6734 8.04848 10.5447 8.29304 10.5091C8.53761 10.4734 8.78674 10.5336 8.98561 10.6766L15.9999 15.7075L23.0141 10.6766C23.1126 10.6058 23.2244 10.5546 23.3433 10.5258C23.4621 10.4971 23.5856 10.4914 23.7067 10.5091C23.8278 10.5267 23.9441 10.5674 24.049 10.6288C24.154 10.6901 24.2454 10.771 24.3182 10.8667C24.391 10.9625 24.4437 11.0712 24.4732 11.1868C24.5028 11.3023 24.5087 11.4224 24.4905 11.5401C24.4723 11.6578 24.4305 11.7709 24.3674 11.873C24.3042 11.975 24.2211 12.0639 24.1226 12.1347L16.5541 17.5686C16.3936 17.6837 16.1993 17.7456 15.9999 17.7452Z"
                    fill="#7AE229" />
                <path
                    d="M16 22.5001C15.8006 22.5005 15.6063 22.4386 15.4457 22.3235L7.87724 16.8896C7.67837 16.7466 7.54603 16.5328 7.50934 16.295C7.47266 16.0572 7.53463 15.815 7.68163 15.6216C7.82862 15.4283 8.0486 15.2996 8.29317 15.2639C8.53773 15.2283 8.78686 15.2885 8.98574 15.4314L16 20.4624L23.0142 15.4314C23.2131 15.2885 23.4622 15.2283 23.7068 15.2639C23.9514 15.2996 24.1713 15.4283 24.3183 15.6216C24.4653 15.815 24.5273 16.0572 24.4906 16.295C24.4539 16.5328 24.3216 16.7466 24.1227 16.8896L16.5542 22.3235C16.3937 22.4386 16.1994 22.5005 16 22.5001Z"
                    fill="#7AE229" />
            </g>
            <defs>
                <clipPath id="clip0_19696_3309">
                    <rect width="17" height="12" fill="white" transform="translate(7.5 10.5)" />
                </clipPath>
            </defs>
        </svg>
    </div>
</div>`
}

function renderUser(position){
    document.getElementById('assignedto').innerHTML = '';
    for (let i = 0; i < allTasks[position]['assigned'].length; i++) {
        const element = allTasks[position]['assigned'][i];
        document.getElementById('assignedto').innerHTML += `                            
                            <div class="assignedtoinformation">
                                <div class="intitialinformation">${element['initials']}</div>
                                <div class="nameinformation">${element['name']}</div>
                            </div>`;
    }
}


function renderCardInformation(position) {
    document.getElementById('cardinformation').classList.remove('d-none');
    document.getElementById('infocategory').innerHTML = `${allTasks[position]['category']}`;
    document.getElementById('infocategory').classList.add(`${allTasks[position]['category']}`);
    document.getElementById('infotitle').innerHTML = `${allTasks[position]['title']}`;
    document.getElementById('infodescription').innerHTML = `${allTasks[position]['description']}`;
    document.getElementById('infoduedate').innerHTML = `${allTasks[position]['Due Date']}`;
    document.getElementById('priorityimg').src = `img/card${allTasks[position]['priority']}.svg`;
    renderUser(position);
}


function editCard(){
    document.getElementById('cardinformation').innerHTML = `
            <div class="cardinformation">
                <svg class="editbutton" onclick="editCard()" width="57" height="57" viewBox="0 0 57 57" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="57" height="57" rx="10" fill="#2A3647" />
                    <path
                        d="M20.9449 35.5155L25.7643 38.4404L38.4074 17.6083C38.694 17.1362 38.5435 16.5211 38.0714 16.2346L34.9618 14.3474C34.4897 14.0608 33.8746 14.2113 33.5881 14.6834L20.9449 35.5155Z"
                        fill="white" />
                    <path d="M20.3599 36.4792L25.1792 39.4041L20.4506 41.6889L20.3599 36.4792Z" fill="white" />
                </svg>
                <form onsubmit="return false" class="addTaskForm">
                    <!-- Title -->
                    <div>
                        <label for="title">Title</label>
                        <input oninput="deleteAlert('titleAlert')" id="title" type="text" placeholder="Enter a title">
                        <span id="titleAlert" class="requiredAlert"></span>
                    </div>
                    <!-- Description -->
                    <div>
                        <label for="description">Description</label>
                        <textarea oninput="deleteAlert('descriptionAlert')" id="description" class="descriptionTextArea"
                            type="text" placeholder="Enter a description"></textarea>
                        <span id="descriptionAlert" class="requiredAlert"></span>
                    </div>
                    <!-- Due Date -->
                    <div>
                        <label for="dateInput">Due Date</label>
                        <div oninput="deleteAlert('dateAlert')" class="inputContainer"><input id="dueDate"
                                class="input dateInput" type="text" placeholder="Enter date"
                                onfocus="(this.type='date')">
                        </div>
                        <span id="dateAlert" class="requiredAlert"></span>
                    </div>
                    <!-- Priority -->
                    <div class="input">
                        <label>Prio</label>
                        <div class="prioButtons">
                            <button onclick="setPrio('urgent')" type="button" id="prioButton-urgent">Urgent
                                <div>
                                    <img src="img/prio-urgent.svg" alt="prioUrgentArrow">
                                </div>
                            </button>
                            <button onclick="setPrio('medium')" type="button" id="prioButton-medium">Medium
                                <div>
                                    <img src="img/prio-medium.svg" alt="prioMediumArrow">
                                </div>
                            </button>
                            <button onclick="setPrio('low')" type="button" id="prioButton-low">Low
                                <div>
                                    <img src="img/prio-low.svg" alt="prioLowArrow">
                                </div>
                            </button>
                        </div>
                        <span id="priorityAlert" class="requiredAlert"></span>
                    </div>
                    <!-- Assign to -->
                    <div readonly>
                        <label for="assignToDropdown">Assign to</label>
                        <div id="assignToDropdown" class="dropdown">
                            <span onclick="toggleAssignDropdown()" id="assignToInput" class="dropdownValue">Select
                                contacts to assign</span>
                            <img onclick="toggleAssignDropdown()" src="img/icon-dropdown.svg" alt="dropdownIcon">
                            <div id="contactSelection" class="scroll">
                                <div><span onclick="toggleSelf()">You<div id="contactCheckbox()" class="assignCheckbox">
                                            <div class="assignChecked"></div>
                                        </div></span></div>
                                <div><span onclick="toggleSelection(0)">
                                        <div id="contact(0)">
                                            <div class="assignName"><span id="firstName(0)">Markus</span><span
                                                    id="lastName(0)">Schröder</span></div>
                                        </div>
                                        <div class="assignCheckbox">
                                            <div id="contactChecked(0)" class="assignChecked"></div>
                                        </div>
                                    </span></div>
                                <div><span onclick="toggleSelection(1)">
                                        <div id="contact(1)">
                                            <div class="assignName"><span id="firstName(1)">Boubkir</span><span
                                                    id="lastName(1)">Benamar</span></div>
                                        </div>
                                        <div class="assignCheckbox">
                                            <div id="contactChecked(1)" class="assignChecked"></div>
                                        </div>
                                    </span></div>
                                <div><span onclick="toggleSelection(2)">
                                        <div id="contact(2)">
                                            <div class="assignName"><span id="firstName(2)">Ilja</span><span
                                                    id="lastName(2)">Gaus-Gerbeth</span></div>
                                        </div>
                                        <div class="assignCheckbox">
                                            <div id="contactChecked(2)" class="assignChecked"></div>
                                        </div>
                                    </span></div>
                                <div><span onclick="toggleSelection(3)">
                                        <div id="contact(3)">
                                            <div class="assignName"><span id="firstName(3)">Ingo</span><span
                                                    id="lastName(3)">Hermsen</span></div>
                                        </div>
                                        <div class="assignCheckbox">
                                            <div id="contactChecked(3)" class="assignChecked"></div>
                                        </div>
                                    </span></div>
                                <div><span
                                        onclick="toggleView_DropdownAndNewEntry('assignToDropdown','invitePersonInput', 'mailInput')">Invite
                                        new Contact<img src="img/icon-contacts-dark.svg" alt="contactIconDark"></span>
                                </div>
                            </div>
                        </div>

                        <!-- Input for new Contact (display: none on default) -->
                        <div id="invitePersonInput" class="newEntryInput">
                            <div><input id="mailInput" type="email" placeholder="Contact email" onfocus="this.value=''">
                                <div class="confirmOrCancel">
                                    <div onclick="cancelInviteContact()"><img src="img/icon-x.svg" alt="cancelIcon"
                                            required>
                                    </div>
                                    <div onclick="confirmMailAdress()"><img src="img/icon-check-dark.svg"
                                            alt="checkIcon">
                                    </div>
                                </div>
                            </div>
                            <span id="mailNotFoundAlert" class="requiredAlert"></span>
                        </div>
                        <!--  -->
                        <span id="assignAlert" class="requiredAlert"></span>
                        <span id="nameCircles"></span>
                    </div>
            </form>
        </div>`
}

function closeCardInformation(){
    document.getElementById('cardinformation').classList.add('d-none');
}

function startDragging(id) {
    currentDraggedElement = id;
}


function dragHighlight(id) {
    let currentDraggedStatus = allTasks[currentDraggedElement]['status']
    allTasks[currentDraggedElement]['status'] = 0;
    updateTasks();
    allTasks[currentDraggedElement]['status'] = currentDraggedStatus;
    if (!document.getElementById(id).innerHTML.includes(`<div id="highlight${id}" class="highlight"></div>`)) {
        document.getElementById(id).innerHTML += `<div id="highlight${id}" class="highlight"></div>`;
    }
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category) {
    allTasks[currentDraggedElement]['status'] = category;
    updateTasks();
    saveTasks();
}


function openSlide() {
    let taskSlide = document.getElementById('taskslide');
    taskSlide.classList.remove('closeslide');
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
}


function closeSlide() {
    let taskSlide = document.getElementById('taskslide');
    taskSlide.classList.add('closeslide');
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll'
}


function searchTasks() {
    let search = document.getElementById('searchtask');
    search = search.value;
    searchTask = allTasks.filter(t => t['title'].toLowerCase().includes(search.toLowerCase()) || t['description'].toLowerCase().includes(search.toLowerCase()));

    clearCards();

    let todo = searchTask.filter(t => t['status'] == 'todo')
    for (let i = 0; i < todo.length; i++) {
        let element = todo[i];
        toDoDiv.innerHTML += cardHTML(element)
    }

    let inProgress = searchTask.filter(t => t['status'] == 'inprogress')
    for (let i = 0; i < inProgress.length; i++) {
        const task = inProgress[i];
        inProgressDiv.innerHTML += cardHTML(task)
    }

    let awaitinFeedback = searchTask.filter(t => t['status'] == 'awaitingfeedback')
    for (let i = 0; i < awaitinFeedback.length; i++) {
        const task = awaitinFeedback[i];
        awaitingFeedbackDiv.innerHTML += cardHTML(task)
    }

    let done = searchTask.filter(t => t['status'] == 'done')
    for (let i = 0; i < done.length; i++) {
        const task = done[i];
        doneDiv.innerHTML += cardHTML(task)
    }
}


async function saveTasks() {
    let allTasksAsString = JSON.stringify(allTasks);
    await backend.setItem('allTasks', allTasksAsString);
    await backend.setItem('lastTaskID', lastTaskID)
};