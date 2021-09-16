import React, { useState } from 'react';
import { Drawer, Form, Row, Button, message } from 'antd';
import FormItemRender from './FormItemRender';
import { generateFormItems, request } from '../utils';
import { FormRenderProps } from '../../types/Types';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function DrawerForm(props: FormRenderProps): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { config, fields, rules, values, url, cols = 2, title = '新增', beforeSubmit, onSubmit, children } = props;

  const showDrawer = () => {
    setVisible(true);
    form.resetFields();
  };

  const submit = () => {
    form.validateFields().then(async (formValues) => {
      const data = beforeSubmit && beforeSubmit(formValues);
      if (onSubmit && typeof onSubmit === 'function') {
        onSubmit({ formValues: data ?? formValues });
        setVisible(false);
      } else if(url) {
        const res = await request(url, { ...values, ...formValues });
        if(res.success) {
          message.success(`${title}成功`);
          setVisible(false);
        } else {
          message.error(`${title}失败：${res.msg}`);
        }
      }
    });
  };

  return (
    <>
      <span onClick={showDrawer}>{children as React.ReactChildren}</span>
      <Drawer
        title={title}
        width={720}
        onClose={() => setVisible(false)}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => setVisible(false)} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={() => submit()} type="primary">
              提交
            </Button>
          </div>
        }
      >
        <Form form={form} initialValues={values} {...formItemLayout}>
          <Row gutter={24}>
            {generateFormItems(fields, rules, config).map((item: any) => (<FormItemRender key={item.name} span={24/cols} item={item} />))}
          </Row>
        </Form>
      </Drawer>
    </>
  );
}

export default DrawerForm;
