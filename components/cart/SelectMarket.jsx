import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const SelectMarket = ({ Item }) => {
  const [form] = Form.useForm();

  const [markets, setMarkets] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getMarkets = async () => {
    try {
      const response = await axios.get(`/api/market/getMarkets`);
      setMarkets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post(`/api/market/addMarket`, values);
      form.resetFields();
      getMarkets();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarkets();
  }, []);

  return (
    <Item
      label="Choose Market"
      name="market"
      rules={[{ required: true, message: "Please select market!" }]}
    >
      <Select
        className="w-100"
        placeholder="Market"
        name="market"
        dropdownRender={(menu) => (
          <>
            {menu}

            <Divider style={{ margin: "8px 0" }} />

            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row className="mx-2">
                <Col span={11}>
                  <Form.Item
                    name="market"
                    rules={[
                      { required: true, message: "Please input market name!" },
                    ]}
                  >
                    <Input placeholder="Add Market" size="small" />
                  </Form.Item>
                </Col>

                <Col span={11} offset={2}>
                  <Form.Item>
                    <Button
                      block
                      type="primary"
                      size="small"
                      loading={isLoading}
                      htmlType="submit"
                    >
                      Add Market
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </>
        )}
      >
        {markets.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.market}
          </Select.Option>
        ))}
      </Select>
    </Item>
  );
};

export default SelectMarket;
