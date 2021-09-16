import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import FormItemRender from './FormItemRender';
import { generateFormItems } from '../utils';
import { FormRenderProps } from '../../types/Types';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function SearchForm(props: FormRenderProps): React.ReactElement {
  const [expand, setExpand] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { config, fields, rules, values, beforeSubmit, onLoad, cols = 3, buttonsLayout = 'inline', isAdvance = false } = props;

  const handleSearch = () => {
    form.validateFields().then(formValues => {
      const data = beforeSubmit && beforeSubmit(formValues);
      if (onLoad && typeof onLoad === 'function') {
        onLoad(data || formValues);
      }
    });
  };
  let newFields = [];
  if(!!isAdvance === !!expand) {
    newFields = [...fields];
  } else {
    newFields = fields.slice(0, 2);
  }
  return (
    <Form form={form} initialValues={values} {...formItemLayout}>
      <Row gutter={24}>
        {generateFormItems(newFields, rules, config).map((item: any) => (<FormItemRender key={item.name} span={24/cols} item={item} />))}
        {buttonsLayout === 'inline' && (
          <Col span={24/cols}>
            <Button type="primary" onClick={() => handleSearch()}>查询</Button>
            <Button style={{ marginLeft: '10px' }} onClick={() => { form.resetFields(); }}>重置</Button>
          </Col>
        )}
        {buttonsLayout === 'outline' && isAdvance && !expand && (
          <Col span={24/cols}>
            <Button type="primary" onClick={() => handleSearch()}>查询</Button>
            <Button style={{ margin: '0 10px' }} onClick={() => { form.resetFields(); }}>重置</Button>
            {isAdvance && (
              <a style={{ fontSize: 12 }} onClick={() => { setExpand(!expand); }}>
                {expand ? <>收起<UpOutlined /></> : <>展开<DownOutlined /></>} 
              </a>
            )}
          </Col>
        )}
      </Row>
      {buttonsLayout === 'outline' && isAdvance && expand && (
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={() => handleSearch()}>
              查询
            </Button>
            <Button
              style={{ margin: '0 10px' }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
            {isAdvance && expand && (
              <a style={{ fontSize: 12 }} onClick={() => { setExpand(!expand); }}>
                {expand ? <>收起<UpOutlined /></> : <>展开<DownOutlined /></>} 
              </a>
            )}
          </Col>
        </Row>
      )}
    </Form>
  );
}

export default SearchForm;
