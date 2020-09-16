const usersModel = require('../models/users')
const {success,failed,tokenResult} = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secretKey } = require('../helpers/env')
const users = {
    register: async(req,res) => {
        try{
        const body = req.body
        const salt =  await  bcrypt.genSalt(10)
        const hashPw = await bcrypt.hash(body.password, salt)
        const data = {
            email: body.email,
            password: hashPw
        }
        usersModel.register(data)
        .then((result)=>{
            tokenResult(res,result,"Register Success")
        })
    } catch (err){
        failed(res,[],err.message)
    }
    },
    login: async(req,res) => {
        try{
        const body = req.body
        usersModel.login(body)
        .then(async(result)=>{
            const results = result[0]
            const password = results.password
            const isMatch = await bcrypt.compare(body.password,password)
            if(isMatch){
                jwt.sign({
                    email:results.email,
                  }, secretKey, { expiresIn: 360 },
                 (err,token) => {
                     if(err){
                         console.log(err)
                     }else{
                        tokenResult(res,{token:token},"Login Success")
                     }
                 } 
            )

            }else{
                failed(res,[], 'Email atau password salah') 
            }
        })
    } catch (err){
        failed(res,[],err.message)
    }
    }
}

module.exports = users