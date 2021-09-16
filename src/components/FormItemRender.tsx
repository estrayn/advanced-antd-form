import React from 'react';
import { Form, Col } from 'antd';
import { FormItem } from '../../types/Types';

interface FormItemRenderProps {
  item: FormItem;
  span?: number | undefined;
};

const FormItemRender = ({
  item,
  span = 8
}: FormItemRenderProps): React.ReactElement | null => {

  if (typeof item !== 'object' || !item) return null;

  const { type, name, rules, label, elProps = {}, itemProps = {}, render } = item;

  return (
    <Col span={span}>
      <Form.Item name={name} label={label} rules={rules} {...itemProps}>
        {render ? render() : React.createElement(type, { ...elProps } as React.Attributes)}
      </Form.Item>
    </Col>
  );
};

export default FormItemRender;
