/* eslint-disable import/no-mutable-exports */
/* eslint-disable prefer-const */
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 500 }, // below normal load
    { duration: '5m', target: 800 },
    { duration: '5m', target: 1200 }, // normal load
    { duration: '5m', target: 800 }, // ease
    // stop
  ],
};

const randomNum = () => Math.floor(Math.random() * 100000);

export default function () {
  const BASE_URL = 'http://localhost:3001'; // make sure this is not production

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/houses/location/${randomNum()}`,
      null,
      { tags: { name: 'stage 1' } },
    ],
  ]);

  sleep(1);
}
