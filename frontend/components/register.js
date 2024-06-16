import React, {useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

    const navigate = useNavigate();

    const [inpval, setINP] = useState({
        account: "",
        name: "",
        email: "",
        department: "",
        contact: "",
      
    });

    const setData = (e) => {
        console.log(e.target.value);
        const { name, value} = e.target;
        setINP((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
    });
    };


    const addinpdata = async(e)=>{
          
        const {account, name, email, department, contact} = inpval;

        //to send data from frontend to backend using fetchAPI
        const res = await fetch("/register", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                account, name, email, department, contact
            })
        });
        
        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            addinpdata();
            setUdata(data)
            console.log("data added successfully");
            navigate("/home");
        }
    }

    return (
        <div className="container">
            <NavLink to="/"> Return </NavLink>
            <h1>Register Page</h1>
              <form>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleaccount" className="form-label">
                            account
                        </label>
                        <input
                            type="number"
                            value={inpval.account}
                            onChange={setData}
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
                            onChange={setData}
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
                            onChange={setData}
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
                            onChange={setData}
                            name="contact"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>

                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" class="form-label">email</label>
                        <input type="email" value={inpval.email} onChange={setData} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>


                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            checked={inpval.sendConfirmation}
                            onChange={setData}
                            name="sendConfirmation"
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Send me confirmation email
                        </label>
                    </div>
                </div>
                <button type="submit" onClick={addinpdata} className="btn btn-primary md-3">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Register;

