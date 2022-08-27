import React, { useEffect, useState } from 'react';
import "./todolist.scss"
import {BsCardList, BsMusicNoteBeamed, BsPlusLg} from 'react-icons/bs'
import {MdOutlineDownloadDone} from 'react-icons/md'
import {CgDetailsMore} from 'react-icons/cg'
import TodoIT from '../TodoIT/TodoIT';

const Todolist = () => {

    const [jobs, setjobs] = useState([])
    const [active, setActive] = useState(0)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")

    const api = "http://localhost:8000/jobs"
    
    useEffect(() => {
        fetch(api)
            .then((response) => response.json())
            .then((res) => setjobs(res))
    }, [])

    const handleAddJob = () => {
        const data = {
            job: name,
            detail: {
                description: desc,
                priority: active
            }
        }
        const options = {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
        fetch(api,options)
            
        fetch(api)
            .then((response) => response.json())
            .then((res) => setjobs(res))

        setName("");
        setDesc("")
        setActive(0)
    }

    const handleUpdateJob = (id, name, desc, pri) => {

       const kk = document.querySelector(".job-name-input")
       const kk1 = document.querySelector(".job-desc-input")
       kk.value = name
       kk1.value = desc
        setActive(pri)

        console.log("ip1 " + kk.value +" ip2 "+kk1.value +" pri" + pri)
        // const data = {
        //     job: name,
        //     detail: {
        //         description: desc,
        //         priority: pri
        //     }
        // }
        // const options = {
        //     method: "PUT",
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify(data)
        // }
        // fetch(api+"/"+id,options)
            
        // fetch(api)
        //     .then((response) => response.json())
        //     .then((res) => setjobs(res))

        // setName("");
        // setDesc("")
        // setActive(0)
    }

    const handleDelJob = (id) => {

        const options = {
            method: "DELETE",
        }
        fetch(api+"/"+id, options)

        fetch(api)
            .then((response) => response.json())
            .then((res) => setjobs(res))
    }



    // npx json-server --watch db.json --port 8000
    return (
        <div className='todo-modal'>
            <div className='todo-box'>
                <div className='todo-content'>
                    <div className='todo-header'>
                        <h2>ToDO List</h2>
                        <BsCardList/>
                    </div>
                    
                    <div className='todo-list'>
                        {jobs.map((val, index) =>(
                            <div 
                                className='jobs-item'
                                key = {index}
                            >
                                <TodoIT 
                                    jobName={val.job}
                                    pri = {val.detail.priority}
                                />
                                <div className='job-item-btn'>
                                    <div 
                                        className='job-btn-done'
                                        onClick={()=>{handleDelJob(val.id)}}
                                    >
                                        <div className='btn-content'>
                                            Done
                                            <MdOutlineDownloadDone/>
                                        </div>
                                    </div>
                                    <div 
                                        className='job-btn-detail'
                                        onClick={()=>{handleUpdateJob(val.id, val.job, val.detail.description, val.detail.priority)}}
                                    >
                                        <div className='btn-content'>
                                            Detail
                                            <CgDetailsMore/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                        
                    </div>
                    <div className='todo-footer'>
                        <div className='made-job'>
                            <div className='input-job-item'>
                                <div className='job-input-name'>
                                    <input
                                        className='job-name-input'
                                        placeholder='Type a new job'
                                        value={name}
                                        onChange={(e)=>{setName(e.target.value)}}
                                    />
                                    <p className='input-message'></p>
                                </div>
                                <div className='job-input-desc'>
                                    <input
                                        className='job-desc-input'
                                        placeholder='Type description'
                                        value={desc}
                                        onChange={(e)=>{setDesc(e.target.value)}}
                                    />
                                    <p className='input-message'></p>
                                </div>
                            </div>
                            <div className='priority-job'>
                                    <div 
                                    className={`priority-item ${active === 1 ? "active" :""}`}
                                    onClick={(e) => {setActive(1)}}
                                    >
                                        <div className='pri-red pri-item'></div>
                                        <p>High</p>
                                    </div>
                                <div 
                                    className={`priority-item ${active === 2 ? "active" :""}`}
                                    onClick={(e) => {setActive(2)}}
                                >
                                    <div className='pri-green pri-item'></div>
                                        <p>Nomal</p>
                                    </div>
                                <div 
                                    className={`priority-item ${active === 3 ? "active" :""}`}
                                    onClick={(e) => {setActive(3)}}
                                    >
                                    <div className='pri-yellow pri-item'></div>
                                        <p>medium</p>
                                    </div>
                            </div>
                        </div>
                        <div className='add-job-btn'>
                                <div className='add-btn-content'
                                    onClick={handleAddJob}
                                >
                                    <h3>Add</h3>
                                    <BsPlusLg/>
                                </div>
                            </div>
                        <p>Maade by Beo</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todolist;