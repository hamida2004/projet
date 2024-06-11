const router = require('express').Router()
const { createService, getAllServices, getServiceById, deleteService, updateServiceName, assignUserToService, removeUserFromService,getAllServiceUsers} = require('../Controllers/ServiceController')

router
.get('/', getAllServices)//done
.post('/', createService)//done
.get('/:id', getServiceById)//doen
.put('/:id', updateServiceName)//done
.delete('/:id', deleteService) // done
.put('/:id/users/', assignUserToService)//done
.delete('/users/:id', removeUserFromService) //done
.get('/:id/users', getAllServiceUsers)//done
module.exports=router