const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const addBtn = document.getElementById('add-btn');

// Add with Enter
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && input.value.trim()) {
    addTodo(input.value.trim());
    input.value = '';
  }
});

// add with Button
addBtn.addEventListener('click', function () {
  if (input.value.trim()) {
    addTodo(input.value.trim());
    input.value = '';
  }
});

function addTodo(text) {
  const li = document.createElement('li');
  li.style.display = 'flex';
  li.style.alignItems = 'center';
  li.style.justifyContent = 'space-between';
  li.style.background = '#f9f9f9';
  li.style.borderRadius = '6px';
  li.style.padding = '10px 15px';
  li.style.marginBottom = '10px';

  // Left side: checkbox + text
  const leftSide = document.createElement('div');
  leftSide.style.display = 'flex';
  leftSide.style.alignItems = 'center';
  leftSide.style.flex = '1';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.style.marginRight = '10px';
  checkbox.title = 'Complete Task';

  const taskText = document.createElement('span');
  taskText.textContent = text;

  checkbox.addEventListener('change', () => {
    taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    checkbox.title = checkbox.checked ? '완료 해제하려면 클릭' : '완료로 표시하려면 클릭';

    // move based on status
    list.removeChild(li);
    if (!checkbox.checked) {
      list.insertBefore(li, list.firstChild);
    } else {
      list.appendChild(li);
    }
  });

  leftSide.appendChild(checkbox);
  leftSide.appendChild(taskText);

  // right side - edit and delete
  const icons = document.createElement('div');

  const edit = document.createElement('span');
  edit.textContent = '✏️';
  edit.title = 'Edit Task';
  edit.style.cursor = 'pointer';
  edit.style.marginRight = '10px';

  // editing function
  let editing = false;
  edit.onclick = () => {
    if (!editing) {
      // switch to input
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = taskText.textContent;
      inputEdit.style.flex = '1';
      inputEdit.style.marginRight = '10px';

      // replace span with input
      leftSide.replaceChild(inputEdit, taskText);
      inputEdit.focus();

      // save on Enter
      inputEdit.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          taskText.textContent = inputEdit.value;
          leftSide.replaceChild(taskText, inputEdit);
          editing = false;
        }
      });

      editing = true;
    } else {
      // if clicked again while editing, save manually
      const inputEdit = leftSide.querySelector('input');
      if (inputEdit) {
        taskText.textContent = inputEdit.value;
        leftSide.replaceChild(taskText, inputEdit);
        editing = false;
      }
    }
  };

  const del = document.createElement('span');
  del.textContent = '🗑️';
  del.title = 'Delete Task';
  del.style.cursor = 'pointer';
  del.onclick = () => {
    list.removeChild(li);
  };



  icons.appendChild(edit);
  icons.appendChild(del);

  li.appendChild(leftSide);
  li.appendChild(icons);
  list.appendChild(li);
}
