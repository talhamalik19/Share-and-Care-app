import axios from 'axios';
import { GLOBALS } from '../constants/config';

export async function getDonationsList() {
  try {
    const response = await axios.get(
      `${GLOBALS.BASE_URL}/donations/fetchDonations`
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
