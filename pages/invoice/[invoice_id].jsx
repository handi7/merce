import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../lib/constants";

export default function Invoice() {
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

  return (
    <div>
      <h1>Invoice</h1>
    </div>
  );
}
