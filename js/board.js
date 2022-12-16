let currentDraggedElement;
let tasks = [
    {
        'id': 0,
        'category': 'Handson',
        'title': 'Load Battery',
        'todo': 'Change Button color from yellow to green',
        'user': 'BB',
        'priority': 'High',
        'status': 'open',
    },
    {
        'id': 1,
        'category': 'Design',
        'title': 'Change Button color',
        'todo': 'Change Button color from yellow to green',
        'user': 'BB',
        'priority': 'High',
        'status': 'inprogress',
    },
    {
        'id': 2,
        'category': 'marketing',
        'title': 'SEO',
        'todo': 'Change Button color from yellow to green',
        'user': 'BB',
        'priority': 'High',
        'status': 'awaitingfeedback',
    },
    {
        'id': 3,
        'category': 'Programming',
        'title': 'Container',
        'todo': 'Change Button color from yellow to green',
        'user': 'BB',
        'priority': 'High',
        'status': 'done',
    }
];


function updateTasks() {
    let toDoDiv = document.getElementById('tododiv')
    let open = tasks.filter(t => t['status'] == 'open')

    toDoDiv.innerHTML = '';

    for (let i = 0; i < open.length; i++) {
        const element = open[i];
        toDoDiv.innerHTML += cardHTML(element)
    }

    let inProgressDiv = document.getElementById('inprogressdiv')
    let inProgress = tasks.filter(t => t['status'] == 'inprogress')

    inProgressDiv.innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const task = inProgress[i];
        inProgressDiv.innerHTML += cardHTML(task)
    }

    let awaitingFeedbackDiv = document.getElementById('awaitingfeedbackdiv')
    let awaitingFeedback = tasks.filter(t => t['status'] == 'awaitingfeedback')

    awaitingFeedbackDiv.innerHTML = '';

    for (let i = 0; i < awaitingFeedback.length; i++) {
        const task = awaitingFeedback[i];
        awaitingFeedbackDiv.innerHTML += cardHTML(task)
    }

    let doneDiv = document.getElementById('donediv')
    let done = tasks.filter(t => t['status'] == 'done')

    doneDiv.innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const task = done[i];
        doneDiv.innerHTML += cardHTML(task)
    }

}


function cardHTML(task) {
    return ` <div draggable="true" ondragstart="startDragging(${task['id']})" class="card">
    <div class="title">
        <div class="headline" id="category">${task['category']}</div>
    </div>
    <div class="cardcontent">
        <h3 id="title">${task['title']}</h3>
        <span id="todo">${task['todo']}</span>
    </div>
    <div class="progressbardiv">
        <div class="progressbar"></div>
        <span>1/2 Done</span>
    </div>
    <div class="cardfooter">
        <div class="userbox">
            <div class="user" id="user">${task['user']}</div>
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


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category) {
    tasks[currentDraggedElement]['status'] = category;
    updateTasks();
}


function openSlide(){
    let taskSlide = document.getElementById('taskslide');
    taskSlide.classList.remove('closeslide')
}


function closeSlide(){
    let taskSlide = document.getElementById('taskslide');
    taskSlide.classList.add('closeslide')
}