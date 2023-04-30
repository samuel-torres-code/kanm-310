import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import internal from 'stream';


function ShowSchedule() {

    const [shows, setShows] = useState<Show[]>([]);

    useEffect(() => {
        // Make a GET request to the PHP backend function
        fetch('http://localhost/kanm-310/react/php/getShows.php?function=getShows')
        .then(response => response.json())
        .then(data => setShows(data));
    }, []);

    type Show = {
        show_name: string;
        show_desc: string;
        start_time: string;
        end_time: string;
        day_of_week: number;
      };      

    console.log(shows);

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
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}


export default ShowSchedule;