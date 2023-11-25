import React, { createContext, useState } from "react";

export const product = createContext();

const Create = ({ children }) => {
  const [row, setrow] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [address, setAddress] = useState("")
  const [date, setDate] = useState("")
  const [bill, setBill] = useState("")
  const [editrows, seteditrows] = useState([])
  const [grandTotal, setGrandTotal] = useState(0)
  const [counter, setCounter] = useState(1);
  
  const initialRowState = {
    product: [{ productName: "", quantity: 0, amount: 0, totalAmount: 0 }],
  }
  const productAmounts = {
    Pen: 10,
    Pencil: 5,
    Eraser: 2,
    Scale: 5,
  }

  const addRow = () => {
    const newRow = {
      name,
      email,
      number,
      address,
      date,
      bill,
      product: [
        {
          productName: "",
          quantity: 0,
          amount: 0,
          totalAmount: 0,
        },
      ],
    }
  
    setrow([...row, newRow]);
    seteditrows([...editrows, true]);
  };

 

  const Products = (index, value) => {
    const updatedRow = [...row]
    updatedRow[index].product[0].productName = value
    updatedRow[index].product[0].quantity = 0
    updatedRow[index].product[0].amount = 0
    updatedRow[index].product[0].totalAmount = 0
    setrow(updatedRow)
  }

  const Quantity = (index, value) => {
    const updatedRow = [...row]
    updatedRow[index].product[0].quantity = value
    const selectedProduct = updatedRow[index].product[0].productName
    updatedRow[index].product[0].amount = productAmounts[selectedProduct]
    updatedRow[index].product[0].totalAmount =
      value * productAmounts[selectedProduct]
    const totalAmounts = updatedRow.reduce(
      (total, row) => total + row.product[0].totalAmount,
      0
    )
    setGrandTotal(totalAmounts)
    setrow(updatedRow)
  }

  const edit = (index) => {
    const updatededitrows = [...editrows]
    updatededitrows[index] = !editrows[index]
    seteditrows(updatededitrows)
  }

  const save = (index) => {
    const updatedRow = row[index].product[0]
    if (
      !updatedRow.productName ||
      updatedRow.quantity === 0 ||
      !updatedRow.amount ||
      !updatedRow.totalAmount
    ) {
      alert("Please fill in all the fields before saving.")
      return
    }
    edit(index)
  }

  const cancel = (index) => {
    const updatedRow = [...row]
    updatedRow[index] = {
      name: "",
      email: "",
      number: "",
      address: "",
      product: [
        {
          productName: "",
          quantity: 0,
          amount: 0,
          totalAmount: 0,
        },
      ],
    }
    setrow(updatedRow)

    const updatededitrows = [...editrows]
    updatededitrows.splice(index, 1)
    seteditrows(updatededitrows)
  }

  const Delete = (index) => {
    const updatedRow = [...row]
    updatedRow.splice(index, 1)
    setrow(updatedRow)

    const updatededitrows = [...editrows]
    updatededitrows.splice(index, 1)
    seteditrows(updatededitrows)
  }
  const generateBillNumber = () => {
    const formattedBillNumber = `AA-${counter.toString().padStart(4, "0")}`
    setBill(formattedBillNumber)
    setCounter((prevCounter) => prevCounter + 1)
  }
  
  return (
    <div>
      <product.Provider
        value={{
          row,
          addRow,
          setrow,
          productAmounts,
          initialRowState,
          Delete,
          cancel,
          edit,
          save,
          Quantity,
          Products,
          editrows,
          seteditrows,
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
          grandTotal,
          setGrandTotal,
          counter,generateBillNumber,
       setCounter
        }}
      >
        {children}
      </product.Provider>
    </div>
  )
}

export default Create
