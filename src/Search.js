import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Navbars from "./Navbars";
import "./App.css"
function Search(params) {
    const[tag,set_tag]=useState("")
    const[data,set_data]=useState("")
function onchange_listner(params) {
    set_tag(params.target.value)
}
function get_data(params) {//Ise likh lena
    axios.get(`http://localhost:8000/get_data?Tag=${tag}`).then((res)=>{
        console.log(res.data);
       set_data(res.data)
    })
}
    return(
        
<>
<Navbars/>
<input onChange={onchange_listner} placeholder="Search by tags"/>
<button type="button" onClick={get_data} class="btn btn-outline-secondary">Primary</button>
{data && data.map((data,i,arr)=>{
   return (
   
        <>
       
    <h1>
        
        {data.name}
    </h1>
    
    <p>
      <h3>Content:</h3>{data.file_data}
    </p>
    <hr/>
    </>
    )
})
}

</>
    );
}
export default Search;