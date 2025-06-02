const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && input.value.trim()) {
    addTodo(input.value.trim());
    input.value = '';
  }
});

function addTodo(text) {
  const li = document.createElement('li');
  const checkbox = document.createElement('span');
  const taskText = document.createElement('span');

  checkbox.textContent = '⬜'; // unchecked emoji
  checkbox.style.cursor = 'pointer';
  checkbox.style.marginRight = '8px';

  taskText.textContent = text;

  // toggle complete/incomplete
  checkbox.onclick = () => {
    const completed = checkbox.textContent === '☑️';
    checkbox.textContent = completed ? '⬜' : '☑️';
    taskText.style.textDecoration = completed ? 'none' : 'line-through';
  };

  li.appendChild(checkbox);
  li.appendChild(taskText);
  list.appendChild(li);
}
