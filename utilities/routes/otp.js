import axios from 'axios';
import { GLOBALS } from '../constants/config';

export async function forgotPassword(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/otp/forgotPassword`,
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

export async function verifyOtp(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/otp/verifyOtp`,
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

export async function resetPassword(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/otp/resetPassword`,
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
