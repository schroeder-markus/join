function cardHTML(task) {
    let position = allTasks.map(object => object.taskID).indexOf(task['taskID']);
    return ` <div draggable="true" onclick="renderCardInformation(${position})" ondragstart="startDragging(${task['taskID']})" class="card">
    <div class="title">
        <div class="headline ${task['category']}">${task['category']}</div>
    </div>
    <div class="cardcontent">
        <h3>${task['title']}</h3>
        <span class="span" id="todo">${task['description']}</span>
    </div>
    <div class="progressbardiv" id="progressbardiv">
        <div class="progressbar"><div class="barinprogress" id="progress-bar" style="width:${subTaskProgress(position, task)}%"></div></div>
        <span id="subtaskspan">${countTrueSubtasks(position)}/<span id="subtasklength">${task['subtasks'].length}</span> Done</span>
    </div>
    <div class="cardfooter">
        <div id="userbox${position}" class="userbox">
            ${renderCardUser(position)}
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


function editCardHTML() {
    return `<div class="center">
                        <svg onclick="closeCardInformation()" class="closebutton" width="31" height="31" viewBox="0 0 31 31"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.9614 7.65381L7.65367 22.9616" stroke="#2A3647" stroke-width="2" stroke-linecap="round" />
                            <path d="M22.8169 23.106L7.50914 7.7982" stroke="#2A3647" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        <svg onclick="saveEditedTasks()" class="editbutton" width="83" height="61" viewBox="0 0 83 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="83" height="61" rx="10" fill="#2A3647"/>
                            <path d="M25.3622 30.3636C25.3622 32.0291 25.0465 33.446 24.4151 34.6143C23.7887 35.7827 22.9336 36.6751 21.8498 37.2915C20.771 37.9031 19.5579 38.2088 18.2106 38.2088C16.8533 38.2088 15.6353 37.9006 14.5565 37.2841C13.4776 36.6676 12.625 35.7752 11.9986 34.6069C11.3722 33.4386 11.0589 32.0241 11.0589 30.3636C11.0589 28.6982 11.3722 27.2812 11.9986 26.1129C12.625 24.9446 13.4776 24.0547 14.5565 23.4432C15.6353 22.8267 16.8533 22.5185 18.2106 22.5185C19.5579 22.5185 20.771 22.8267 21.8498 23.4432C22.9336 24.0547 23.7887 24.9446 24.4151 26.1129C25.0465 27.2812 25.3622 28.6982 25.3622 30.3636ZM22.0884 30.3636C22.0884 29.2848 21.9268 28.375 21.6037 27.6342C21.2855 26.8935 20.8356 26.3317 20.2539 25.9489C19.6722 25.5661 18.9911 25.3746 18.2106 25.3746C17.43 25.3746 16.7489 25.5661 16.1673 25.9489C15.5856 26.3317 15.1332 26.8935 14.81 27.6342C14.4918 28.375 14.3327 29.2848 14.3327 30.3636C14.3327 31.4425 14.4918 32.3523 14.81 33.093C15.1332 33.8338 15.5856 34.3956 16.1673 34.7784C16.7489 35.1612 17.43 35.3526 18.2106 35.3526C18.9911 35.3526 19.6722 35.1612 20.2539 34.7784C20.8356 34.3956 21.2855 33.8338 21.6037 33.093C21.9268 32.3523 22.0884 31.4425 22.0884 30.3636ZM30.5731 34.7038L30.5805 30.8931H31.0429L34.7119 26.5455H38.3586L33.4292 32.3026H32.676L30.5731 34.7038ZM27.6945 38V22.7273H30.8714V38H27.6945ZM34.8536 38L31.4829 33.011L33.6008 30.7663L38.5748 38H34.8536Z" fill="white"/>
                            <path d="M53 30.5L59 36.5L69 24.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    <form onsubmit="return false" class="editform">
                    <!-- Title -->
                    <div>
                        <label for="title">Title</label>
                        <input oninput="deleteAlert('titleAlert')" id="edittitle${currentTask}" type="text" placeholder="Enter a title">
                        <span id="titleAlert" class="requiredAlert"></span>
                    </div>
                    <!-- Description -->
                    <div>
                        <label for="description">Description</label>
                        <textarea oninput="deleteAlert('descriptionAlert')" id="editdescription${currentTask}" class="descriptionTextArea"
                            type="text" placeholder="Enter a description"></textarea>
                        <span id="descriptionAlert" class="requiredAlert"></span>
                    </div>
                    <!-- Due Date -->
                    <div>
                        <label for="dateInput">Due Date</label>
                        <div oninput="deleteAlert('dateAlert')" class="inputContainer"><input id="editduedate${currentTask}"
                                class="input dateInput" type="text" placeholder="Enter date"
                                onfocus="(this.type='date')">
                        </div>
                        <span id="dateAlert" class="requiredAlert"></span>
                    </div>
                    <!-- Priority -->
                    <div class="input">
                        <label>Prio</label>
                        <div class="prioButtons">
                            <button onclick="editPrio('urgent')" type="button" id="editPrioButton-urgent">Urgent
                                <div>
                                    <img src="img/prio-urgent.svg" alt="prioUrgentArrow">
                                </div>
                            </button>
                            <button onclick="editPrio('medium')" type="button" id="editPrioButton-medium">Medium
                                <div>
                                    <img src="img/prio-medium.svg" alt="prioMediumArrow">
                                </div>
                            </button>
                            <button onclick="editPrio('low')" type="button" id="editPrioButton-low">Low
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
                        <div><span onclick="toggleSelection(1)">
                                <div id="contact(1)">
                                    Markus Schröder
                                </div>
                                <div class="assignCheckbox">
                                    <div id="contactChecked(1)" class="assignChecked"></div>
                                </div>
                            </span></div>
                        <div><span onclick="toggleSelection(2)">
                                <div id="contact(2)">
                                    Boubkir Benamar
                                </div>
                                <div class="assignCheckbox">
                                    <div id="contactChecked(2)" class="assignChecked"></div>
                                </div>
                            </span></div>
                        <div><span onclick="toggleSelection(3)">
                                <div id="contact(3)">
                                    Ilja Gaus-Gerbeth
                                </div>
                                <div class="assignCheckbox">
                                    <div id="contactChecked(3)" class="assignChecked"></div>
                                </div>
                            </span></div>
                        <div><span onclick="toggleSelection(4)">
                                <div id="contact(4)">
                                    Ingo Hermsen
                                </div>
                                <div class="assignCheckbox">
                                    <div id="contactChecked(4)" class="assignChecked"></div>
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


function infoCardHTML() {
    return ` <div id="editcard" class="cardinformation">
                        <svg onclick="closeCardInformation()" class="closebutton" width="31" height="31" viewBox="0 0 31 31"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.9614 7.65381L7.65367 22.9616" stroke="#2A3647" stroke-width="2" stroke-linecap="round" />
                            <path d="M22.8169 23.106L7.50914 7.7982" stroke="#2A3647" stroke-width="2" stroke-linecap="round" />
                        </svg>
                
                        <svg class="editbutton" onclick="editCard()" width="57" height="57" viewBox="0 0 57 57" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect width="57" height="57" rx="10" fill="#2A3647" />
                            <path
                                d="M20.9449 35.5155L25.7643 38.4404L38.4074 17.6083C38.694 17.1362 38.5435 16.5211 38.0714 16.2346L34.9618 14.3474C34.4897 14.0608 33.8746 14.2113 33.5881 14.6834L20.9449 35.5155Z"
                                fill="white" />
                            <path d="M20.3599 36.4792L25.1792 39.4041L20.4506 41.6889L20.3599 36.4792Z" fill="white" />
                        </svg>
                
                
                        <div id="infocategory" class="infomationcategory"></div>
                        <div id="infotitle" class="informationtitle"></div>
                        <div id="infodescription" class="description"></div>
                        <div class="informationdate">
                            <span  class="cardinformationspan">Due Date:</span><span id="infoduedate"></span>
                        </div>
                        <div class="subtaskinformation">
                            <span class="subtaskinformationspan">Subtasks:</span>
                            <div id="infosubtasks">
                            
                            </div>
                        </div>
                        <div class="prioritycard">
                            <span class="cardinformationspan">Priority:</span><img id="priorotyimg" src=""
                                alt="">
                        </div>
                        <div id="assignedto">
                            <span class="cardinformationspan"> Assigned to:</span>
                            <div class="assignedtoinformation">
                                <div class="intitialinformation">BB</div>
                                <div class="nameinformation">Boubkir Benamar</div>
                            </div>
                        </div>
                        <svg id="icon-bin" class="icon-bin" onclick="deleteTask()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="48px" height="48px" fill-rule="nonzero"><g transform="translate(42.66667,42.66667) scale(0.66667,0.66667)"><g class="bin" fill="#2a3647" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M-64,320v-384h384v384z" id="bgRectangle"></path></g><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10,2l-1,1h-4c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1h2h10h2c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1h-4l-1,-1zM5,7v13c0,1.105 0.895,2 2,2h10c1.105,0 2,-0.895 2,-2v-13z"></path></g></g></g></svg>                    
                </div>`

}
