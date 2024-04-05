import { Router } from "express";

const blogRouters = new Router()

blogRouters.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})

blogRouters.post('/post', (req, res) => {
  
})

export default blogRouters;
