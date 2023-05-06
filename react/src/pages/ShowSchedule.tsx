import { Button, Table} from 'react-bootstrap';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import internal from 'stream';
import { ShowData, User, UserShowData } from './types';
import useLocalStorageUserID from "../hooks/useLocalStorageUserID";
import useAdmin from '../hooks/useAdmin.js';

/*
Author: Elijah Sanders and Liam Ramsey
Description: Displays shows, allows logged in users to add new shows, and allows admins to 
             remove shows and manage DJs on shows.
*/

function ShowSchedule() {
    /*
    Author: Elijah Sanders and Liam Ramsey
    Description: State for the page's various functions
    */

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
    const [newShowHour, setNewShowHour] = useState<string>()
    const [newShowDuration, setNewShowDuration] = useState<string>()
    const [newShowDescription, setNewShowDescription] = useState<string>()
    const [newShowPicture, setNewShowPicture] = useState<string>()
    // UserID for creating new show
    const [userID, setUserID] = useLocalStorageUserID()

    /*
    Author: Liam Ramsey
    Description: Loads shows into state.
    */

    useEffect(() => {
        // Make a GET request to the PHP backend function
        fetch('http://localhost/kanm-310/react/php/getShows.php?function=getShows')
        .then(response => response.json())
        .then(data => setShows(data));
    }, []);

    /*
    Author: Elijah Sanders
    Description: Currently unused, for debugging UI.
    */

    const handleTest = () => {
        console.log("test")
    }

    /*
    Author: Elijah Sanders
    Description: Button action for when an admin clicks Edit DJs on a show.
                 Loads state for the editing DJs view.
    */

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

    /*
    Author: Elijah Sanders
    Description: Button action for when an admin clicks Delete on a DJ on a show.
                 Removes the deleted DJ from the show.
    */

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

    /*
    Author: Elijah Sanders
    Description: Button action for when an admin clicks Add DJ in the editing DJs view.
                 Switches views and loads DJs not on that show that can be added to it.
    */

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

    /*
    Author: Elijah Sanders
    Description: Button action for when an admin clicks Add DJ on a DJ in the adding DJs view.
                 Adds a DJ to the show for which the list of DJs is being edited.
    */

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

    /*
    Author: Elijah Sanders
    Description: Button action for when a logged in user clicks Add Show. Switches views.
    */

    const handleAddShowViewChange = () => {
        setIsAddingShow(true)
    }

    /*
    Author: Elijah Sanders
    Description: Button action for when a logged in user clicks Confirm in the adding a show view.
                 Gets user inputs and creates a new show with them.
    */

    const handleAddShow = () => {
        let startDateStr = typeof newShowStart === "string" ? newShowStart : ''
        let [startMonth, startDay, startYear] = startDateStr.split('/')
        let startHour = typeof newShowHour === "string" ? newShowHour : ''
        let startDate = new Date(
            +startYear,
            +startMonth - 1,
            +startDay,
            +startHour
        )
        let endHour = String(Number(newShowDuration) + Number(startHour))
        let sqlStartDatetime = '\"' + startYear + '-' + startMonth + '-' + startDay + ' ' + startHour + ':00:00\"'
        let sqlEndDatetime = '\"' + startYear + '-' + startMonth + '-' + startDay + ' ' + endHour + ':00:00\"'
        let data = JSON.stringify({show_name: '\"' + newShowName + '\"', show_desc: '\"' + newShowDescription + '\"',
            show_pic: '\"' + newShowPicture + '\"', start_time: sqlStartDatetime, end_time: sqlEndDatetime, 
            day_of_week: startDate.getDay(), user_id: userID});

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost/kanm-310/react/php/createShowAndShowHost.php?function=createShowAndShowHost',
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

    /*
    Author: Elijah Sanders
    Description: Button action for when a user clicks Delete
    */

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

    /*
    Author: Elijah Sanders
    Description: The following three functions allow for returning to the previous view.
    */
    
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

    /*
    Author: Elijah Sanders and Liam Ramsey
    Description: Views are organized by how many steps they take to reach, from most to least.
    */
    return (
        <div>
            {
            /*
            Author: Elijah Sanders
            Description: Code for title and Add DJ button when adding a new DJ.
            */
            isAddingDJ &&
                <div className='pb-2'>
                    <p>{"Currently editing DJs for " + editingShow?.show_name}</p>
                    <Button variant="secondary" onClick={() => handleReturnFromAddingDJ()}>
                        Return
                    </Button>
                </div>
            }
            {
            /*
            Author: Elijah Sanders
            Description: Code for view when adding a new DJ.
            */
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
            {
            /*
            Author: Elijah Sanders
            Description: Code for title and Add DJ button when adding/removing DJ.
            */
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
            {
            /*
            Author: Elijah Sanders
            Description: Code for view when adding/removing DJ.
            */
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
            {
            /*
            Author: Elijah Sanders
            Description: Code for Add/Cancel when adding a new show.
            */
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
            {
            /*
            Author: Elijah Sanders
            Description: Code for view when adding a new show.
            */
            isAddingShow &&
                <div className='pb-2'>
                    <p>Show Name: </p>
                    <input type="text" value={newShowName} onChange={event => setNewShowName(event.target.value)} />
                    <p className='pt-2'>Start Date (MM/DD/YYYY): </p>
                    <input type="text" value={newShowStart} onChange={event => setNewShowStart(event.target.value)} />
                    <p className='pt-2'>Start Hour (HH): </p>
                    <input type="text" value={newShowHour} onChange={event => setNewShowHour(event.target.value)} />
                    <p className='pt-2'>Duration In Hours: </p>
                    <input type="text" value={newShowDuration} onChange={event => setNewShowDuration(event.target.value)} />
                    <p className='pt-2'>Description: </p>
                    <input type="text" value={newShowDescription} onChange={event => setNewShowDescription(event.target.value)} />
                    <p className='pt-2'>Picture Link: </p>
                    <input type="text" value={newShowPicture} onChange={event => setNewShowPicture(event.target.value)} />
                </div>
            }
            {
            /*
            Author: Elijah Sanders
            Description: Code for Add Show button.
            */
            !isEditingDJs && !isAddingShow && !(typeof userID === "undefined") &&
                <div className='pb-2'>
                    <Button variant="primary" onClick={() => handleAddShowViewChange()}>
                        Add Show
                    </Button>
                </div>
            }
            {
            /*
            Author: Elijah Sanders and Liam Ramsey
            Description: Code for regular schedule view
            */
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