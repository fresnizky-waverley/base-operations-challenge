import { useState } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import PlaceSearch from '../components/place-search';
import PlaceForm from '../components/place-form'

type PlaceAddParams = {
  name: string,
  address: string
  lat: number,
  lng: number,
}

type PlaceSearchParams = {
  lat: number,
  lng: number,
  radius: number
}

export default function Home() {
  const [places, setPlaces] = useState([]);

  const handlePlaceAdd = ({name, address, lat, lng}: PlaceAddParams) => {
    if (!lat || !lng) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/place`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        address: address,
        latitude: lat,
        longitude: lng
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      setPlaces(data);
    })
    .catch(err => {
      console.error(err);
    });
  }

  const handlePlaceSearch = ({lat, lng, radius}: PlaceSearchParams) => {
    if (!lat || !lng || !radius) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/place?latitude=${lat}&longitude=${lng}&radius=${radius}`)
      .then(res => res.json())
      .then(data => {
        setPlaces(data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div>
      <Head>
        <title>Base Operations Challenge</title>
        <meta name="description" content="Base Operations Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PlaceForm handlePlaceAdd={handlePlaceAdd} />
        <PlaceSearch handlePlaceSearch={handlePlaceSearch} />
      </Layout>
    </div>
  )
}