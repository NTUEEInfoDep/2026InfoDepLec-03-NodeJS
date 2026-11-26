const itemTemplate = document.querySelector("#expense-item-template");
const expenseList = document.querySelector("#expenses");
const expenseTitle = document.querySelector("#expense-title");
const expenseValue = document.querySelector("#expense-value");
const addExpenseButton = document.querySelector("#expense-add");
const apiRoot = "http://localhost:8000";

async function main() {
  setupExpenseInputContainer();
  await refresh();
}

function setupExpenseInputContainer() {
  addExpenseButton.addEventListener("click", async () => {
    const title = expenseTitle.value;
    const value = expenseValue.value;
    if (!title) {
      alert("Please enter an expense title!");
      return;
    }
    if (!value) {
      alert("Please enter an expense value!");
      return;
    }
    try {
      const newExpense = { 
        title: title,
        value: value
       };

      await createExpense(newExpense);
      expenseTitle.value = "";
      expenseValue.value = "";
      await refresh();
    } catch (error) {
      alert("Failed to create expense!");
      return;
    }
  });
}

async function refresh(){
  expenseList.replaceChildren();
  try {
    const expenses = await getExpenses();
    expenses.forEach((expense) => createExpenseElement(expense));
  } catch (error) {
    alert("Failed to load expenses!");
  }
}

function createExpenseElement(expense) {
  const item = itemTemplate.content.cloneNode(true);
  const container = item.querySelector(".expense-item-container");
  const titleElement = item.querySelector("#expense-item-title");
  const valueElement = item.querySelector("#expense-item-value");
  const date = item.querySelector("#expense-item-date");
  const titleInput = item.querySelector("#expense-item-title-input");
  const valueInput = item.querySelector("#expense-item-value-input");
  const editButton = item.querySelector("button.edit-expense");
  const updateButton = item.querySelector("button.save-expense");
  const deleteButton = item.querySelector("button.delete-expense");

  container.id = expense.id;
  titleElement.innerText = expense.title;
  valueElement.innerText = "$" + expense.value;
  date.innerText = "Updated at: " + expense.updateDate;
  titleInput.hidden = true;
  valueInput.hidden = true;
  updateButton.hidden = true;

  editButton.dataset.id = expense.id;
  editButton.addEventListener("click", () => {
    titleInput.value = titleElement.innerText;
    valueInput.value = Number(valueElement.innerText.substring(1));

    editButton.hidden = true;
    updateButton.hidden = false;
    titleElement.hidden = true;
    valueElement.hidden = true;
    titleInput.hidden = false;
    valueInput.hidden = false;
  });

  updateButton.dataset.id = expense.id;
  updateButton.addEventListener("click", async () => {
    try {
      const newExpense = {
          title: titleInput.value,
          value: valueInput.value
      };

      await updateExpense(expense.id, newExpense);
      titleElement.hidden = false;
      valueElement.hidden = false;
      titleInput.hidden = true;
      valueInput.hidden = true;
      updateButton.hidden = true;
      editButton.hidden = false;

      await refresh();
    } catch (error) {
      alert("Failed to update expense!");
    }
  });

  deleteButton.dataset.id = expense.id;
  deleteButton.addEventListener("click", async () => {
    try {
      await deleteExpenseById(expense.id);
      const expenseElement = document.getElementById(expense.id);
      expenseElement.remove();

      await refresh();
    } catch (error) {
      alert("Failed to delete expense!");
    }
  });

  expenseList.appendChild(item);
}


// API functions
async function getExpenses() {
  const response = await fetch(`${apiRoot}/expense`);
  const data = await response.json();
  return data;
}

async function createExpense(expense) {
  const response = await fetch(`${apiRoot}/expense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  const data = await response.json();
  return data;
}

async function updateExpense(id, expense) {
  const response = await fetch(`${apiRoot}/expense/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  const data = await response.json();
  return data;
}

async function deleteExpenseById(id) {
  const response = await fetch(`${apiRoot}/expense/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}


main();