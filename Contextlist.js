import React, { useContext } from "react";
import { product } from "./Create";
import { useNavigate } from "react-router-dom";

const Contextlist = () => {
  const { row,bill } = useContext(product)
  let nav = useNavigate();
  
  const Back = () => {
    nav("/contextapi")
  }
 
  return (
    <div className="container outer">
      <div className="mt-2 d-flex justify-content-start">
        <button
          type="submit"
          className="rounded fw-bold text-light border-0 btn btn-dark"
          onClick={Back}
        >
          Back
        </button>
      </div>

      <table className="table mt-4 border-1">
        <thead>
          <tr>
            <th scope="col">SI.NO</th>
            <th scope="col">Name</th>
            <th scope="col">Bill No</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Date</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {row.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{bill}</td> 
              <td>{data.email}</td>
              <td>{data.number}</td>
              <td>{data.date}</td>
              <td>{data.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Contextlist
