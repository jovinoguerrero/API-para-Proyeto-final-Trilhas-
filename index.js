const express = require('express')
const { Sequelize, DataTypes} = require('sequelize')
const Task = require('./models/task')

const app = express()
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './task-list.db' })
const tasks = Task(sequelize, DataTypes)



// We need to parse JSON coming from requests
app.use(express.json())

// List tasks
app.get('/tasks', async (req, res) => {
  const tas =  await tasks.findAll()
  
  res.json({ Tasks: tas })
})

// Create task

app.post('/tasks', async (req, res) => {
  const novo = await tasks.create({
    title: req.body.title,
    description: req.body.description,
    imagem: req.body.imagem,
    tempo: req.body.tempo,
    distancia: req.body.distancia,
    altura: req.body.altura,
    dificuldade: req.body.dificuldade
  })


  res.send(novo)
 
})

// Show task
app.get('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const Find = await tasks.findByPk(taskId)
  res.json({ Find })
 
})

// Update task
app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const body = await tasks.update({     
    title: req.body.title,
    description: req.body.description,
    imagem: req.body.imagem,
    tempo: req.body.tempo,
    distancia: req.body.distancia,
    altura: req.body.altura,
    dificuldade: req.body.dificuldade },
    { where: {id: taskId}})

  res.json({ action: 'Atualizando task', taskId: taskId })

})

// Delete task
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const del = await tasks.destroy({ where: { id: taskId }})
  res.send({ action: 'Deleting task', taskId: taskId })
  
})

app.listen(3000, () => {
  console.log('Iniciando o ExpressJS na porta 3000')
})
