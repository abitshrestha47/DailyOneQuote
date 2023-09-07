const express=require('express');
const quoteRouter=express.Router();
const request=require('request');
require('dotenv').config();
const key=process.env.key;
const URL=process.env.url;
console.log(URL);

quoteRouter.get('/',(req,res)=>{
    request.get({
        url:URL,
        headers:{
            'X-Api-Key':key
        },
    },function(error,response,body){
        if(error) res.json(error);
        else if(response.statusCode!=200) return console.error('Error:',response.statusCode,body.toString('utf8'));
        else res.json(body);
    })
});

module.exports=quoteRouter;