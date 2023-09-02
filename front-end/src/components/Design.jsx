import { useEffect,useState } from 'react';
import axios from 'axios';

const Design = () => {
    var quoteParsed;
    if(localStorage.length>0){
        const initialQuote=localStorage.getItem('quote');
        quoteParsed=JSON.parse(initialQuote);
    }else{
        quoteParsed='';
    }
    const [quote,setQuote]=useState(quoteParsed);
    const getQuote=async ()=>{
        try{
            const response=await axios.get(`http://localhost:2000/getQuote`)
            console.log(response);
            const newQuote=response.data;
            localStorage.setItem('quote',newQuote);
            setQuote(response.data);
        }catch(err){    
            console.log(`Error:${err}`);
        }
    }
    useEffect(()=>{
            if(!quote){
                getQuote();
            }
    },[]);
    return (
        <div className="body">
            <div className="container">
                <h1>
                    <span>{quote[0].quote}</span>
                </h1>
                <br/>
                <h4>&mdash;J{quote[0].author}</h4>
            </div>
        </div>
    )
}
export default Design;