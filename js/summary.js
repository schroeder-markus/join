
let inProgress = allTasks.filter(t => t['status'] == 'inprogress');
let awaitingFeedback = allTasks.filter(t => t['status'] == 'awaitingfeedback');
let urgent = allTasks.filter(t => t['priority'] == 'urgent');
let upcoming;
let toDo = allTasks.filter(t => t['status'] == 'todo');
let done = allTasks.filter(t => t['status'] == 'done');



console.log(upcoming);


async function loadTasks() {
  await downloadFromServer();
  let allTasksAsJson = backend.getItem('allTasks');
  allTasks = JSON.parse(allTasksAsJson) || [];
  upcoming = allTasks.sort(function (a, b) {
    let x = new Date(a["Due Date"]) ;
    let y = new Date(b["Due Date"]);
    return x - y;
  });
  renderSummary();
};

function renderSummary() {
  document.getElementById('alltasks').innerHTML = allTasks.length;
  document.getElementById('tasksinprogress').innerHTML = inProgress.length;
  document.getElementById('awaitingfeedback').innerHTML = awaitingFeedback.length;
  document.getElementById('urgent').innerHTML = urgent.length;
  document.getElementById('nextdeadline').innerHTML = new Date(upcoming[0]['Due Date']).toGMTString().slice(0,16);
  document.getElementById('todo').innerHTML = toDo.length;
  document.getElementById('done').innerHTML = done.length;
}