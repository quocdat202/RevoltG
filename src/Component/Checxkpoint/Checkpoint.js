import React from 'react';
import { useEffect, useState } from 'react';
import { Input } from 'antd';
import { Button, Space } from 'antd';

function Checkpoint(props) {
    const contentStyle = {
        color: 'white'
    };
    const [job, setJob] = useState(['Doctor', 'Lecturers', 'Programmer', 'Student']);
    const [newj, setNewj] = useState([]);
    let work = [];
    work.push(localStorage.getItem('work'));

    return (
        <div>
            <Input id='input' onChange={(e) => setNewj(e.target.value)} />;
            <Button type="primary" onClick={() => change()}>Enter work</Button>
            <p style={contentStyle}> Work list:</p>
            <ul>
                {
                    job?.map((item) => {
                        console.log(newj);
                        return (
                            <li style={contentStyle}>{item}</li>
                        )

                    })
                }
                <li style={contentStyle}>{newj}</li>
                {
                    work?.map((ele) => {
                        return (
                            <li style={contentStyle}>{ele}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
    function change() {
        work.push(newj);
        localStorage.setItem("work", work);

    }
}

export default Checkpoint; 