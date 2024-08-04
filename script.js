const nameInput = document.getElementById('name');
const professionInput = document.getElementById('profession');
const ageInput = document.getElementById('age');
const addEmployeeBtn = document.getElementById('addEmployee');
const messageDiv = document.getElementById('message');
const employeeListDiv = document.getElementById('employeeList');
const employeeCount = document.getElementById('employeeCount');

let employees = [];
let employeeId = 1;

addEmployeeBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const profession = professionInput.value.trim();
    const age = parseInt(ageInput.value.trim());

    if (name && profession && !isNaN(age)) {
        const newEmployee = {
            id: employeeId++,
            name: name,
            profession: profession,
            age: age
        };

        employees.push(newEmployee);

        nameInput.value = '';
        professionInput.value = '';
        ageInput.value = '';

        messageDiv.textContent = 'Success: Employee Added!';
        messageDiv.classList.add('success');
        messageDiv.classList.remove('error');

        displayEmployeeDetails();
    } else {
        messageDiv.textContent = 'Error: Please make sure all fields are filled before adding an employee';
        messageDiv.classList.add('error');
        messageDiv.classList.remove('success');
    }
});

function displayEmployeeDetails() {
    employeeListDiv.innerHTML = '';

    employees.forEach((employee, index) => {
        const employeeItem = document.createElement('div');
        employeeItem.classList.add('employee-item');
        employeeItem.innerHTML = `
          <div class="employee-details">
              <span>${index + 1}</span>
              <span>Name: ${employee.name}</span>
              <span>Profession: ${employee.profession}</span>
              <span>Age: ${employee.age}</span>
          </div>
          <div class="delete-container">
              <button class="delete" data-id="${employee.id}">Delete User</button>
          </div>
      `;
        employeeListDiv.appendChild(employeeItem);

        const deleteButton = employeeItem.querySelector('.delete');
        deleteButton.addEventListener('click', () => {
            const idToDelete = parseInt(deleteButton.dataset.id);
            employees = employees.filter(employee => employee.id !== idToDelete);
            messageDiv.textContent = '';
            displayEmployeeDetails();
        });

    });

    if (employees.length === 0) {
        employeeCount.textContent = 'You have 0 Employees';
        employeeCount.style.display = 'block';
    } else {
        employeeCount.style.display = 'none';
    }
}