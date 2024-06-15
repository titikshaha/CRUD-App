import React, { useEffect, useState , useContext} from "react";
import { NavLink } from "react-router-dom";
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { udata, setUdata } = useContext(adddata);

  const {updata, setUPdata} = useContext(updatedata);

  const {dltdata, setDLTdata} = useContext(deldata);

  const getdata = async () => {
   

    //to send data from frontend to backend using fetchAPI
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      console.log("error ");

  } else {
      setUserdata(data)
      console.log("get data");

  }
  };

  useEffect(()=>{
    getdata();
  }, [])

  const deleteuser = async (id) => {

    const res2 = await fetch(`/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
        console.log("error");
    } else {
        console.log("user deleted");
        setDLTdata(deletedata)
        getdata();
    }

}


  return (
    <>
      {
        udata ?
            <>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{udata.name}</strong>  added succesfully!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </> : ""
       }
      {
          updata ?
              <>
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
                      <strong>{updata.name}</strong>  updated succesfully!
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
              </> : ""
      }

      {
          dltdata ?
              <>
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
                      <strong>{dltdata.name}</strong>  deleted succesfully!
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
              </> : ""
      }
      <div className="mt-5">
        <div className="container">
          <div className="add-btn mt-2">
            <NavLink to="/register" className="btn btn-primary">
              Add Data
            </NavLink>
          </div>
          <table className="table mt-2">
            <thead>
              <tr className="table-primary">
              <th scope="col">S.No.</th>
                <th scope="col">Account</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Department</th>
                <th scope="col">Contact</th>
                <th scope="col">
                  {" "}
                  <center>Action </center>{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {
                getuserdata.map((element, id) => {
                   return (
                   <>
                <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{element.account}</td>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.department}</td>
                    <td>{element.contact}</td>
                    <td className="d-flex justify-content-between">
                      <NavLink to={`view/${element._id}`}> <button className="btn btn-success">
                        <i class="fa-solid fa-eye"></i>
                      </button> </NavLink>
                      <NavLink to={`edit/${element._id}`}> <button className="btn btn-warning">
                        <i class="fa-solid fa-pen"></i>{" "}
                      </button> </NavLink>
                      <button className="btn btn-danger" onClick={() => deleteuser(element._id)}>
                        {" "}
                        <i class="fa-solid fa-trash"></i>
                      </button> 
                    </td>
                  </tr>
                    </>
                                      )
                                    })
              }
            </tbody>
          </table>
        </div>
      </div>
      </>
  );
};

export default Home;
