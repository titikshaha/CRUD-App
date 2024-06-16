import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useNavigate, useParams, NavLink } from 'react-router-dom';

// Importing the image outside of the component
import profileImage from '../images/image.jpg';

const Details = () => {
    const [getuserdata, setUserdata] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getdata = async () => {
            try {
                const res = await fetch(`/getuser/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();
                if (res.status === 422 || !data) {
                    console.log("Error fetching user data");
                } else {
                    setUserdata(data);
                    console.log("User data fetched successfully");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        getdata();
    }, [id]);

    const deleteuser = async () => {
        try {
            const res = await fetch(`/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const deletedata = await res.json();
            if (res.status === 422 || !deletedata) {
                console.log("Error deleting user");
            } else {
                console.log("User deleted successfully");
                navigate('/');
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>User Details</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getuserdata._id}`} className="btn btn-primary mx-2">
                            <CreateIcon /> Edit
                        </NavLink>
                        <button className="btn btn-danger" onClick={deleteuser}>
                            <DeleteOutlineIcon /> Delete
                        </button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12 mt-4">
                            <img src={profileImage} style={{ width: 200 }} alt="profile" />
                            </div>
                        <div className='right_view col-lg-6'>
                            <h4 className="mt-3">Account: <span> {getuserdata.account}</span></h4>
                            <h4 className="mt-3">Name: <span>{getuserdata.name}</span></h4>
                            <h4 className="mt-3">Department: <span>{getuserdata.department}</span></h4>
                            <p className="mt-3"><MailOutlineIcon /> Email: <span>{getuserdata.email}</span></p>
                            <p className="mt-3"><PhoneAndroidIcon /> Contact: <span>+91 {getuserdata.contact}</span></p>
                        
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Details;
