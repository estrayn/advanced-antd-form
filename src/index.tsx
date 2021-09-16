import React from 'react';
import SearchForm from './components/SearchForm';
import DrawerForm from './components/DrawerForm';
import ModalForm from './components/ModalForm';
import { FormRenderProps } from '../types/Types';

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
