
module.exports = {
    countOptionals: function (todos) {
        const result = todos.filter(todo => todo.optional === true)
        return result.length
    }
}
