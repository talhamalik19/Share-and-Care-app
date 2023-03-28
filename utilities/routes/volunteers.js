import axios from 'axios';
import { GLOBALS } from '../constants/config';

export async function getVolunteerRequests() {
  try {
    const response = await axios.get(
      `${GLOBALS.BASE_URL}/volunteers/fetchRequests`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      status: 'error',
      message: err.message,
    };
  }
}

export async function applyForVolunteerRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/volunteers/applyForRequest`,
      record
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      status: 'error',
      message: err.message,
    };
  }
}

export async function withdrawVolunteerRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/volunteers/withdrawApplication`,
      record
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      status: 'error',
      message: err.message,
    };
  }
}

export async function hideVolunteerRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/volunteers/hideRequest`,
      record
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      status: 'error',
      message: err.message,
    };
  }
}
