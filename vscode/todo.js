// object to hold application data
const data = {
    todos: ["Breakfast", "Lunch"]
}

// object to hold main dom nodes
const $nodes = {
    div: $("div.todos"),
    form: $("form"),
    textInput: $("input[type='text']")
}

// save the todos into local storage
function saveTodos(){
    // turn the data object into a JSON
    const json = JSON.stringify(data)
    // save the string in local storage
    localStorage.setItem("tododata", json)
}

// function that renders todos to the div
function renderTodos(){

    // empty out the div before rendering
    $nodes.div.empty()

    // render each todo
    for (let todo of data.todos){
        const $todoDiv = $("<div>").addClass("todo")
        $todoDiv.text(todo)
        $nodes.div.append($todoDiv)

        // add click event to remove todo
        $todoDiv.on("click", function(event){
            // get the text of the thing
            const text = $(event.target).text()
            const index = data.todos.indexOf(text)
            data.todos.splice(index, 1)
            renderTodos()
        })
    }

    saveTodos()

}

// function for adding todos
function addTodo(newTodo){
    data.todos.push(newTodo)
    renderTodos()
}

$nodes.form.on("submit", function(event){
    event.preventDefault() // prevents refreshes
    addTodo($nodes.textInput.val()) // add the todo
    $nodes.textInput.val("") // empties the form
})


renderTodos()