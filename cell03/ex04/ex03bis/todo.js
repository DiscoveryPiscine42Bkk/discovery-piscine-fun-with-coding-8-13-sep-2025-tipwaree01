$(document).ready(function() {
    const $todoList = $('#ft_list');

    loadTasks();

    $('#newTodoButton').click(function() {
        const task = prompt('Enter a new TO DO:');
        if (task && task.trim() !== "") {
            addTask(task);
            saveTasks();
        }
    });

    function addTask(task) {
        const $todoDiv = $('<div></div>').text(task);

        $todoDiv.click(function() {
            if (confirm('Do you want to delete this TO DO?')) {
                $todoDiv.remove();
                saveTasks();
            }
        });

        $todoList.prepend($todoDiv);
    }

    function saveTasks() {
        const todos = [];
        $todoList.children('div').each(function() {
            todos.push($(this).text());
        });
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
