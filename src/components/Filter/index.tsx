import { Button, Col, Form, Row, Select } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { countriesMock } from "../../mocks/countries";
import { ageRatingValues } from "./constants";
import { generateYearValues } from "./helpers";
import "./styles.css";

const { Option } = Select;

type SelectValues = {
  value: string;
  label: string | number;
};

const Filter = ({
  countryOptions,
}: {
  countryOptions: FieldValue[] | null;
}) => {
  countryOptions = countryOptions || countriesMock;

  let [searchParams, setSearchParams] = useSearchParams();

  const [form] = Form.useForm();
  const [yearsOptions] = useState<SelectValues[]>(() => generateYearValues(30));

  const onFormSubmit = () => {
    const values = form.getFieldsValue(true);
    const newSearchParams = new URLSearchParams();
    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((item) => newSearchParams.append(key, item));
        } else {
          newSearchParams.set(key, value);
        }
      }
    });
    setSearchParams(newSearchParams);
  };

  const resetForm = () => {
    form.resetFields();
    setSearchParams({});
  };

  return (
    <>
      <h2>Фильтры поиска</h2>
      <Form
        form={form}
        onFinish={onFormSubmit}
        style={{ inlineSize: "100%", paddingInline: "20px" }}
      >
        <Row gutter={[16, 16]} style={{ marginInline: 0 }}>
          <Col xs={24} sm={12} md={8} lg={6} style={{ inlineSize: "100%" }}>
            <Form.Item name="countries.name" label="Страна">
              <Select mode="multiple" placeholder="Россия">
                {countryOptions.map((option) => (
                  <Option key={option.slug} value={option.name} title="">
                    {option.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} style={{ inlineSize: "100%" }}>
            <Form.Item name="year" label="Год">
              <Select mode="multiple" placeholder="2024">
                {yearsOptions.map((option) => (
                  <Option key={option.value} value={option.value} title="">
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="ageRating" label="Возрастной рейтинг">
              <Select
                mode="multiple"
                placeholder="12"
                style={{ inlineSize: "100%" }}
              >
                {ageRatingValues.map((option) => (
                  <Option key={option.value} value={option.value} title="">
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} className="align-right-at-md">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Применить
              </Button>
              <Button
                disabled={searchParams.size === 0}
                style={{ marginInlineStart: "8px" }}
                onClick={resetForm}
              >
                Сбросить
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Filter;
