import { Card, Typography } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { getCurrent, getLast, getLastDays } from "../../helper/client/moments";
import moment from "moment";
import { getGrowth, toCurrency } from "../../helper/client/number.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function Revenue() {
  const [thisMonth, setThisMonth] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  const [labels, setLabels] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  const getRevenue = async () => {
    try {
      const response = await axios.post(`/api/orders/getRevenue`, {
        last30d: getLastDays(30),
        thisMonth: getCurrent("month"),
        lastMonth: getLast("month", "month"),
      });

      let tempLabels = [];
      let tempData = [];
      await response.data.last30dRev.forEach((item) => {
        tempLabels.push(moment(item.created_at).format("DD MMM"));
        tempData.push(+item.total);
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
    getRevenue();
  }, []);

  const data = {
    labels,
    datasets: [{ data: revenueData }],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Last 30 days revenue",
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
      line: {
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
        <Typography.Title level={3}>Sales</Typography.Title>
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

      <div>
        <Line
          className="mt-3"
          datasetIdKey="id"
          data={data}
          options={options}
        />
      </div>
    </Card>
  );
}
