import React, { useContext, useState } from "react";
import "./Usecontextreact.css";
import { product } from "./Create";
import { useNavigate } from "react-router-dom";

const Contextapi = () => {
  const [nameerr, setNameerr] = useState("");
  const [emailerr, setEmailerr] = useState("");
  const [numbererr, setNumbererr] = useState("");
  const [addresserr, setAddresserr] = useState("");
  const [dateerr, SetDateerr] = useState("");
  const [billerr, setBillerr] = useState("");  
  const {
    row,
    addRow,
    productAmounts,
    Delete,
    cancel,
    edit,
    save,
    Quantity,
    Products,
    editrows,
    name,
    setName,
    email,
    setEmail,
    number,
    setNumber,
    address,
    setAddress,
    grandTotal,
    date,
    setDate,
    generateBillNumber
  } = useContext(product);

  const validation = () => {
    let hasError = true;
    if (name.length < 3) {
      setNameerr("Name required");
      hasError = false;
    } else {
      setNameerr("");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailerr("Email should be correct format");
      hasError = false;
    } else {
      setEmailerr("");
      hasError = true;
    }
    if (number.length !== 10) {
      setNumbererr("Number required");
      hasError = false;
    } else {
      setNumbererr("");
    }
  
    if (date === "") {
      SetDateerr("Date required");
      hasError = false;
    } else {
      SetDateerr("");
    }

    if (address === "") {
      setAddresserr("Address required");
      hasError = false;
    } else {
      setAddresserr("");
    }


    if (hasError) {
      return false;
    } else {
      return true;
    }

    
    
  };

  let nav = useNavigate();

  const submit = () => {
    if (editrows.some((editRow) => editRow)) {
      return;
    }
    validation()
    if (row.length < 1) {
      alert("Form must contain at least one set of detail");
      return;
    }
    generateBillNumber();

    nav("/contextlist");
  };

  const view = () => {
   
    nav("/invoiceform");
  };
  return (
    <div>
      <div className="container outer card mt-4 ">
        <div className="form">
          <div className="row">
            <div className="col  input-data">
              <label htmlFor="name" className="fw-bold">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <p className="text-danger">{nameerr}</p>
            </div>
            <div className="col   input-data">
              <label htmlFor="email" className="fw-bold">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="mb-2">
                <p className="text-danger" >{emailerr}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col   input-data  mt-4">
              <label htmlFor="number" className="fw-bold">Phone Number</label>
              <input
                type="number"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
              <div className="mb-2">
                <p className="text-danger">{numbererr}</p>
              </div>
            </div>

            <div className="col  input-data mt-4">
              <label htmlFor="date" className="fw-bold">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <p className="text-danger">{dateerr}</p>
            </div>
          </div>
          <div className="mt-3 address-change container d-flex justify-content-center">
            <div className="col   input-data mt-3 mb-5">
              <label htmlFor="date" className="text-center label-add fw-bold" >Address</label>
              <div >
              <textarea
                type="Address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <div className="add_err ">
               <p className="text-danger">{addresserr}</p>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" d-flex mt-4 container outer justify-content-end ">
        <button
          type="submit"
          className="btn btn-dark fw-bold"
          onClick={() => {
            if (editrows.some((editRow) => editRow)) {
              alert(
                "Please save or cancel the current edit before adding a new row."
              );
              return;
            }
            addRow();
          }}
        >
          {" "}
          Add Row
        </button>
      </div>
      <div>
        <table className="table container outer border-1 ">
          <thead>
            <tr>
              <th scope="col">SI.NO</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Amount</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {row.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {editrows[index] ? (
                    <select
                      id="productName"
                      value={data.product[0].productName}
                      onChange={(e) => Products(index, e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Pen">Pen</option>
                      <option value="Pencil">Pencil</option>
                      <option value="Eraser">Eraser</option>
                      <option value="Scale">Scale</option>
                    </select>
                  ) : (
                    <span>{data.product[0].productName}</span>
                  )}
                </td>
                <td>
                  {editrows[index] ? (
                    <input
                      id="quantity"
                      type="number"
                      value={data.product[0].quantity}
                      onChange={(e) => Quantity(index, e.target.value)}
                    />
                  ) : (
                    <span>{data.product[0].quantity}</span>
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    id=" amount"
                    value={productAmounts[data.product[0].productName]}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="number"
                    id="totalAmount"
                    value={
                      data.product[0].quantity *
                      productAmounts[data.product[0].productName]
                    }
                    readOnly
                  />
                </td>

                <td>
                  {editrows[index] ? (
                    <button
                      type="submit"
                      className="bg-primary rounded text-light"
                      onClick={() => save(index)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-primary rounded text-light"
                      onClick={() => edit(index)}
                    >
                      Edit
                    </button>
                  )}
                  {editrows[index] ? (
                    <button
                      type="submit"
                      className="bg-danger rounded text-light mx-2"
                      onClick={() => cancel(index)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-danger rounded text-light mx-2"
                      onClick={() => Delete(index)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-5">
        <p className="fw-bold text-light">Grand Total: {grandTotal}</p>
        <div className="d-flex justify-content-center mb-5">
          <button
            type="submit"
            className="rounded fw-bold text-light border-0 btn btn-success"
            onClick={view}
          >
            View
          </button>
          <button
            type="submit"
            className="rounded fw-bold text-light border-0 btn btn-primary mx-2"
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contextapi;
