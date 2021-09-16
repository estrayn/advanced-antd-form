import type React from 'react';
import type { Rule } from 'rc-field-form/lib/interface';

export interface FormItem {
  type: React.ComponentType | string;
  name?: string;
  label?: string;
  render?: () => React.ReactElement;
  elProps?: Record<string | number | symbol, unknown>;
  itemProps?: Record<string | number | symbol, unknown>;
  rules?: Rule[];
  [prop: string]: unknown;
}

export interface AdvancedConfig {
  names: Record<string, string>;
  fields: Record<string, FormItem | React.ComponentType | string>;
}

export interface FormRenderProps {
  config: AdvancedConfig;
  fields: string[];
  rules?: Record<string, Rule[]>;
  type: 'search' | 'modal' | 'drawer';
  title?: string;
  buttonsLayout?: 'inline' | 'outline';
  isAdvance?: boolean;
  values?: Record<string, unknown>;
  url?: string;
  beforeSubmit?: (formValues: Record<string, unknown>) => unknown;
  onLoad?: (formValues: Record<string, unknown>) => void;
  onSubmit?: (formValues: Record<string, unknown>) => (void | Promise<any>);
  cols?: undefined | 1 | 2 | 3 | 4 | 6;
  [prop: string]: unknown;
}

