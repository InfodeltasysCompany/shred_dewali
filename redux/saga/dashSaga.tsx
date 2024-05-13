// import { call, put, takeLatest } from 'redux-saga/effects';
// import { FETCH_DATA,FETCH_FAILURE,FETCH_SUCCESS } from '../cosntants';

// // Sample API function to fetch data (replace with your API call)
// const fetchDataFromAPI = async () => {
//   try {
//     const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error('Failed to fetch data');
//   }
// };

// function* fetchDataWorker() {
//   try {
//     const data = yield call(fetchDataFromAPI);
//     yield put({ type: FETCH_SUCCESS, payload: data });
//   } catch (error) {
//     yield put({ type: FETCH_FAILURE, payload: error.message });
//   }
// }

// export function* watchFetchData() {
//   yield takeLatest(FETCH_DATA, fetchDataWorker);
// }





/////////////////////
import { call, put, takeLatest, delay } from 'redux-saga/effects';
// import { FETCH_DATA, FETCH_FAILURE, FETCH_SUCCESS } from '../constants';
import { FETCH_DATA,FETCH_FAILURE,FETCH_SUCCESS } from '../cosntants';

// Sample API function to fetch data (replace with your API call)
const fetchDataFromAPI = async () => {
  try {
    const response = await fetch('https://shreddersbay.com/API/orders_api.php?action=select');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

function* fetchDataWorker() {
  try {
    while (true) {
      const data = yield call(fetchDataFromAPI);
      yield put({ type: FETCH_SUCCESS, payload: data });
      // Exit the loop if data is successfully retrieved
      break;
    }
  } catch (error) {
    yield put({ type: FETCH_FAILURE, payload: error.message });
    // Delay for a certain amount of time before retrying
    yield delay(2000); // Delay for 5 seconds (adjust as needed)
    // The loop will repeat and attempt to fetch data again
  }
}

export function* watchFetchData() {
  yield takeLatest(FETCH_DATA, fetchDataWorker);
}
