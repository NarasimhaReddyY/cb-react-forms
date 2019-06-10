import { isEmpty } from 'lodash'

export const number = value => value && isNaN(Number(value)) 
  ? 'Must be a number'
  : undefined;

export const email = value => 
  value && 
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) 
  ? 'Invalid email address' 
  : undefined;

export const required = value => 
  isEmpty(value) ? 'Required' : undefined;