import { SponsorStyle } from '@type/common';

export const post = async (url: string, data: SponsorStyle) => {
  const scale = data.scale;
  const isColor = data.isColor;
  const price = data.price;

  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  return res;
};

export const put = async (url: string, data: SponsorStyle) => {
  const scale = data.scale;
  const isColor = data.isColor;
  const price = data.price;

  const res = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  return res;
};
