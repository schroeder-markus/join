async function loadTasks() {
  await downloadFromServer();
  let allTasksAsJson = backend.getItem('allTasks');
  allTasks = JSON.parse(allTasksAsJson) || [];
  let toDo = allTasks.filter(t => t['status'] == 'todo');
  let inProgress = allTasks.filter(t => t['status'] == 'inprogress');
  let awaitingFeedback = allTasks.filter(t => t['status'] == 'awaitingfeedback');
  let urgent = allTasks.filter(t => t['priority'] == 'urgent');
  let done = allTasks.filter(t => t['status'] == 'done');
  let upcoming = allTasks.sort(function (a, b) {
    let x = new Date(a["Due Date"]);
    let y = new Date(b["Due Date"]);
    return x - y;
  })
  renderSummary(toDo, inProgress, awaitingFeedback, urgent, upcoming, done);
};

function renderSummary(toDo, inProgress, awaitingFeedback, urgent, upcoming, done) {
  document.getElementById('alltasks').innerHTML = allTasks.length;
  document.getElementById('tasksinprogress').innerHTML = inProgress.length;
  document.getElementById('awaitingfeedback').innerHTML = awaitingFeedback.length;
  document.getElementById('urgent').innerHTML = urgent.length;
  document.getElementById('todo').innerHTML = toDo.length;
  document.getElementById('done').innerHTML = done.length;
  upcomingDueDate(upcoming);
}

function upcomingDueDate(upcoming){
  if (upcoming[0]['Due Date']){
    document.getElementById('nextdeadline').innerHTML = new Date(upcoming[0]['Due Date']).toGMTString().slice(0, 16)
  }
};

function greetUserDaytime() {
  const currentTime = new Date().getHours();
    if (currentTime < 12) {
      document.querySelector(".greet-daytime").innerHTML = `Good morning,`;
    } else if (currentTime < 18) {
      document.querySelector(".greet-daytime").innerHTML = `Good afternoon,`;
    } else {
      document.querySelector(".greet-daytime").innerHTML = `Good evening,`;
    }
}