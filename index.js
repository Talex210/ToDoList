let ul = document.getElementById('task-list');
// restoring an array from memory
let taskList = [];
taskList = JSON.parse(localStorage.getItem('tasks')) || [];
for (let i = 0; i < taskList.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = taskList[i];
    ul.append(li);
}
let allInput = document.querySelectorAll('input');
let inputTask = document.getElementById('input-task');
let checkboxNumber = 1;
let allButton = document.querySelectorAll('button');
let allLi = document.querySelectorAll('li');
let allSpan = document.querySelectorAll('span');
let checkboxList = [];
checkboxList = JSON.parse(localStorage.getItem('check')) || [];
for (let i = 0; i < allInput.length - 1; i++) {
    if (checkboxList[i] && allInput.length > 1) {
        allInput[i + 1].checked = true;
    }
}
document.getElementById('add-task-button').addEventListener('click', function () {
    if (inputTask.value !== '') {
        let li = document.createElement('li');
        li.innerHTML = '<label for = \'checkbox' + checkboxNumber + '\'></label>' +
            '          <input type = \'checkbox\' id = \'checkbox' + checkboxNumber + '\' class = \'checkbox\'>' +
            '          <span class = \'task\'>' + inputTask.value + '</span>' +
            '          <button class = \'delete-btn\'>del</button>';
        ul.append(li);
        taskList.push('<label for = \'checkbox' + checkboxNumber + '\'></label>' +
            '          <input type = \'checkbox\' id = \'checkbox' + checkboxNumber + '\' class = \'checkbox\'>' +
            '          <span class = \'task\'>' + inputTask.value + '</span>' +
            '          <button class = \'delete-btn\'>del</button>');
        allButton = document.querySelectorAll('button');
        allLi = document.querySelectorAll('li');
        checkboxNumber++;
        inputTask.value = '';
        allSpan = document.querySelectorAll('span');
        allInput = document.querySelectorAll('input');
        localStorage.setItem('tasks', JSON.stringify(taskList));
        del();
        location.reload();
    }
});

// remove <Li>
function del() {
    for (let i = 1; i < allButton.length; i++) {
        allButton[i].addEventListener('click', function () {
            checkboxNumber--;
            allLi[i - 1].remove();
            taskList.splice(i - 1, 1);
            localStorage.setItem('tasks', JSON.stringify(taskList));
            location.reload();
        });
    }
}

del();

function taskCompleted() {
    allInput = document.querySelectorAll('input');
    for (let i = 1; i < allInput.length; i++) {
        checkboxList[i - 1] = allInput[i].checked;
    }
    localStorage.setItem('check', JSON.stringify(checkboxList));
}

setInterval(taskCompleted, 100);