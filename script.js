let bugs = JSON.parse(localStorage.getItem("bugs")) || [];

function saveAndRender() {
  localStorage.setItem("bugs", JSON.stringify(bugs));
  renderBugs();
}

function addBug() {
  const title = document.getElementById("bugTitle").value.trim();
  const desc = document.getElementById("bugDesc").value.trim();
  const status = document.getElementById("bugStatus").value;

  if (!title || !desc) {
    alert("Please enter both title and description.");
    return;
  }

  const bug = {
    id: Date.now(),
    title,
    desc,
    status,
  };

  bugs.push(bug);
  document.getElementById("bugTitle").value = "";
  document.getElementById("bugDesc").value = "";
  document.getElementById("bugStatus").value = "To Do";
  saveAndRender();
}

function deleteBug(id) {
  bugs = bugs.filter(bug => bug.id !== id);
  saveAndRender();
}

function changeStatus(id, newStatus) {
  const bug = bugs.find(b => b.id === id);
  if (bug) {
    bug.status = newStatus;
    saveAndRender();
  }
}

function renderBugs() {
  document.getElementById("todoList").innerHTML = "";
  document.getElementById("progressList").innerHTML = "";
  document.getElementById("doneList").innerHTML = "";

  bugs.forEach(bug => {
    const bugEl = document.createElement("div");
    bugEl.className = "bug";
    bugEl.innerHTML = `
      <strong>${bug.title}</strong><br>
      ${bug.desc}<br>
      <button onclick="deleteBug(${bug.id})">Delete</button>
      ${
        bug.status !== "To Do"
          ? `<button onclick="changeStatus(${bug.id}, 'To Do')">To Do</button>`
          : ""
      }
      ${
        bug.status !== "In Progress"
          ? `<button onclick="changeStatus(${bug.id}, 'In Progress')">In Progress</button>`
          : ""
      }
      ${
        bug.status !== "Done"
          ? `<button onclick="changeStatus(${bug.id}, 'Done')">Done</button>`
          : ""
      }
    `;

    if (bug.status === "To Do") {
      document.getElementById("todoList").appendChild(bugEl);
    } else if (bug.status === "In Progress") {
      document.getElementById("progressList").appendChild(bugEl);
    } else if (bug.status === "Done") {
      document.getElementById("doneList").appendChild(bugEl);
    }
  });
}
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}


renderBugs();
