document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('ft_list');

    loadTasks();

    document.getElementById('newTodoButton').addEventListener('click', function() {
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

        li.addEventListener('click', function() {
            if (confirm('Do you want to delete this TO DO?')) {
                const hr = li.nextElementSibling;
                if (hr && hr.tagName === 'HR') hr.remove();
                li.remove();
                saveTasks();
            }
        });

        const hr = document.createElement('hr');
        todoList.insertBefore(hr, todoList.firstChild);
        todoList.insertBefore(li, hr);
    }

    function saveTasks() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(li => {
            tasks.push(li.textContent.slice(2)); // ลบ emoji
        });
        document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))};path=/;max-age=31536000`;
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
