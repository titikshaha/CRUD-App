import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { updatedata } from './context/ContextProvider';

const Edit = () => {
    const { updata, setUPdata } = useContext(updatedata);
    const navigate = useNavigate();
    const { id } = useParams();

    const [inpval, setINP] = useState({
        account: "",
        name: "",
        department: "",
        contact: "",
        email: "",
        sendConfirmation: false
    });

    const setdata = (e) => {
        const { name, value, type, checked } = e.target;
        setINP((prevVal) => ({
            ...prevVal,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

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
                setINP(data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const updateuser = async (e) => {
        e.preventDefault();

        const { account, name, email, department, contact } = inpval;

        try {
            const res = await fetch(`updateuser/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    account, name, email, department, contact
                })
            });

            const data = await res.json();
            if (res.status === 422 || !data) {
                console.log("Error updating user");
            } else {
                console.log("User updated successfully");
               navigate("/home");
                setUPdata(data);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="container">
            <NavLink to="/"> Return </NavLink>
            <h1>Edit User</h1>
            <form>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleaccount" className="form-label">
                            Account
                        </label>
                        <input
                            type="number"
                            value={inpval.account}
                            onChange={setdata}
                            name="account"
                            className="form-control"
                            id="exampleaccount"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            value={inpval.name}
                            onChange={setdata}
                            name="name"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Department
                        </label>
                        <input
                            type="text"
                            value={inpval.department}
                            onChange={setdata}
                            name="department"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Contact Number
                        </label>
                        <input
                            type="number"
                            value={inpval.contact}
                            onChange={setdata}
                            name="contact"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            value={inpval.email}
                            onChange={setdata}
                            name="email"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            checked={inpval.sendConfirmation}
                            onChange={setdata}
                            name="sendConfirmation"
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Send me confirmation email
                        </label>
                    </div>
                </div>
                <button type="submit" onClick={updateuser} className="btn btn-primary md-3">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Edit;
