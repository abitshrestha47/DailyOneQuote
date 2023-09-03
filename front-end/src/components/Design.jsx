import { useEffect,useState } from 'react';
import axios from 'axios';

const Design = () => {
    //variable for setting the localstorage data
    var quoteParsed;

    //setting localstorage assign the value with variable quote&date
    if(localStorage.length>0){
        const initialQuote=localStorage.getItem('quote&date');
        quoteParsed=JSON.parse(initialQuote);
    }else{
        quoteParsed='';
    }

    //setting the quote if empty '' else from localstoagrage
    const [quote,setQuote]=useState(quoteParsed);

    //get quote i.e new
    const getQuote=async ()=>{
        try{
            const response=await axios.get(`http://localhost:2000/getQuote`)
            console.log(response);
            setQuote(response.data);
            const todayDate=new Date().toISOString();
            const newQuote=JSON.parse(response.data);
            console.log(typeof(newQuote[0]));
            console.log(newQuote);
            newQuote[0].todayDate0=todayDate;
            console.log(newQuote);
            const newQuoteString = JSON.stringify(newQuote);
            localStorage.setItem('quote&date',newQuoteString);
        }catch(err){    
            console.log(`Error:${err}`);
        }
    }

    //if empty get the new quote(first inital mount check if empty then executes)
    useEffect(()=>{
            //if quote is not present 
            if(!quote){
                getQuote();
            }
    },[]);

    return (
        <div className="body">
            <div className="container">
                <h1>
                    {/* quote is  represented by array of objects has only one object inside array so to get first array which is obj & getting its quote value*/}
                    <span>{quote?(quote[0].quote):''}</span>
                </h1>
                <br/>
                {/* similar but for author */}
                <h4>&mdash;{quote?quote[0].author:''}</h4>
            </div>
        </div>
    )
}
export default Design;