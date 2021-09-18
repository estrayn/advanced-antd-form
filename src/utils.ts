import type { AdvancedConfig } from '../types/Types';
import type { Rule } from 'rc-field-form/lib/interface';

export function generateFormItems(fields: string[], rules: Record<string, Rule[]> = {}, config: AdvancedConfig) {
  return fields.map(field => {
    if(config.fields[field] && config.names[field]) {
      let obj = {};
      if (typeof config.fields[field] === 'object') obj = {...(config.fields[field] as Record<string, string>)};
      return {
        type: config.fields[field],
        label: config.names[field],
        name: field,
        ...obj,
        rules: rules[field],
      };
    } 
    return null;
  }).filter(item => !!item);
}

export function request(url: string, data: Record<string, unknown>, options = {}) {
  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'include', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
    ...options,
  })
  .then(response => response.json())
}