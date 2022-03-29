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
  const [searchData, setSearchData] = useState([]);

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
  // ======================////
  const handle = (event) => {
    const searchWord = event.target.value;
    const newsearch = stock.filter((value) => {
      return value.item
        .toLocaleLowerCase()
        .includes(searchWord.toLocaleLowerCase());
    });
    setSearchData(newsearch);
  };

  // ============================///
  return (
    <>
      <Layout>
        <Header
          style={{
            widtd: "100%",

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
        {/*=================================================================================  */}
        <Footer
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
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
            <input
              placeholder="Search Item"
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
              onChange={handle}
            />
          </div>
          <tr
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: " 2fr 1fr 1fr 1fr 1fr 1fr",
            }}
          >
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Update Quantity</th>
            <th> Add Quantity </th>
            <th>Remove Quantity </th>
            <th> Delete Item </th>
          </tr>

          {searchData.map((stocks) => {
            return (
              <div>
                <tr
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: " 2fr 1fr 1fr 1fr 1fr 1fr",
                  }}
                >
                  <td
                    style={{
                      color: "#000",
                      backgroundColor: "#fff",
                    }}
                  >
                    {" "}
                    {stocks.item}{" "}
                  </td>
                  <td
                    style={{
                      color: "#000",
                    }}
                  >
                    {" "}
                    {stocks.quantity}{" "}
                  </td>
                  <td>
                    <Input
                      required
                      style={{
                        fontSize: "small",

                        borderRadius: "1rem",
                        padding: "0.5rem",
                        border: "1px",
                      }}
                      type="number"
                      placeholder="enter new quantity"
                      onChange={(event) => {
                        setUpdateQuantity(event.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <Button
                      style={{
                        fontSize: "small",
                        borderRadius: "1rem",
                        color: "#fff",
                        backgroundColor: "#BD90BD",

                        border: "none",
                        padding: "0.5rem",
                      }}
                      onClick={() => {
                        AddQuantity(stocks.id, stocks.quantity);
                      }}
                    >
                      Add Quantity
                    </Button>
                  </td>
                  <td>
                    <Button
                      style={{
                        fontSize: "small",
                        borderRadius: "1rem",
                        color: "#fff",
                        backgroundColor: "#BD90BD",

                        border: "none",
                        padding: "0.5rem",
                      }}
                      onClick={() => {
                        RemoveQuantity(stocks.id, stocks.quantity);
                      }}
                      type="primary"
                      shape="round"
                    >
                      Remove Item
                    </Button>
                  </td>
                  <td>
                    <Button
                      style={{
                        fontSize: "small",
                        borderRadius: "1rem",
                        color: "#fff",
                        backgroundColor: "#BD90BD",

                        border: "none",
                        padding: "0.5rem",
                      }}
                      type="primary"
                      shape="round"
                      onClick={() => {
                        deleteItem(stocks.id);
                      }}
                    >
                      Delete item
                    </Button>
                  </td>
                </tr>
              </div>
            );
          })}
        </Footer>
      </Layout>{" "}
    </>
  );
};

export default Home;
