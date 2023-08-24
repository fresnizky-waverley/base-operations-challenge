import { useRef } from "react";
import AutoComplete from "react-google-autocomplete";

export default function PlaceSearch({ handlePlaceSearch }) {
  const latRef = useRef(null);
  const lngRef = useRef(null);
  const radiusRef = useRef(null);

  return (
    <div className="">
      <AutoComplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        onPlaceSelected={(place) => {
          latRef.current.value = place.geometry.location.lat();
          lngRef.current.value = place.geometry.location.lng();
        }}
        options={{
          types: [],
          componentRestrictions: { country: "us" },
        }}
        placeholder="Search location"
      />

      <input name="lat" placeholder="Latitude" ref={latRef} />
      <input name="lng" placeholder="Longitude" ref={lngRef} />

      <input
        type="number"
        placeholder="Radius"
        name="radius"
        ref={radiusRef}
        value="100"
      />

      <button
        onClick={() =>
          handlePlaceSearch({
            lat: latRef.current.value,
            lng: lngRef.current.value,
            radius: radiusRef.current.value * 1000,
          })
        }
      >
        Search
      </button>
    </div>
  );
}
