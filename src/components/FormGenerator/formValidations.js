import { isEmpty, isNumber } from 'lodash'

export const email = value => 
  value && 
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) 
  ? 'Invalid email address' 
  : undefined;

export const required = value => 
  isEmpty(value) ? 'Required' : undefined;

export const number = value => 
  value && isNumber(value) ? 'Must be a number' : undefined;