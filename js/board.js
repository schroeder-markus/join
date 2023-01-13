let toDoDiv = document.getElementById('tododiv');
let inProgressDiv = document.getElementById('inprogressdiv');
let awaitingFeedbackDiv = document.getElementById('awaitingfeedbackdiv');
let doneDiv = document.getElementById('donediv');
let open;
let inProgress;
let awaitingFeedback;
let done;
let searchTask;
let currentTask;
let currentPrio;


async function renderTasks() {
    await downloadFromServer();
    let allTasksAsJson = backend.getItem('allTasks');
    lastTaskID = backend.getItem('lastTaskID') || -1;
    allTasks = JSON.parse(allTasksAsJson) || [];
    updateTasks();
};

function setClickEvents() {
    overlayClickEvent('taskslide', 'taskslidediv');
    overlayClickEvent('cardinformation', 'editcard');
}

function clearCards() {
    toDoDiv.innerHTML = '';
    inProgressDiv.innerHTML = '';
    awaitingFeedbackDiv.innerHTML = '';
    doneDiv.innerHTML = '';
}


function sortCards() {
    open = allTasks.filter(t => t['status'] == 'todo');
    inProgress = allTasks.filter(t => t['status'] == 'inprogress');
    awaitingFeedback = allTasks.filter(t => t['status'] == 'awaitingfeedback');
    done = allTasks.filter(t => t['status'] == 'done');
}


function updateOpen() {
    for (let i = 0; i < open.length; i++) {
        const task = open[i];
        toDoDiv.innerHTML += cardHTML(task)
    }
}


function updateInProgress() {
    for (let i = 0; i < inProgress.length; i++) {
        const task = inProgress[i];
        inProgressDiv.innerHTML += cardHTML(task)
    }
}


function updateAwaitingFeedback() {
    for (let i = 0; i < awaitingFeedback.length; i++) {
        const task = awaitingFeedback[i];
        awaitingFeedbackDiv.innerHTML += cardHTML(task)
    }
}


function updateDone() {
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


function countTrueSubtasks(position) {
    let count = 0;
        for (let i = 0; i < allTasks[position]['subtasks'].length; i++) {
            if (allTasks[position]['subtasks'][i].done === true) {
                count++;
            }
        }
    return count;
}


function renderCardUser(position) {
    let assignedHTML = '';
    for (let i = 0; i < allTasks[position]['assigned'].length; i++) {
        const element = allTasks[position]['assigned'][i];
        assignedHTML += `<div class="user" id="user">${element['initials']}</div>`;
    }
    return assignedHTML;
}


function renderUser(position) {
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

function renderSubTasks1(position){
    document.getElementById('infosubtasks').innerHTML = '';
    for (let i = 0; i < allTasks[position]['subtasks'].length; i++) {
        const element = allTasks[position]['subtasks'][i];
        document.getElementById('infosubtasks').innerHTML += `  
                        <span  class="subtask"><img onclick="toggleSubtaskSelection1(${position},${i})" id="box(${i})" src="${getCheckboxIcon1(position,i)}" alt="">                          
                        <div>${element['name']}</div></span>`
    }
}


function toggleSubtaskSelection1(position,i) {
    let checkBox = document.getElementById(`box(${i})`);
    if(allTasks[position]['subtasks'][i]['done']){
        allTasks[position]['subtasks'][i]['done'] = false; 
    }else{
        allTasks[position]['subtasks'][i]['done'] = true; 
    }
    checkBox.src = getCheckboxIcon1(position,i);
    saveTasks();
    updateTasks();
};


function getCheckboxIcon1(position, i) {
    if (!allTasks[position]['subtasks'][i].done) {
        return 'img/icon-check-empty.svg';
    } else {
        return 'img/icon-check-ok.svg';
    }
};


function renderCardInformation(position) {
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    document.getElementById('cardinformation').classList.remove('d-none');
    document.getElementById('infocategory').innerHTML = `${allTasks[position]['category']}`;
    document.getElementById('infocategory').classList.add(`${allTasks[position]['category']}`);
    document.getElementById('infotitle').innerHTML = `${allTasks[position]['title']}`;
    document.getElementById('infodescription').innerHTML = `${allTasks[position]['description']}`;
    document.getElementById('infoduedate').innerHTML = `${allTasks[position]['Due Date']}`;
    document.getElementById('priorotyimg').src = `img/card${allTasks[position]['priority']}.svg`;
    renderUser(position);
    renderSubTasks1(position);
    currentTask = position;
}


function editCard() {
    document.getElementById('editcard').classList.add('editcardinformation');
    document.getElementById('editcard').classList.remove('cardinformation');
    document.getElementById('editcard').innerHTML = editCardHTML();
    document.getElementById(`edittitle${currentTask}`).value = allTasks[currentTask]['title'];
    document.getElementById(`editdescription${currentTask}`).value = allTasks[currentTask]['description'];
    document.getElementById(`editduedate${currentTask}`).value = allTasks[currentTask]['Due Date'];
    highlightActivePriority(currentTask);
}


function highlightActivePriority(currentTask) {
    currentPrio = allTasks[currentTask]['priority'];
    let prioButtonElement = document.getElementById(`editPrioButton-${currentPrio}`);
    prioButtonElement.classList.add('prioActive');
    prioButtonElement.style.backgroundColor = `var(--prio-${currentPrio})`;
}


function editPrio(priority) {
    if (currentPrio != priority) {
        recentPrioButtonElement = document.getElementById(`editPrioButton-${currentPrio}`);
        prioButtonElement = document.getElementById(`editPrioButton-${priority}`);
        recentPrioButtonElement.classList.remove('prioActive');
        recentPrioButtonElement.style.backgroundColor = `var(--main-white)`;
        currentPrio = priority;
        prioButtonElement.classList.add('prioActive');
        prioButtonElement.style.backgroundColor = `var(--prio-${currentPrio})`;
    }
}


function saveEditedTasks() {
    allTasks[currentTask]['title'] = document.getElementById(`edittitle${currentTask}`).value;
    allTasks[currentTask]['description'] = document.getElementById(`editdescription${currentTask}`).value
    allTasks[currentTask]['Due Date'] = document.getElementById(`editduedate${currentTask}`).value
    allTasks[currentTask]['priority'] = currentPrio
    saveTasks();
    updateTasks();
    closeCardInformation();

}


function closeCardInformation() {
    document.getElementById('cardinformation').classList.add('d-none');
    document.getElementById('cardinformation').innerHTML = infoCardHTML();
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
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
    taskSlide.style.display = 'flex';
    setTimeout(() => {taskSlide.classList.remove('closeslide')}, 0);
    if (document.getElementById('board') !== null){
    document.getElementById('board').style.overflow = 'hidden';
    }
    if (document.getElementById('dueDate') !== null){
    document.getElementById('dueDate').valueAsDate = new Date();
    }
}


function closeSlide() {
    let taskSlide = document.getElementById('taskslide');
    taskSlide.classList.add('closeslide');
    setTimeout(() => taskSlide.style.display = 'none', 0);
    if (document.getElementById('board') !== null){
    document.getElementById('board').style.overflow = 'scroll';
    }
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

    let awaitingFeedback = searchTask.filter(t => t['status'] == 'awaitingfeedback')
    for (let i = 0; i < awaitingFeedback.length; i++) {
        const task = awaitingFeedback[i];
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
