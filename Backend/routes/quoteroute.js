const express=require('express');
const quoteRouter=express.Router();
const request=require('request');
var category='life';
require('dotenv').config();
const key=process.env.key;

quoteRouter.get('/',(req,res)=>{
    request.get({
        url:'https://api.api-ninjas.com/v1/quotes?category='+category,
        headers:{
            'X-Api-Key':key
        },
    },function(error,response,body){
        if(error) return console.log("Request Failed",error);
        else if(response.statusCode!=200) return console.error('Error:',response.statusCode,body.toString('utf8'));
        else res.json(body);
    })
});

module.exports=quoteRouter;