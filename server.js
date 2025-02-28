const express = require('express')
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookieParser())

const SECRET_KEY = 'Rishi145'

const users=[{ID:'E12345', password:'securePass'}]

app.post('/login',(req,res)=>{
    const {ID, password} = req.body

    const user = users.find(u=>u.ID===ID && u.password===password)
    if (!user){
        return res.status(401).json({message:'Invalid'})
    }

    const token = jwt.sign({ID: user.ID}, SECRET_KEY, {expiresIn:'10m'})
    
    res.cookie('auth_token',token,{
        httpOnly: true,
        secure: true,
        maxAge: 10*60*1000
    })

    res.status(200).json({message:"Login successful"})
    res.json({token})
})


app.get('/dashboard',(req,res)=>{
    const token = req.headers.authorization.split(' ')[1]
    if (!token){
        return res.status(401).json({message:'Unauthorized'})
    }

    try{
        const decoded = jwt.verify(token,SECRET_KEY)
        if (decoded.ID==='E12345'){
            res.status(200).json({message:'Welcome to your Employee Dashboard!'})
        }
    }catch(er){
        res.status(500).json({message:'Unauthorized'})
    }
})

const port=3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});