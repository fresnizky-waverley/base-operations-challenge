import { useRef, useState } from "react";
import AutoComplete from "react-google-autocomplete";

export default function PlaceForm({ handlePlaceAdd }) {
  const [place, setPlace] = useState(null);
  const nameRef = useRef(null);
  const latRef = useRef(null);
  const lngRef = useRef(null);

  return (
    <div className="">
      <input name="name" placeholder="Name" ref={nameRef} />
      <AutoComplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        onPlaceSelected={(place) => {
          setPlace(place);
          latRef.current.value = place.geometry.location.lat();
          lngRef.current.value = place.geometry.location.lng();
        }}
        options={{
          types: [],
          componentRestrictions: { country: "us" },
        }}
        placeholder="Add location"
      />

      <input name="lat" placeholder="Latitude" ref={latRef} />
      <input name="lng" placeholder="Longitude" ref={lngRef} />

      <button
        onClick={() =>
          handlePlaceAdd({
            name: nameRef.current.value,
            address: place.formatted_address,
            lat: latRef.current.value,
            lng: lngRef.current.value,
          })
        }
      >
        Add
      </button>
    </div>
  );
}
