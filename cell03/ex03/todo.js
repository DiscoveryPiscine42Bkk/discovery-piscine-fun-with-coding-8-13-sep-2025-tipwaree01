document.addEventListener('DOMContentLoaded', () => {
    const newTodoButton = document.getElementById('newTodoButton');
    const todoList = document.getElementById('ft_list');

    loadTasks();

    newTodoButton.addEventListener('click', () => {
        const task = prompt('Enter a new TO DO:');
        if (task && task.trim() !== "") {
            addTask(task);
            saveTasks();
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = "🏷️ " + task;
        li.title = "Click to delete";
        
        li.addEventListener('click', () => {
            if (confirm('Do you want to delete this TO DO?')) {
                li.remove();
                saveTasks();
            }
        });

        const hr = document.createElement('hr');
        todoList.insertBefore(hr, todoList.firstChild);
        todoList.insertBefore(li, hr);
    }

    function saveTasks() {
        const todos = Array.from(todoList.querySelectorAll('li')).map(li => li.textContent.slice(2));
        document.cookie = `tasks=${encodeURIComponent(JSON.stringify(todos))};path=/;max-age=31536000`;
    }

    function loadTasks() {
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [name, value] = cookie.split('=');
            acc[name] = value;
            return acc;
        }, {});

        const tasks = cookies.tasks ? JSON.parse(decodeURIComponent(cookies.tasks)) : [];
        tasks.forEach(task => addTask(task));
    }
});
