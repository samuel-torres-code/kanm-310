import { Button, Table} from 'react-bootstrap';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import internal from 'stream';
import { ShowData, User, UserShowData } from './types';
import useAdmin from '../hooks/useAdmin.js';


function ShowSchedule() {
    // shows for show table
    const [shows, setShows] = useState<ShowData[]>([]);
    // hosts for editing hosts on a show
    const [hosts, setHosts] = useState<Array<UserShowData>>([]);
    // show currently being modified
    const [editingShow, setEditingShow] = useState<ShowData>()
    // boolean for whether or not editing hosts on a show
    const [isEditingDJs, setIsEditingDJs] = useState<boolean>(false)
    // boolean for when a DJ is being added
    const [isAddingDJ, setIsAddingDJ] = useState<boolean>(false)
    // users not hosting show
    const [notHosting, setNotHosting] = useState<User[]>([])
    // whether or not the user is in admin mode
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

    const handleEditDJs = (show: ShowData) => {
        fetch(`http://localhost/kanm-310/react/php/getShows.php?function=getHostUsersByShowId&id=${show.show_id}`)
        .then(response => response.json())
        .then(data => {
            // load DJs for show into hosts
            setHosts(data.reduce((acc: Array<UserShowData>, curr: UserShowData) => {
                acc.push(curr)
                return acc
            }, new Array<UserShowData>()))
        })

        setEditingShow(show)
        setIsEditingDJs(true)
    }

    const handleRemoveDJ = (show_id: string | undefined, user_id: number) => {
        // check for if show is undefined
        show_id = typeof show_id === "string" ? show_id : "-1"
        let data = JSON.stringify({show_id: show_id, user_id: user_id});

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost/kanm-310/react/php/deleteHost.php?function=deleteHost',
            headers: { 
            'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            window.location.reload()
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleAddDJViewChange = (show_id : string | undefined) => {
        // check for if show is undefined
        show_id = typeof show_id === "string" ? show_id : "-1"
        console.log("show-id:", show_id)
        fetch(`http://localhost/kanm-310/react/php/getUsers.php?function=getUsersNotHostingShow&id=${show_id}`)
        .then(response => response.json())
        .then(data => {
            // load DJs for show into hosts
            setNotHosting(data.reduce((acc: Array<User>, curr: User) => {
                acc.push(curr)
                return acc
            }, new Array<User>()))
        })

        setIsAddingDJ(true)
    }

    const handleAddDJ = (show_id: string | undefined, user_id: number) => {
        // check for if show is undefined
        show_id = typeof show_id === "string" ? show_id : "-1"
        let data = JSON.stringify({show_id: show_id, user_id: user_id});

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost/kanm-310/react/php/createShowHost.php?function=createShowHost',
            headers: { 
            'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            window.location.reload()
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    const handleReturn = () => {
        setIsEditingDJs(false)
    }

    const handleCancel = () => {
        setIsAddingDJ(false)
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // views are organized by how many steps they take to reach, from most to least
    return (
        <div>
            {// code for title and Add DJ button when adding/removing DJ
            isAddingDJ &&
                <div className='pb-2'>
                    <p>{"Currently editing DJs for " + editingShow?.show_name}</p>
                    <Button variant="secondary" onClick={() => handleCancel()}>
                        Return
                    </Button>
                </div>
            }
            {// code for adding a new DJ view
            isAddingDJ &&
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {notHosting
                .map((user) => (
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                            {
                            <Button variant="primary" onClick={() => handleAddDJ(editingShow?.show_id, user.user_id)}>
                                Add DJ
                            </Button>
                            }
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </Table>
            }
            {// code for title and Add DJ button when adding/removing DJ
            !isAddingDJ && isEditingDJs &&
                <div className='pb-2'>
                    <p>{"Currently editing DJs for " + editingShow?.show_name}</p>
                    <Button variant="primary" onClick={() => handleAddDJViewChange(editingShow?.show_id)}>
                        Add DJ
                    </Button>
                    {' '}
                    <Button variant="secondary" onClick={() => handleReturn()}>
                        Return
                    </Button>
                </div>
            }
            {// code for adding/removing DJ view
            !isAddingDJ && isEditingDJs &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>DJ Name</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {hosts
                    .map((host) => (
                        <tr>
                            <td>{host.username}</td>
                            <td>{host.first_name}</td>
                            <td>{host.last_name}</td>
                            <td>{host.email}</td>
                            <td>
                                {
                                <Button variant="secondary" onClick={() => handleRemoveDJ(editingShow?.show_id, host.user_id)}>
                                    Delete
                                </Button>
                                }
                            </td>
                        </tr>
                    ))
                    }
                    </tbody>
                </Table>
            }
            {// code for Add Show button
            !isEditingDJs &&
                <div className='pb-2'>
                    <Button variant="primary" onClick={() => handleTest()}>
                        Add Show
                    </Button>
                </div>
            }
            {// code for regular schedule view
            !isEditingDJs &&
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
                                    <Button variant="primary" onClick={() => handleEditDJs(show)}>
                                        Edit DJs
                                    </Button>
                                    <div className='pt-2'>
                                        <Button variant="secondary" onClick={() => handleTest()}>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            }
                        </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </div>
    )
}

export default ShowSchedule;