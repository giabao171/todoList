import React from 'react';
import "./todoit.scss"
import {GrUserWorker} from "react-icons/gr"
import {BsCardList, BsFillCircleFill} from 'react-icons/bs'



const TodoIT = ({jobName, pri}) => {
    return (
        <div className='job-box'>
            <div className='job-detail'>
                <GrUserWorker/>
                <p>{jobName}</p>
                <div className='job-pri'>
                    <div 
                        className='pri'
                        style={pri == 1 ? {backgroundColor: 'red'} : 
                                pri == 2 ? {backgroundColor: 'green'}:
                                {backgroundColor: 'yellow'}
                            }
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default TodoIT;