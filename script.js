const inputBox = document.querySelector(".inputText input");
const addBtn = document.querySelector(".inputText button");
const toDoList = document.querySelector(".toDoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value;//geting  user entered value
    if (userData.trim() != 0) {//if user arent only spaces
        addBtn.classList.add("active");//active  the add button
    } else {
        addBtn.classList.remove("active");//unactive  the add button
    }
}
//if user click on the  add button
addBtn.onclick = () => {
    let userData = inputBox.value;//getting user entered value
    if (inputBox.value.trim() === "") {//prevent from saving blank value
        return;
    }
    let getLocalStorage = localStorage.getItem("New ToDo List");//getting localStorage
    if (getLocalStorage == null) {//if localStorage is null
        listArr = [];//creating blank Array
    } else {
        listArr = JSON.parse(getLocalStorage);//transforming json string into js object
    }
    listArr.push(userData);//pushing or adding user data
    localStorage.setItem("New ToDo List", JSON.stringify(listArr));//transforming js object into a json string
    showTasks();
}
function showTasks() {
    let getLocalStorage = localStorage.getItem("New ToDo List");//getting localStorage
    if (getLocalStorage == null) {//if localStorage is null
        listArr = [];//creating blank Array
    } else {
        listArr = JSON.parse(getLocalStorage);//transforming json string into js object
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length;//passing the length value in pendingNumber
    if (listArr.length > 0) { // if array length is greater than 0
        deleteAllBtn.classList.add("active");// active the clearall button
    } else {
        deleteAllBtn.classList.remove("active");// unactive the clearall button
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick ="deleteTask(${index});"><i class="fa fa-trash"></i></span></li>`;
    });
    toDoList.innerHTML = newLiTag;
    inputBox.value = "";
}
//delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New ToDo List");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);//delete or remove the particular indexed li
    //after remove  the li again update the local  storage
    localStorage.setItem("New ToDo List", JSON.stringify(listArr));//transforming js object into a json string
    showTasks();//calling showtasks function
}
//delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = [];//empty an array
    localStorage.setItem("New ToDo List", JSON.stringify(listArr));//transforming js object into a json string
    showTasks();//calling showtasks function
}
