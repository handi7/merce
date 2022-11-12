import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../lib/constants";

export default function Invoice() {
  const user = useSelector((state) => state.user);

  const { invoice_id } = useRouter().query;
  const [invoice, setInvoice] = useState({});
  const [items, setItems] = useState();

  console.log(invoice, items);

  const getInvoice = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/orders/${id}`);
      setInvoice(response.data.invoice);
      setItems(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (invoice_id) {
      getInvoice(invoice_id);
    }
  }, [invoice_id]);

  useEffect(() => {
    if (!user.id) {
      Router.push("/login");
    }
  }, [user]);

  return (
    <div>
      <h1>Invoice</h1>
    </div>
  );
}
