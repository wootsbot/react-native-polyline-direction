import polylineDecode from './polyline-decode';

const getDirectionsRequest = (
  apiKey,
  apiDirectionsServiceURL,
  origin,
  waypoints,
  destination,
  mode,
  language,
  region
) => {
  let url = apiDirectionsServiceURL;

  if (typeof apiDirectionsServiceURL === 'string') {
    url += `?origin=${origin}&waypoints=${waypoints}&destination=${destination}&key=${apiKey}&mode=${mode}&language=${language}&region=${region}&departure_time=now`;
  }

  return fetch(url)
    .then(response => response.json())
    .then(json => {
      if (json.status !== 'OK') {
        const errorMessage = json.error_message || 'Unknown error';
        return Promise.reject(errorMessage);
      }

      if (json.routes.length) {
        const route = json.routes[0];

        return Promise.resolve({
          distance:
            route.legs.reduce((carry, curr) => {
              return carry + curr.distance.value;
            }, 0) / 1000,
          duration:
            route.legs.reduce((carry, curr) => {
              return carry + curr.duration_in_traffic ? curr.duration_in_traffic.value : curr.duration.value;
            }, 0) / 60,
          coordinates: polylineDecode(route.overview_polyline.points),
          fare: route.fare,
        });
      } else {
        return Promise.reject();
      }
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.warn('PolylineDirection Error on GoogleMAPS route request', err);
    });
};

export default getDirectionsRequest;
