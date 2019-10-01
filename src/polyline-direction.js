import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Polyline } from 'react-native-maps';

import { getDirectionsRequest } from 'utils';

function PolylineDirection(props) {
  const {
    apiKey,
    apiDirectionsServiceURL = 'https://maps.googleapis.com/maps/api/directions/json',
    language = 'en',
    mode = 'driving',
    optimizeWaypoints,
    region,
    origin,
    destination,
    waypoints,
    onReady,
    onStart,
    onError,
  } = props;

  const [coordinates, setCoordinates] = useState(null);
  useEffect(() => {
    handleFetchAndRenderRoute();

    return () => {
      setCoordinates(null);
    };
  }, [handleFetchAndRenderRoute, props]);

  const handleReady = useCallback(
    result => {
      if (!onReady) {
        return null;
      }

      onReady({
        coordinates: result.coordinates,
        distance: result.distance,
        duration: result.duration,
      });
    },
    [onReady]
  );

  const handleStart = useCallback(
    ({ originStart, destinationStart, waypointsStart }) => {
      if (!onStart) {
        return null;
      }

      onStart({
        origin: originStart,
        destination: destinationStart,
        waypoints: waypointsStart,
      });
    },
    [onStart]
  );

  const handleError = useCallback(
    errorMessage => {
      if (!onError) {
        return null;
      }

      onError(errorMessage);
    },
    [onError]
  );

  const handleFetchAndRenderRoute = useCallback(() => {
    let originString = origin;
    let destinationString = destination;
    let wayPointsString = waypoints;

    if (!originString || !destinationString) {
      return;
    }

    if (originString.latitude && originString.longitude) {
      originString = `${originString.latitude},${originString.longitude}`;
    }

    if (destinationString.latitude && destinationString.longitude) {
      destinationString = `${destinationString.latitude},${destinationString.longitude}`;
    }

    if (!wayPointsString || !wayPointsString.length) {
      wayPointsString = '';
    } else {
      wayPointsString = wayPointsString
        .map(waypoint =>
          waypoint.latitude && waypoint.longitude ? `${waypoint.latitude},${waypoint.longitude}` : waypoint
        )
        .join('|');
    }

    if (optimizeWaypoints) {
      wayPointsString = `optimize:true|${wayPointsString}`;
    }

    handleStart({
      originStart: originString,
      destinationStart: destinationString,
      waypointsStart: wayPointsString ? wayPointsString.split('|') : [],
    });

    getDirectionsRequest(
      apiKey,
      apiDirectionsServiceURL,
      originString,
      wayPointsString,
      destinationString,
      mode,
      language,
      region
    )
      .then(result => {
        setCoordinates(result.coordinates);

        handleReady(result);
      })
      .catch(errorMessage => {
        // eslint-disable-next-line no-console
        console.warn(`PolylineDirection Error: ${errorMessage}`);
        handleError(errorMessage);
      });
  }, [
    apiKey,
    apiDirectionsServiceURL,
    language,
    mode,
    optimizeWaypoints,
    region,
    origin,
    destination,
    waypoints,
    handleReady,
    handleStart,
    handleError,
  ]);

  if (!coordinates) {
    return null;
  }

  return <Polyline coordinates={coordinates} {...props} />;
}

PolylineDirection.propTypes = {
  apiKey: PropTypes.string.isRequired,
  origin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  ]),
  waypoints: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }),
    ])
  ),
  destination: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  ]),
  mode: PropTypes.oneOf(['driving', 'bicycling', 'transit', 'walking']),
  onStart: PropTypes.func,
  onReady: PropTypes.func,
  onError: PropTypes.func,
  language: PropTypes.string,
  resetOnChange: PropTypes.bool,
  optimizeWaypoints: PropTypes.bool,
  apiDirectionsServiceURL: PropTypes.string,
  region: PropTypes.string,
};

export default PolylineDirection;
