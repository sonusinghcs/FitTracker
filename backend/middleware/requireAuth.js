const jwt = require('jsonwebtoken');
const User = require('../models/userModels')

const requireAuth = async(req,res,next) => {
    const {authorization} = req.headers 
    if(!authorization){
        return res.status(401).json({error: 'You are not authenticated'})
    }

    const token = authorization.split(' ')[1]

    try {
       const {_id} = jwt.verify(token, process.env.SECRET)

       req.user = await User.findOne({_id}).select('_id')

        next()
    } catch (error) {
        res.status(401).json({error: 'Invalid token'})
    }
}
module.exports = requireAuth