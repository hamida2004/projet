const router = require('express').Router()
const { refresh } = require('../Controllers/RefreshController')
router.get('/', refresh )
module.exports= router