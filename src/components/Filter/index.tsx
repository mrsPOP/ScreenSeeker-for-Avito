import { Form, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countriesMock } from "../../mocks/countries";
import { ageRatingValues } from "./constants";
import { generateYearValues } from "./helpers";

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
  const [form] = Form.useForm();
  const [yearsOptions] = useState<SelectValues[]>(() => generateYearValues(30));
  const navigate = useNavigate();

  const submitForm = async (values: string[]) => {
    console.log("Received values of form: ", values);
  };

  const onFormSubmit = () => {
    const yearValue = form.getFieldsValue();
    console.log(yearValue);
  };

  return (
    <Form form={form} onFinish={onFormSubmit} style={{ width: "300px" }}>
      <Form.Item name="year" label="Год">
        <Select mode="multiple" placeholder="2024">
          {yearsOptions.map((option) => (
            <Option key={option.value} value={option.value} title="">
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="country" label="Страна">
        <Select mode="multiple" placeholder="Россия">
          {countryOptions.map((option) => (
            <Option key={option.slug} value={option.slug} title="">
              {option.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="ageRating" label="Возрастной рейтинг">
        <Select mode="multiple" placeholder="12">
          {ageRatingValues.map((option) => (
            <Option key={option.value} value={option.value} title="">
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <button type="submit">ok</button>
    </Form>
  );
};

export default Filter;
