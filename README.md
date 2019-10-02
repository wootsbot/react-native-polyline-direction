<div align="center">

# `@react-native-maps/polyline-direction`

:round_pushpin: A component in (iOS + Android) for drawing routes with the polyline of the [react-native-maps](https://github.com/react-native-community/react-native-maps) library

</div>

## Installation

Install the package in your project directory with:

```sh
// with yarn
yarn add @react-native-maps/polyline-direction

// with npm
npm install --save @react-native-maps/polyline-direction
```

## Compatibility

Due to the rapid changes being made in the React Native ecosystem, we are not officially going to support this module on anything but the latest version of React Native. With that said, we will do our best to stay compatible with older versions as much that is practical, and the peer dependency of this requirement is set to `"react-native": "\*"` explicitly for this reason. If you are using an older version of React Native with this module though, some features may be buggy.

## General Usage

```jsx
import PolylineDirection from '@react-native-maps/polyline-direction';
```

Or

```js
var PolylineDirection = require('@react-native-maps/polyline-direction');
```

## Basic Usage

#### important

The component `PolylineDirection` wrap it in a [MapView](https://github.com/react-native-community/react-native-maps/blob/master/docs/mapview.md) component.

The mandatory PolylineDirection props are:

- `origin`: The origin location to start routing from
- `destination`: The destination location to start routing to
- `apiKey`: Your Google Maps Directions API Key (request one here; if you're using an existing Google Maps API Key make sure you've enabled the Google Maps Directions API for that key using the Google API Console).

```jsx
import React from 'react';
import { View } from 'react-native';

import MapView from 'react-native-maps';

import PolylineDirection from '@react-native-maps/polyline-direction';

const origin = { latitude: 19.363631, longitude: -99.182545 };
const destination = { latitude: 19.2932543, longitude: -99.1794758 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyAQO5Ol8duHnJd2vs1JElye8f177yXyHGw';

function MyComponent() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 19.363631,
          longitude: -99.182545,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}>
        <PolylineDirection
          origin={origin}
          destination={destination}
          apiKey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="#12bc00"
        />
      </MapView>
    </View>
  );
}

export default MyComponent;
```

## Component API

### Props

| Prop                      | Type                   | Default      | Note                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------- | ---------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `origin`                  | `LatLng` or `String`   |              | The origin location to start routing from.                                                                                                                                                                                                                                                                                                                                   |
| `destination`             | `LatLng` or `String`   |              | The destination location to start routing to.                                                                                                                                                                                                                                                                                                                                |
| `apiKey`                  | `String`               |              | Your Google Maps API Key _(request one [here](https://developers.google.com/maps/documentation/directions/get-api-key); if you're using an existing Google Maps API Key make sure you've enabled the Google Maps Directions API for that key using the [Google API Console](https://console.developers.google.com/apis/) by hitting the “Enable APIs and Services“ button)_. |
| `waypoints`               | [`LatLng` or `String`] |              | Array of waypoints to use between origin and destination.                                                                                                                                                                                                                                                                                                                    |
| `language`                | `String`               | `"en"`       | The language to use when calculating directions. See [here](https://developers.google.com/maps/documentation/javascript/localization) for more info.                                                                                                                                                                                                                         |
| `mode`                    | `String`               | `"driving"`  | Which transportation mode to use when calculating directions. Allowed values are `"driving"`, `"bicycling"`, `"walking"`, and `"transit"`. _(See [here](https://developers.google.com/maps/documentation/javascript/examples/directions-travel-modes) for more info)_.                                                                                                       |
| `resetOnChange`           | `boolean`              | `true`       | Tweak if the rendered `MapView.Polyline` should reset or not when calculating the route between `origin` and `destionation`. Set to `false` if you see the directions line glitching.                                                                                                                                                                                        |
| `optimizeWaypoints`       | `boolean`              | `false`      | Set it to true if you would like Google Maps to re-order all the waypoints to optimize the route for the fastest route. Please be aware that if this option is enabled, you will be billed for a higher rate by Google as stated [here](https://developers.google.com/maps/documentation/javascript/directions#Waypoints).                                                   |
| `apiDirectionsServiceURL` | `string`               | _(Google's)_ | Base URL of the Directions Service (API) you are using. By default the Google Directions API is used (`"https://maps.googleapis.com/maps/api/directions/json"`). Usually you won't need to change this.                                                                                                                                                                      |
| `region`                  | `String`               |              | If you are using strings for **origin** or **destination**, sometimes you will get an incorrect route because Google Maps API needs the region where this places belong to. See [here](https://developers.google.com/maps/documentation/javascript/localization#Region) for more info.                                                                                       |

#### More props

Since the result rendered on screen is a `MapView.Polyline` component, all [`MapView.Polyline` props](https://github.com/airbnb/react-native-maps/blob/master/docs/polyline.md#props) – except for `coordinates` – are also accepted.

```js
<MapView initialRegion={…}>
  <PolylineDirection
    origin={origin}
    destination={destination}
    apiKey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor="hotpink"
  />
</MapView>
```

### Events/Callbacks

| Event Name | Returns                                                                 | Notes                                                                                                                             |
| ---------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `onStart`  | `{ origin, destination, waypoints: [] }`                                | Callback that is called when the routing has started.                                                                             |
| `onReady`  | `{ distance: Number, duration: Number, coordinates: [], fare: Object }` | Callback that is called when the routing has succesfully finished. Note: distance returned in kilometers and duration in minutes. |
| `onError`  | `errorMessage`                                                          | Callback that is called in case the routing has failed.                                                                           |

## Whats Next

[Contributing](./CONTRIBUTING.md) to `@react-native-maps/polyline-direction`

I could take the sources to the [project](https://github.com/bramus/react-native-maps-directions) where I was inspired, for the moment I will do my best to keep the package updated
