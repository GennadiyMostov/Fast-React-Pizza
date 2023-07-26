export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode?key=${
      import.meta.env.VITE_geocoding_API_Key
    }&latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();
  console.log(data);
  return data;
}
