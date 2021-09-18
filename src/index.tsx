import React from 'react';
import SearchForm from './components/SearchForm';
import DrawerForm from './components/DrawerForm';
import ModalForm from './components/ModalForm';
import { FormRenderProps } from '../types/Types';
import 'antd/es/button/style/index.css';
import 'antd/es/form/style/index.css';
import 'antd/es/modal/style/index.css';
import 'antd/es/drawer/style/index.css';

function AdvancedForm(props: FormRenderProps): React.ReactElement {
  const { type = "search" } = props;
  return (
    <>
      {type === 'search' && <SearchForm {...props} />}
      {type === 'drawer' && <DrawerForm {...props} />}
      {type === 'modal' && <ModalForm {...props} />}
    </>
  );
}

export default AdvancedForm;
