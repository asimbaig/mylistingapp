/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Point } from "../../redux/pointType";
import { useGoogleMaps } from "react-hook-google-maps";

type Props = {
  point: Point;
  distanceCover: number;
};

const GMap: React.FC<Props> = ({ point, distanceCover }) => {
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyCyWLe07qXcmT0SOfseE5WyMG2jaxLD3EE",
    {
      center: point,
      zoom: 7,
    }
  );
  useEffect(() => {
    if (map && point) {
      new google.maps.Marker({ position: point, map });
      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.1,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.1,
        map,
        center: point,
        radius: Math.ceil(1609.34 * distanceCover), //1609.34 meter = 1 mile
      });
    }
  }, [point, map, distanceCover]);

  return <div ref={ref} style={{ width: "100%", height: 250 }} />;
};

export default GMap;
