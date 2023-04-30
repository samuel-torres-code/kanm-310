import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import internal from 'stream';
import { ShowData } from './types';


function ShowSchedule() {

    const [shows, setShows] = useState<ShowData[]>([]);

    useEffect(() => {
        // Make a GET request to the PHP backend function
        fetch('http://localhost/kanm-310/react/php/getShows.php?function=getShows')
        .then(response => response.json())
        .then(data => setShows(data));
    }, []);

    

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Day of Week</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Show Name</th>
                    <th>Show Description</th>
                    <th>Show Picture</th>
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
                        <td>{show.show_name}</td>
                        <td>{show.show_desc}</td>
                        <td>{show.show_pic}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}


export default ShowSchedule;