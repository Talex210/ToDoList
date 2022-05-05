let ul = document.getElementById('task-list');
let taskList = [];
let checkboxNumber = 0;

// restoring check
checkboxNumber = JSON.parse(localStorage.getItem('checks'))
if (checkboxNumber === null) {
    checkboxNumber = 0;
}

// restoring an array from memory
taskList = JSON.parse(localStorage.getItem('tasks')) || [];
for (let i = 0; i < taskList.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = taskList[i];
    ul.append(li);
}

let allImg = document.querySelectorAll('img');
let inputTask = document.getElementById('input-task');
let allButton = document.querySelectorAll('button');
let allLi = document.querySelectorAll('li');
let allSpan = document.querySelectorAll('span');
inputTask.focus();

const addTask = () => {
    if (inputTask.value !== '') {
        let task = '<img src = \'img/notDone.png\' alt = \'not done\' id = \'checkbox' + checkboxNumber + '\' ' +
            'class = \'checkbox\' onclick= \'changeImg(' + checkboxNumber + ')\'/>' +
            '<span class = \'task\' id = \'span' + checkboxNumber + '\' >' + inputTask.value + '</span>' +
            '<button class = \'delete-btn\'>X</button>'
        let li = document.createElement('li');
        li.innerHTML = task;
        ul.append(li);
        taskList.push(task);
        allButton = document.querySelectorAll('button');
        allLi = document.querySelectorAll('li');
        ++checkboxNumber;
        inputTask.value = '';
        allSpan = document.querySelectorAll('span');
        allImg = document.querySelectorAll('img');
        localStorage.setItem('tasks', JSON.stringify(taskList));
        localStorage.setItem('checks', JSON.stringify(checkboxNumber));
        location.reload();
    }
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        addTask();
    }
})

document.getElementById('add-task-button').addEventListener('click', function () {
    addTask();
})

const changeImg = (i) => {
    if (document.getElementById(`checkbox${i}`).alt !== 'done') {
        document.getElementById(`checkbox${i}`).src = 'img/done.png';
        document.getElementById(`checkbox${i}`).alt = 'done';
        taskList[i] = taskList[i].replace('notD', 'd'); //скорей всего будет проблема со счетчиком, после обновления страничке пререзаписывать по порядку
        taskList[i] = taskList[i].replace('not ', ''); // changeImg[i], checkbox[i]
        localStorage.setItem('tasks', JSON.stringify(taskList));
    } else {
        document.getElementById(`checkbox${i}`).src = 'img/notDone.png';
        document.getElementById(`checkbox${i}`).alt = 'not done';
        taskList[i] = taskList[i].replace('img/done', 'img/notDone'); //скорей всего будет проблема со счетчиком, после обновления страничке пререзаписывать по порядку
        taskList[i] = taskList[i].replace('done', 'not done'); // changeImg[i], checkbox[i]
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }
}

// remove <Li>
const del = () => {
    for (let i = 1; i < allButton.length; i++) {
        allButton[i].addEventListener('click', function () {
            allLi[i - 1].remove();
            taskList.splice(i - 1, 1);
            localStorage.setItem('tasks', JSON.stringify(taskList));
            location.reload();
        })
    }
}

del();

/*const taskCompleted = () => {
    allInput = document.querySelectorAll('input');
    for (let i = 1; i < allInput.length; i++) {
        checkboxList[i - 1] = allInput[i].checked;
    }
    localStorage.setItem('check', JSON.stringify(checkboxList));
}*/

// setInterval(taskCompleted, 100);