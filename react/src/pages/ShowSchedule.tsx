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
    // boolean for when a show is being added
    const [isAddingShow, setIsAddingShow] = useState<boolean>(false)
    // whether or not the user is in admin mode
    const [isAdmin, setIsAdmin] = useAdmin();
    // state for user inputs when adding a new show
    const [newShowName, setNewShowName] = useState<string>()
    const [newShowStart, setNewShowStart] = useState<string>()
    const [newShowEnd, setNewShowEnd] = useState<string>()
    const [newShowDescription, setNewShowDescription] = useState<string>()
    const [newShowPicture, setNewShowPicture] = useState<string>()

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
            url: 'http://localhost/kanm-310/react/php/deleteShowHost.php?function=deleteShowHost',
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

    const handleAddShowViewChange = () => {
        setIsAddingShow(true)
    }

    const handleAddShow = () => {
        let start_str = typeof newShowStart === "string" ? newShowStart : ''
        let [start_dateStr, start_timeStr] = start_str.split(' ')
        let [start_month, start_day, start_year] = start_dateStr.split('/')
        let [start_hour, start_minute] = start_timeStr.split(':')
        let start_date = new Date(
            +start_year,
            +start_month - 1,
            +start_day,
            +start_hour,
            +start_minute
        )
        let end_str = typeof newShowEnd === "string" ? newShowEnd : ''
        let [end_dateStr, end_timeStr] = end_str.split(' ')
        let [end_month, end_day, end_year] = end_dateStr.split('/')
        let [end_hour, end_minute] = end_timeStr.split(':')
        let end_date = new Date(
            +end_year,
            +end_month - 1,
            +end_day,
            +end_hour,
            +end_minute
        )
        let sqlStartDatetime = '\"' + start_year + '-' + start_month + '-' + start_day + ' ' + start_hour + ":" + start_minute + ':00\"'
        let sqlEndDatetime = '\"' + end_year + '-' + end_month + '-' + end_day + ' ' + end_hour + ":" + end_minute + ':00\"'
        let data = JSON.stringify({show_name: '\"' + newShowName + '\"', show_desc: '\"' + newShowDescription + '\"',
            show_pic: '\"' + newShowPicture + '\"', start_time: sqlStartDatetime, end_time: sqlEndDatetime, day_of_week: start_date.getDay()});

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost/kanm-310/react/php/createShow.php?function=createShow',
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

    const handleRemoveShow = (show_id: string | undefined) => {
        // check for if show is undefined
        show_id = typeof show_id === "string" ? show_id : "-1"
        let data = JSON.stringify({show_id: show_id});

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost/kanm-310/react/php/deleteShow.php?function=deleteShow',
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
    
    const handleReturnFromDJ = () => {
        setIsEditingDJs(false)
    }

    const handleReturnFromAddingDJ = () => {
        setIsAddingDJ(false)
    }
    
    const handleCancelAddingShow = () => {
        setIsAddingShow(false)
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // views are organized by how many steps they take to reach, from most to least
    return (
        <div>
            {// code for title and Add DJ button when adding a new DJ
            isAddingDJ &&
                <div className='pb-2'>
                    <p>{"Currently editing DJs for " + editingShow?.show_name}</p>
                    <Button variant="secondary" onClick={() => handleReturnFromAddingDJ()}>
                        Return
                    </Button>
                </div>
            }
            {// code for view when adding a new DJ
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
                    <Button variant="secondary" onClick={() => handleReturnFromDJ()}>
                        Return
                    </Button>
                </div>
            }
            {// code for view when adding/removing DJ
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
            {// code for Add/Cancel when adding a new show
            isAddingShow &&
                <div className='pb-2'>
                    <Button variant="primary" onClick={() => handleAddShow()}>
                        Confirm
                    </Button>
                    {' '}
                    <Button variant="secondary" onClick={() => handleCancelAddingShow()}>
                        Cancel
                    </Button>
                </div>
            }
            {// code for view when adding a new show
            isAddingShow &&
                <div className='pb-2'>
                    <p>Show Name: </p>
                    <input type="text" value={newShowName} onChange={event => setNewShowName(event.target.value)} />
                    <p className='pt-2'>Start Time (MM/DD/YYYY HH:MM): </p>
                    <input type="text" value={newShowStart} onChange={event => setNewShowStart(event.target.value)} />
                    <p className='pt-2'>End Time (MM/DD/YYYY HH:MM): </p>
                    <input type="text" value={newShowEnd} onChange={event => setNewShowEnd(event.target.value)} />
                    <p className='pt-2'>Description: </p>
                    <input type="text" value={newShowDescription} onChange={event => setNewShowDescription(event.target.value)} />
                    <p className='pt-2'>Picture Link: </p>
                    <input type="text" value={newShowPicture} onChange={event => setNewShowPicture(event.target.value)} />
                </div>
            }
            {// code for Add Show button
            !isEditingDJs && !isAddingShow &&
                <div className='pb-2'>
                    <Button variant="primary" onClick={() => handleAddShowViewChange()}>
                        Add Show
                    </Button>
                </div>
            }
            {// code for regular schedule view
            !isEditingDJs && !isAddingShow &&
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
                                        <Button variant="secondary" onClick={() => handleRemoveShow(show.show_id)}>
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