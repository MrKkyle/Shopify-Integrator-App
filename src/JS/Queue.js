import { createRoot } from 'react-dom/client';
import {useEffect, useState} from 'react';
import $ from 'jquery';
import Page2 from '../components/Page2';
import Queue_details from '../components/semi-components/queue-details';
import { DetailedView, Pagintation } from './Functions/Queue_Functions';


import '../CSS/page1.css';

function Queue()
{
    const[inputs, setInputs] = useState({});

    const handleChange = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const SearchProduct = (event) =>
    {
        event.preventDefault();
    }

    useEffect(()=> 
    {
        /* Ensures the page elements are set correctly */
        let navigation = document.getElementById("navbar");
        let message = document.getElementById("message");
        window.onload = function(event)
        {
            navigation.style.left = "30%";
            navigation.style.position = "absolute";
            navigation.style.width = "70%";
            navigation.style.animation = "MoveLeft 0.8s ease";
        }

        /*  API INITIAL-REQUEST */
        const api_key = localStorage.getItem('api_key');
        $.ajaxSetup({ headers: { 'Authorization': 'ApiKey ' + api_key} });
        $.get("http://localhost:8080/api/queue?page=1", [], [])
        .done(function( _data) 
        {
            console.log(_data);
            if(_data == "")
            {
                document.querySelector(".empty-message").style.display = "block";
            }
            else 
            {
                let root;
                let pan_main = document.querySelector(".pan-main");
                let div = document.createElement("div");
                pan_main.appendChild(div);

                root = createRoot(div);
                root.render(_data.map((el, i) => <Queue_details key={`${el.title}_${i}`}
                Queue_Type={el.queue_type} Queue_Instruction={el.instruction} Queue_Status={el.status} Queue_ID={el.id}
                />))
            } 
        })
        .fail( function(xhr) 
        { 
            message.innerHTML = JSON.parse(xhr.responseText).error;
            message.style.background = "#9f0a0a";
            setTimeout(() =>
            {
                message.innerHTML = "";
                message.style.backgroundColor = "transparent";
                message.style.display = "none";
            }, 1000);
        });

        Pagintation(1);
        setTimeout(() => { DetailedView();}, 300);

        let C_filter = document.getElementById("clear_filter");
        C_filter.addEventListener("click", () => 
        {
            document.querySelector(".empty-message").style.display = "none";

            const api_key = localStorage.getItem('api_key');
            $.ajaxSetup({ headers: { 'Authorization': 'ApiKey ' + api_key} });
            $.get("http://localhost:8080/api/queue?page=1", [], [])
            .done(function( _data) 
            {
                console.log(_data);
                let filter_button = document.getElementById("_filter");
                let C_filter = document.getElementById("clear_filter");
                filter_button.disabled = true;
                C_filter.disabled = true;
                filter_button.style.cursor = "not-allowed";
                C_filter.style.cursor = "not-allowed";

                let root;
                let pan_main;
                if(document.querySelector(".pan-main") != null){ document.querySelector(".pan-main").remove(); }
            
                pan_main = document.createElement('div');
                let main_elements = document.querySelector(".main-elements");
                pan_main.className = "pan-main";
                main_elements.appendChild(pan_main);
                root = createRoot(pan_main);
                root.render(_data.map((el, i) => <Queue_details key={`${el.title}_${i}`} Queue_Updated_At={el.updated_at} Queue_Creation_Date={el.created_at} 
                Queue_Type={el.queue_type} Queue_Instruction={el.instruction} Queue_Status={el.status} Queue_ID={el.id}
                />))
                setTimeout(() => { DetailedView();}, 300);
                Pagintation(1);
            })
            .fail( function(xhr) { alert(xhr.responseText); });
        });


        /* Re-Sync function runs every 30 seconds minutes*/
        var timerID = setInterval(function() 
        {
            /*  API  */
            const api_key = localStorage.getItem('api_key');
            $.ajaxSetup({ headers: { 'Authorization': 'ApiKey ' + api_key} });
            $.get("http://localhost:8080/api/queue?page=1", [], [])
            .done(function( _data) 
            {
                console.log(_data);

                let root;
                let pan_main;
                if(document.querySelector(".pan-main") != null){ document.querySelector(".pan-main").remove(); }
            
                pan_main = document.createElement('div');
                let main_elements = document.querySelector(".main-elements");
                pan_main.className = "pan-main";
                main_elements.appendChild(pan_main);
                root = createRoot(pan_main);
                root.render(_data.map((el, i) => <Queue_details key={`${el.title}_${i}`} Queue_Updated_At={el.updated_at} Queue_Creation_Date={el.created_at} 
                Queue_Type={el.queue_type} Queue_Instruction={el.instruction} Queue_Status={el.status} Queue_ID={el.id}
                />))
                setTimeout(() => { DetailedView();}, 300);
                Pagintation(1);
            })
            .fail( function(xhr) { alert(xhr.responseText); });
        }, 5 * 1000); 
        
        //clearInterval(timerID);

    }, []);
    
    return (
        <div className = "queue">
            <div className = "main">
                <div className = "search">
                    <form className = "search-area" style ={{top: '30px'}} id = "search" autoComplete='off' onSubmit={(event) => SearchProduct(event)}>
                        <input className ="search-area" type="search" placeholder="Search..." 
                        name = "search" value = {inputs.search || ""}  onChange = {handleChange}></input>
                    </form>    
                </div>
                <div className = "main-elements" style={{top: '53%'}}>
                    <div className = "empty-message">No results found.</div>
                    <div className = "pan-main" id = "pan-main">

                    </div>
                </div>
                <div className = "center" id = "pag" style ={{top: '45px'}}>
                    <div className = "pagination">
                        <button className = "active" id = "hod"></button>
                        <button id = "next">→</button>
                        <button id = "prev">←</button>
                    </div>
                </div>
            </div>

            <Page2 title = "Queue"/>
            <div className = "details">
                <div className = 'close-button'>&times;</div>
            </div>
            <div className = 'info-message' id = 'message' />
        </div>
    );
}

export default Queue;