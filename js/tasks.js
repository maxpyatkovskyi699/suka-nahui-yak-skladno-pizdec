// js/tasks.js
document.addEventListener("DOMContentLoaded", () => {
  const newTaskInput = document.getElementById("newTaskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const doneTaskList = document.getElementById("doneTaskList");
  const deletedTaskList = document.getElementById("deletedTaskList");
  const statusFilter = document.getElementById("statusFilter");
  const doneTasksTitle = document.getElementById("doneTasksTitle");
  const deletedTasksTitle = document.getElementById("deletedTasksTitle");

  let tasks = [];

  function renderTasks(filter = "all") {
    taskList.innerHTML = "";
    doneTaskList.innerHTML = "";
    deletedTaskList.innerHTML = "";
    let activeTasksCount = 0;
    let doneTasksCount = 0;
    let deletedTasksCount = 0;

    tasks.forEach((task) => {
      if (filter === "all" || filter === task.status) {
        const listItem = document.createElement("li");
        listItem.dataset.taskId = task.id;

        const taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.textContent = task.text;
        if (task.status === "deleted") {
          taskText.classList.add("deleted");
        }
        listItem.appendChild(taskText);

        const taskDetails = document.createElement("span");
        taskDetails.classList.add("task-details");
        let detailsText = "";
        if (task.status === "done") {
          detailsText = ` (Виконано: ${formatDateTime(task.doneAt)})`;
        } else if (task.status === "deleted") {
          detailsText = ` (Видалено: ${formatDateTime(task.deletedAt)})`;
        }
        taskDetails.textContent = detailsText;
        listItem.appendChild(taskDetails);

        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        if (task.status === "active") {
          const doneButton = createActionButton(
            "images/done.png",
            "Виконати",
            () => toggleTaskStatus(task.id, "done")
          );
          const deleteButton = createActionButton(
            "images/cross.png",
            "Видалити",
            () => toggleTaskStatus(task.id, "deleted")
          );
          taskActions.appendChild(doneButton);
          taskActions.appendChild(deleteButton);
          activeTasksCount++;
          taskList.prepend(listItem);
        } else if (task.status === "done" || task.status === "deleted") {
          const deleteButton = createActionButton(
            "images/bin.png",
            "Видалити назавжди",
            () => deleteTaskPermanently(task.id)
          );
          taskActions.appendChild(deleteButton);
          if (task.status === "done") {
            doneTaskList.prepend(listItem);
            doneTasksCount++;
          } else if (task.status === "deleted") {
            deletedTaskList.prepend(listItem);
            deletedTasksCount++;
          }
        }

        listItem.appendChild(taskActions);
      }
    });

    doneTasksTitle.style.display = doneTasksCount > 0 ? "block" : "none";
    deletedTasksTitle.style.display = deletedTasksCount > 0 ? "block" : "none";
  }

  function createActionButton(imageSrc, altText, onClick) {
    const button = document.createElement("button");
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = altText;
    button.appendChild(img);
    button.addEventListener("click", onClick);
    return button;
  }

  function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
      const newTask = {
        id: Date.now(),
        text: taskText,
        status: "active",
        createdAt: new Date(),
        doneAt: null,
        deletedAt: null,
      };
      tasks.unshift(newTask);
      renderTasks(statusFilter.value);
      newTaskInput.value = "";
    }
  }

  function toggleTaskStatus(taskId, newStatus) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      if (newStatus === "done") {
        tasks[taskIndex].status = "done";
        tasks[taskIndex].doneAt = new Date();
      } else if (newStatus === "deleted") {
        tasks[taskIndex].status = "deleted";
        tasks[taskIndex].deletedAt = new Date();
      }
      renderTasks(statusFilter.value);
    }
  }

  function deleteTaskPermanently(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks(statusFilter.value);
  }

  function formatDateTime(date) {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Intl.DateTimeFormat("uk-UA", options).format(date);
  }

  addTaskBtn.addEventListener("click", addTask);
  newTaskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  statusFilter.addEventListener("change", () => {
    renderTasks(statusFilter.value);
  });

  // Початкове відображення задач (якщо є)
  renderTasks("active");
});
