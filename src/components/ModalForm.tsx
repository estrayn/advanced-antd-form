import React, { useState } from 'react';
import { Modal, Form, Row, message } from 'antd';
import FormItemRender from './FormItemRender';
import { generateFormItems, request } from '../utils';
import { FormRenderProps } from '../../types/Types';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function ModalForm(props: FormRenderProps): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { config, fields, rules, values, url, cols = 1, title = '新增', beforeSubmit, onSubmit, children } = props;

  const showModal = () => {
    setVisible(true);
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
      <span onClick={showModal}>{children as React.ReactChildren}</span>
      <Modal
        title={title}
        width={720}
        onCancel={() => setVisible(false)}
        onOk={() => submit()}
        okText="提交"
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        maskClosable={false}
        destroyOnClose
      >
        <Form form={form} initialValues={values} preserve={false} {...formItemLayout}>
          <Row gutter={24}>
            {generateFormItems(fields, rules, config).map((item: any) => (<FormItemRender key={item.name} span={24/cols} item={item} />))}
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default ModalForm;
