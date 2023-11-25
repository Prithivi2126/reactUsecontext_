import React from "react";
import { useContext } from "react";
import { product } from "./Create";

const Invoiceform = () => {
  const {
    row,
    name,
    setName,
    email,
    setEmail,
    number,
    setNumber,
    address,
    setAddress,
    date,
    setDate,
    bill,
    setBill,
  counter,setCounter
  } = useContext(product)
 
  return (
    <div className="container card invoice p-5  mt-5">
      <div className=" container text-start">
        <hr></hr>
        <p>
          <span className="fw-bold">Name: </span>
          {name}
        </p>
        <p>
          {" "}
          <span className="fw-bold">Bill No:</span> {bill}
        </p>
        <p>
          <span className="fw-bold">Email:</span> {email}
        </p>
        <p>
          <span className="fw-bold">Phone Number:</span> {number}
        </p>
        <p>
          <span className="fw-bold">Address:</span> {address}
        </p>
        <p>
          <span className="fw-bold">Date: </span>
          {date}
        </p>

        <hr></hr>
      </div>
      <div className=" container mt-3 text-start">
        <h6>Product details</h6>
        <table className="table mt-3 ">
          <thead>
            <tr className="table-info">
              <th scope="col">SI.NO</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Amount</th>
              <th scope="col">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {row.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.product[0].productName}</td>
                <td>{data.product[0].quantity}</td>
                <td>{data.product[0].amount}</td>
                <td>{data.product[0].totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Invoiceform
