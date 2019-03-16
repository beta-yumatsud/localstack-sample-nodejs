const todo = require("../libs/todo")

test('optional count zero', () => {
    const todoList = [
        {title: "Create Node.js sample application", optional: false},
        {title: "Create test code Node.js sample", optional: false},
        {title: "Create docker-compose with localStack", optional: false}
    ]
    expect(todo.countOptionals(todoList)).toBe(0)
})
