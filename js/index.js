// Think JS
import { logOut } from "./utils/main.js";
// Catching all possible inputs and buttons you will make action on them

const modal = document.getElementById('modal');
const statusInput = document.getElementById('status');
const categoryInput = document.getElementById('category');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const newTaskBtn = document.getElementById('newTask');
const addBtn = document.getElementById('addBtn');
const searchInput = document.getElementById('searchInput');
const updateBtn = document.getElementById('updateBtn');

const sections = document.querySelectorAll('section');
const gridBtn = document.getElementById('gridBtn');
const barsBtn = document.getElementById('barsBtn');
const tasksContainers = document.querySelectorAll('.tasks');

const darkModeBtn = document.getElementById('darkModeBtn');

let counters = {
    nextUp : document.querySelector('#nextUp').querySelector('#nextUpCounter'),
    inProgress : document.querySelector('#inProgress').querySelector('#inProgressCounter'),
    done : document.querySelector('#done').querySelector('#doneCounter')
}


let containers = {
    //Catching all Section for display

    nextUp : document.getElementById('nextUp'),
    inProgress : document.getElementById('inProgress'),
    done : document.getElementById('done')
};

let allTasks = getTasksFromLocalStorage();
displayAllTasks();

let updateIndex = 0;

const titleRegex = /^[^\s].{2,}[^\s]$/;
const descRegex = /^.{25,100}$/;
// >>>>>>Functions<<<<<<<
// >>>>>>>>>><<<<<<<<<<<<

function showModal() {
    window.scroll(0,0);
    document.body.style.overflow = "hidden";
    modal.classList.replace('d-none' , 'd-flex');   
}

function hideModal() {
    document.body.style.overflow = "auto";
    modal.classList.replace('d-flex' , 'd-none');
}

function addTask() {

    if (validate(titleInput, titleRegex) && validate(descriptionInput,descRegex))
    {
        let task = {
            status : statusInput.value,
            category : categoryInput.value,
            title : titleInput.value,
            description : descriptionInput.value,
            bgColor : "#0d1117"
        }
        allTasks.push(task);
        setTasksToLocalStorage();
        clearInputs();
        displayTask(allTasks.length - 1);
        hideModal();
    }
    else{
        alert("Enter valid data...!");
    }

    

}

function displayTask(index) {
    let taskHTML = `
    <div class="task" style ="background-color: ${allTasks[index].bgColor}">   
      <h3 class="text-capitalize">${allTasks[index].title}</h3>
      <p class="description text-capitalize">${allTasks[index].description}</p>
      <h4 class="category ${allTasks[index].category} text-capitalize">${allTasks[index].category}</h4>
      <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
        <li><i class="bi bi-pencil-square" onclick ="getTasksInfo(${index});"></i></li>
        <li><i class="bi bi-trash-fill" onclick ="deleteContainers(${index});"></i></li>
        <li><i class="bi bi-palette-fill" onclick="changeBgColor(event , ${index});"></i></li>  
      </ul>
    </div>
    `;
    
    // Bract notation is used to access object in one condition by passing a string value
    //So until the bract i could access the section based on his status and use "querySelector" to deep into the section such as [nextUp - inProgress - done] section .

    containers[allTasks[index].status].querySelector(".tasks").innerHTML += taskHTML;

    setCounter(allTasks[index].status);
}

function clearInputs() {
    statusInput.value = "";
    categoryInput.value = "";
    titleInput.value = "";
    descriptionInput.value = "";

}

function setTasksToLocalStorage() {
    localStorage.setItem("allTasks" , JSON.stringify(allTasks));
}
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("allTasks")) || [];
}

function displayAllTasks() {
    for (let index = 0; index < allTasks.length; index++) {
        
        displayTask(index);
        
    }
}


function setCounter(status) {
    counters[status].innerHTML = Number(counters[status].innerHTML) + 1; 
}


function deleteContainers(index)
{
    // 0- delete a specific task 
    allTasks.splice(index , 1);

    // 1- set modified tasks into the arr
    setTasksToLocalStorage();

    // 2- reset containers
    resetContainers();
    // 3- reset counters
    resetCounters();
    // 4- display ALL Tasks
    displayAllTasks();

}

function resetContainers() {
    for (const key in containers) {
        containers[key].querySelector('.tasks').innerHTML = "";
        
    }
}

function resetCounters() {
    for (const key in counters) {
        counters[key].innerHTML = 0;
    }
}

function searchInputs(){
    
    resetContainers();
    resetCounters();
    let term = searchInput.value;

    for (let index = 0; index < allTasks.length; index++) {
        if (allTasks[index].title.toLowerCase().includes(term.toLowerCase()) ||
             allTasks[index].category.toLowerCase().includes(term.toLowerCase()) ) {
            
                displayTask(index);
        }
        
    }

}


function getTasksInfo(index) {
    updateIndex = index;
    
    showModal();

    statusInput.value = allTasks[index].status;
    categoryInput.value = allTasks[index].category;
    titleInput.value = allTasks[index].title;
    descriptionInput.value = allTasks[index].description;

    addBtn.classList.replace("d-block" , "d-none");
    updateBtn.classList.replace("d-none" , "d-block");
}

function editTasks() {
    allTasks[updateIndex].status = statusInput.value;
    allTasks[updateIndex].title = titleInput.value;
    allTasks[updateIndex].category =categoryInput.value;
    allTasks[updateIndex].description = descriptionInput.value;

    setTasksToLocalStorage();
    resetContainers();
    resetCounters();
    displayAllTasks();

}

function validate(element, regex) {
    if (regex.test(element.value)) 
    {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      element.parentElement.nextElementSibling.classList.replace("d-block","d-none");
      return true;
    }
  
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.parentElement.nextElementSibling.classList.replace("d-none","d-block");
  
    return false;
  }


  // TO DO change Bg-color  
const colorsArr = ["#FAEF9B", "#D5F0C1", "#F3CCF3", "#C5FFF8" , "#00ADB5" , "#8785A2" , "#F6F6F6" , "#FFE2E2" , "#FFC7C7"];
function changeBgColor(event, index) {
    const color = colorsArr[Math.trunc(Math.random() * colorsArr.length)];
    allTasks[index].bgColor = color;
  
    setTasksToLocalStorage();
    event.target.closest(".task").style.backgroundColor = color; 

}
 
function changeToBars(){
    gridBtn.classList.remove("active");
    barsBtn.classList.add("active");

    for (let index = 0; index < sections.length; index++) {
        sections[index].classList.remove("col-md-6" , "col-lg-4");
        sections[index].style.overflow = "auto";
        
    }

    for (let j = 0; j < tasksContainers.length; j++) {
       
        tasksContainers[j].setAttribute("data-view" , "bars");
    }
}
function changeToGrids(){
    barsBtn.classList.remove("active");
    gridBtn.classList.add("active");

    for (let index = 0; index < sections.length; index++) {
        sections[index].classList.add("col-md-6" , "col-lg-4");
        sections[index].style.overflow = "hidden";
        
    }
    for (let j = 0; j < tasksContainers.length; j++) {
       
        tasksContainers[j].removeAttribute("data-view" , "bars");
    }

}

// TODO Dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
  }
  
// >>>>>>>>Events<<<<<<<<<
// >>>>>>>>>><<<<<<<<<<<<

newTaskBtn.addEventListener('click' , function(){
    
    showModal();

});


modal.addEventListener("click", function (e) {
    if (e.target.id ==='modal') {
        hideModal();
    }
});


document.addEventListener('keyup' , function (e)
{
    if(e.code === 'Escape')
    {
        hideModal();
    }
    
});

addBtn.addEventListener('click' , function(){
    
    addTask();
    
});


searchInput.addEventListener('input' , function(){

    searchInputs();
});

updateBtn.addEventListener('click' , function(){
    editTasks();
    hideModal();
})

titleInput.addEventListener("input", function () {
    validate(titleInput, titleRegex);
});

descriptionInput.addEventListener("input", function () {
    validate(descriptionInput, descRegex);
});

barsBtn.addEventListener('click' , function(){
    changeToBars();
});
gridBtn.addEventListener('click' , function(){
    changeToGrids();
});

darkModeBtn.addEventListener('click', function(){
    toggleDarkMode();
});




// LogOut Button 
const logOutBtn = document.querySelector('.logout');
logOutBtn.addEventListener('click' , logOut);