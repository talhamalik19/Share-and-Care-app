import axios from 'axios';
import { GLOBALS } from '../constants/config';

export async function postResourceRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/resources/postRequest`,
      record
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

export async function updateResourceRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/resources/updateRequest`,
      record
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

export async function getResourceRequestsList(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/resources/fetchRequests`,
      record
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

export async function approveResourceRequest(record) {
  try {
    const response = await axios.put(
      `${GLOBALS.BASE_URL}/resources/approveRequest`,
      record
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

export async function deleteResourceRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/resources/deleteRequest`,
      record
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

export async function hideResourceRequest(record) {
  try {
    const response = await axios.put(
      `${GLOBALS.BASE_URL}/resources/hideRequest`,
      record
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
