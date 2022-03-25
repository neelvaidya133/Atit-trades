import { async } from "@firebase/util";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Home = () => {
  // -----------------------hooks---------------------//
  const [stock, setstock] = useState([]);
  const [updateQuantity, setUpdateQuantity] = useState(0);
  const [newItem, setnewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const usercollectionref = collection(db, "stock");

  // =================================effect hooks  ======================

  useEffect(() => {
    const getdata = async () => {
      const data = await getDocs(usercollectionref);
      setstock(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getdata();
  }, []);
  // ===============================================Add Item ================================//

  const AddItem = async (event) => {
    await addDoc(usercollectionref, {
      item: newItem,
      quantity: Number(newQuantity),
    });
    alert("Item Added in your stock");
    window.location.reload(true);
  };
  // ==================================================Delete Item ============================///
  const deleteItem = async (id) => {
    const stockDoc = doc(db, "stock", id);
    await deleteDoc(stockDoc);
    alert("Item removed from your stock");
    window.location.reload(true);
  };

  // ===========================================Add stock Quantity ======================////
  const AddQuantity = async (id, quantity) => {
    const stockDoc = doc(db, "stock", id);
    const newFields = { quantity: Number(quantity) + Number(updateQuantity) };
    await updateDoc(stockDoc, newFields);
    alert("New Stock Added Succesfully");
    window.location.reload(true);
  };

  //======================================Remove stock Quantity ========================///
  const RemoveQuantity = async (id, quantity) => {
    const stockDoc = doc(db, "stock", id);
    const newFields = { quantity: Number(quantity) - Number(updateQuantity) };
    await updateDoc(stockDoc, newFields);
    alert("Stock Removed Succesfully");
    window.location.reload(true);
  };

  return (
    <>
      <div>
        <div
          style={{
            padding: "20px",
            width: "100%",

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "orange",
          }}
        >
          <h1> stock managment </h1>
        </div>
        <div
          style={{
            height: "100vh",
            width: "100%",
            borderRadius: "5px",
            backgroundColor: "pink",
            padding: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                padding: "7px",
                border: "none",
              }}
              placeholder="Enter name of item"
              onChange={(event) => {
                setnewItem(event.target.value);
              }}
            />
            <input
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                padding: "7px",
                margin: "0px 10px 0px 10px",
                border: "none",
              }}
              type="number"
              placeholder="Enter total quantity"
              onChange={(event) => {
                setNewQuantity(event.target.value);
              }}
            />
            <button
              style={{
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
              onClick={AddItem}
            >
              {" "}
              ADD NEW ITEM{" "}
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {stock.map((stocks) => {
            return (
              <div
                style={{
                  backgroundColor: "grey",
                  borderRadius: "10px",
                  padding: "20px",
                  margin: "10px",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <h1> {stocks.item} </h1>
                <h1> {stocks.quantity} </h1>
                <input
                  type="number"
                  placeholder="enter new quantity"
                  onChange={(event) => {
                    setUpdateQuantity(event.target.value);
                  }}
                />

                <button
                  onClick={() => {
                    AddQuantity(stocks.id, stocks.quantity);
                  }}
                >
                  Add Quantity
                </button>
                <button
                  onClick={() => {
                    RemoveQuantity(stocks.id, stocks.quantity);
                  }}
                >
                  Remove Quantity
                </button>
                <button
                  onClick={() => {
                    deleteItem(stocks.id);
                  }}
                >
                  {" "}
                  Delete item
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
