const express = require('express')
const router = express.Router();
const toDos = [];

// Middleware to validate the ID parameter
function validateId(req, res, next) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  const todo = toDos.find(todo => todo.id === id);
  if (!todo) {
    return res.status(404).json({ message: 'Not found' });
  }
  req.todo = todo;
  next();
}

//  middleware to validate that both the task title and description are not empty. If they are empty, return an appropriate error message
function validateTask(req, res, next) {
  console.log("misk")
console.log(req.body)
  // const {title,description} = req.body;
  let title = req.body.title;
  let description = req.body.description

console.log("mauwh")
  if (!title || !description) 
  {
    return res.status(400).json({ message: 'Task title and description fields are required !' });
  }
  next();

}

//GET /todos: List all todos.

router.get('/toDos', (req, res) => {

  const limit = parseInt(req.query.limit) || toDos.length;
  const skip = parseInt(req.query.skip) || 0;
  const paginatedToDos = toDos.slice(skip, skip + limit);
  res.status(200).json(paginatedToDos);

});

//GET /todos/:id: Show a single todo.

router.get('/toDos/:id', validateId, (req, res) => {

  res.status(200).json(req.todo);

});

//DELETE /todos/:id: Delete a single todo.

router.delete('/toDos/:id', validateId, (req, res) => {

  const index = toDos.findIndex(todo => todo.id === req.todo.id);
  toDos.splice(index, 1);
  res.status(204).send();

});

//POST /todos/:id: Create a single todo.

router.post('/toDos', validateTask, (req, res) => 
{
  const id = toDos.length + 1;
  const {title,description} = req.body;
  const todo = {
    id,
    title,
    description,
    completed,
  };
  toDos.push(todo);
  res.status(201).json(toDos);
});

//PUT /todos/:id: Update a single todo.
router.put('/toDos/:id', validateId, validateTask, (req, res) => {

  const { title, description } = req.body;
  const todo = req.todo;
  todo.title = title;
  todo.description = description;
  res.status(200).json(todo);

});

module.exports = router;
