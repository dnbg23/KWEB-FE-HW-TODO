type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let id = 0;

const input = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn')!;
const list = document.getElementById('todo-list')!;

function render() {
  list.innerHTML = '';
  todos.forEach(todo => {
    const div = document.createElement('div');
    div.className = 'todo';

    const span = document.createElement('span');
    span.textContent = todo.text;

    const btn = document.createElement('button');
    btn.textContent = '☑️';
    btn.onclick = () => {
      todos = todos.filter(t => t.id !== todo.id);
      render();
    };

    div.appendChild(btn);
    div.appendChild(span);
    list.appendChild(div);
  });
}

addBtn.addEventListener('click', () => {
  if (!input.value.trim()) return;
  todos.push({ id: ++id, text: input.value });
  input.value = '';
  render();
});

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') addBtn.click();
});
