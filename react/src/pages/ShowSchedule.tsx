import { Button, Table} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import internal from 'stream';
import { ShowData } from './types';
import useAdmin from '../hooks/useAdmin.js';


function ShowSchedule() {

    const [shows, setShows] = useState<ShowData[]>([]);
    const [isAdmin, setIsAdmin] = useAdmin();


    useEffect(() => {
        // Make a GET request to the PHP backend function
        fetch('http://localhost/kanm-310/react/php/getShows.php?function=getShows')
        .then(response => response.json())
        .then(data => setShows(data));
    }, []);

    const handleTest = () => {
        console.log("test")
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <div>
            <div className='pb-2'>
                <Button variant="primary" onClick={() => handleTest()}>
                    Add Show
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Day of Week</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Show Name</th>
                    <th>Show Description</th>
                    <th>Show Picture</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {shows
                    .sort((obj1, obj2) => {
                        if (obj1.day_of_week > obj2.day_of_week) return 1;
                        if (obj2.day_of_week > obj1.day_of_week) return -1;
                        if (obj1.start_time > obj2.start_time) return -1;
                        if (obj2.start_time > obj1.start_time) return 1;
                        return 0;
                      })
                    .map((show) => (
                    <tr>
                        <td>{days[show.day_of_week]}</td>
                        <td>{show.start_time.slice(10)}</td>
                        <td>{show.end_time.slice(10)}</td>
                        <td><Link to={`/shows/${show.show_id}`} >{show.show_name}</Link></td>
                        <td>{show.show_desc}</td>
                        <td>{show.show_pic}</td>
                        {isAdmin &&
                            <td>
                                <div className='pb-2'>
                                    <Button variant="primary" onClick={() => handleTest()}>
                                        Add DJ
                                    </Button>
                                    <div className='pt-2'>
                                        <Button variant="secondary" onClick={() => handleTest()}>
                                            Edit DJs
                                        </Button>
                                    </div>
                                    <div className='pt-2'>
                                        <Button variant="secondary" onClick={() => handleTest()}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </td>
                        }
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}


export default ShowSchedule;