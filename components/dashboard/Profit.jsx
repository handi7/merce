import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Card, Typography } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import axios from "axios";
import { getCurrent, getLast, getLastDays } from "../../helper/client/moments";
import { useEffect } from "react";
import moment from "moment";
import { getGrowth, toCurrency } from "../../helper/client/number.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function Profit() {
  const [thisMonth, setThisMonth] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  const [labels, setLabels] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  const getProfit = async () => {
    try {
      const response = await axios.post(`/api/orders/getProfit`, {
        last30d: getLastDays(30),
        thisMonth: getCurrent("month"),
        lastMonth: getLast("month", "month"),
      });

      let tempLabels = [];
      let tempData = [];
      await response.data.last30dRev.forEach((item) => {
        tempLabels.push(moment(item.created_at).format("DD MMM"));
        tempData.push(+item.total * 0.1);
      });
      setLabels(tempLabels);
      setRevenueData(tempData);
      setThisMonth(response.data.thisMRev);
      setLastMonth(response.data.lastMRev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfit();
  }, []);

  const data = {
    labels,
    datasets: [{ data: revenueData }],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Last 30 days profit",
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: ([item]) => {
            return item.label;
          },
          label: (tooltipItems, data) => {
            return "Rp " + tooltipItems.formattedValue;
          },
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
        fill: true,
        backgroundColor: "rgba(48,125,240,0.2)",
        borderColor: "rgba(48,125,240,1)",
        tension: 0.4,
      },
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false,
      },
    },
  };

  return (
    <Card>
      <div>
        <Typography.Title level={3}>Profit</Typography.Title>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Typography.Title level={4}>
              {toCurrency(thisMonth)}
            </Typography.Title>
            <Typography.Text>
              {toCurrency(lastMonth)} in last month
            </Typography.Text>
          </div>
          <div>
            <div className="text-end">
              <div
                className={`text-${
                  thisMonth > lastMonth ? "success" : "danger"
                } d-flex justify-content-end align-items-center`}
              >
                {thisMonth > lastMonth ? (
                  <CaretUpOutlined />
                ) : (
                  <CaretDownOutlined />
                )}
                <span className="ms-2">{getGrowth(thisMonth, lastMonth)}</span>
              </div>
            </div>
            <div className="text-end">
              <span>vs. last month</span>
            </div>
          </div>
        </div>
      </div>
      <Bar className="mt-3 border-bottom" data={data} options={options} />
    </Card>
  );
}
