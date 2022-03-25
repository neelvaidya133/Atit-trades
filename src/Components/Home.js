import { async } from "@firebase/util";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { Button, Input, Layout } from "antd";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Content, Footer, Header } from "antd/lib/layout/layout";

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
      <Layout>
        <Header
          style={{
            width: "100%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#561157",
          }}
        >
          <h1 style={{ color: "#fff" }}> Atit traders </h1>
        </Header>
        <Content
          style={{
            margin: "1rem",
            borderRadius: "1rem",
            backgroundColor: "#BD90BD",
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Input
              required
              style={{
                fontSize: "small",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "1rem",
                padding: "0.7rem",
                border: "none",
              }}
              placeholder="Enter name of item"
              onChange={(event) => {
                setnewItem(event.target.value);
              }}
            />
            <Input
              required
              style={{
                fontSize: "small",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "1rem",
                padding: "0.7rem",
                marginTop: "1rem",
                border: "none",
              }}
              type="number"
              placeholder="Enter total quantity"
              onChange={(event) => {
                setNewQuantity(event.target.value);
              }}
            />
            <Button
              type="primary"
              shape="round"
              style={{
                fontSize: "small",
                borderRadius: "1rem",
                marginTop: "1rem",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                padding: "0.7rem",
              }}
              onClick={AddItem}
            >
              {" "}
              ADD NEW ITEM{" "}
            </Button>
          </div>
        </Content>
        <Footer
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {stock.map((stocks) => {
            return (
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#561157",
                  borderRadius: "1rem",
                  padding: "2rem",
                  margin: "1rem",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1 style={{ color: "#fff" }}> {stocks.item} </h1>
                <h1 style={{ color: "#fff" }}> {stocks.quantity} </h1>
                <Input
                  required
                  style={{
                    fontSize: "small",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderRadius: "1rem",
                    padding: "0.7rem",
                    border: "none",
                  }}
                  type="number"
                  placeholder="enter new quantity"
                  onChange={(event) => {
                    setUpdateQuantity(event.target.value);
                  }}
                />

                <Button
                  type="primary"
                  style={{
                    fontSize: "small",
                    borderRadius: "1rem",
                    marginTop: "1rem",
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    padding: "0.7rem",
                  }}
                  onClick={() => {
                    AddQuantity(stocks.id, stocks.quantity);
                  }}
                >
                  Add Quantity
                </Button>
                <Button
                  style={{
                    fontSize: "small",
                    borderRadius: "1rem",
                    marginTop: "1rem",
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    padding: "0.7rem",
                  }}
                  onClick={() => {
                    RemoveQuantity(stocks.id, stocks.quantity);
                  }}
                  type="primary"
                  shape="round"
                >
                  Remove Item
                </Button>
                <Button
                  style={{
                    fontSize: "small",
                    borderRadius: "1rem",
                    marginTop: "1rem",
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    padding: "0.7rem",
                  }}
                  type="primary"
                  shape="round"
                  onClick={() => {
                    deleteItem(stocks.id);
                  }}
                >
                  Delete item
                </Button>
              </div>
            );
          })}
        </Footer>
      </Layout>{" "}
    </>
  );
};

export default Home;
