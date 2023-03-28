import axios from 'axios';
import { GLOBALS } from '../constants/config';
import { getDataFromLocalStorage } from '../helpers/local-storage';

export async function checkCredentials() {
  try {
    const data = await getDataFromLocalStorage();
    if (data != null) {
      try {
        const response = await resumeSession(data);
        console.log('response', response);
        if (response.status === '200') {
          return {
            status: true,
            message: response.message,
            user: response.user,
          };
        } else {
          return {
            status: false,
            message: response.message,
          };
        }
      } catch (error) {
        console.log(error, 'Error checkCredentials');
        return {
          status: false,
          message: error.message,
        };
      }
    } else {
      return {
        status: false,
        message: 'No data found in local storage',
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
}

export async function resumeSession(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/users/resume-session`,
      record
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
}

export async function signIn(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/users/signin`,
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

export async function signUp(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/users/signup`,
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

export async function signOut(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/users/signout`,
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

export async function updateAccount(record) {
  try {
    const response = await axios.put(
      `${GLOBALS.BASE_URL}/users/update-account`,
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

export async function updatePassword(record) {
  try {
    const response = await axios.put(
      `${GLOBALS.BASE_URL}/users/update-password`,
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

export async function deleteAccount(record) {
  try {
    console.log(record);
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/users/delete-account`,
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

export async function fetchStats(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/users/fetchStats`,
      record
    );
    return response.data;
  } catch (err) {
    console.log(err, 'ddd');
    return {
      status: 'error',
      message: err.message,
    };
  }
}
