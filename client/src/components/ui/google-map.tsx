import React, { useState, useCallback } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

/// <reference types="@types/google.maps" />

interface GoogleMapProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
  height?: string;
}

// Komponent mapy
const MapComponent: React.FC<{
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
}> = ({ onLocationSelect, initialLocation }) => {
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [geocoder, setGeocoder] = useState<any>(null);

  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null && !map) {
      const defaultCenter = initialLocation || { lat: 52.2297, lng: 21.0122 }; // Warszawa jako domyślna lokalizacja
      
      const newMap = new (window as any).google.maps.Map(node, {
        center: defaultCenter,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      const newGeocoder = new (window as any).google.maps.Geocoder();
      
      setMap(newMap);
      setGeocoder(newGeocoder);

      // Dodaj marker
      const newMarker = new (window as any).google.maps.Marker({
        position: defaultCenter,
        map: newMap,
        draggable: true,
        title: 'Miejsce zdarzenia'
      });

      setMarker(newMarker);

      // Obsługa kliknięcia na mapę
      newMap.addListener('click', (event: any) => {
        if (event.latLng) {
          const position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          };
          
          newMarker.setPosition(position);
          
          // Pobierz adres dla wybranych współrzędnych
          newGeocoder.geocode({ location: position }, (results: any, status: any) => {
            if (status === 'OK' && results && results[0]) {
              onLocationSelect({
                ...position,
                address: results[0].formatted_address
              });
            } else {
              onLocationSelect({
                ...position,
                address: `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`
              });
            }
          });
        }
      });

      // Obsługa przeciągania markera
      newMarker.addListener('dragend', () => {
        const position = newMarker.getPosition();
        if (position) {
          const pos = {
            lat: position.lat(),
            lng: position.lng()
          };
          
          newGeocoder.geocode({ location: pos }, (results: any, status: any) => {
            if (status === 'OK' && results && results[0]) {
              onLocationSelect({
                ...pos,
                address: results[0].formatted_address
              });
            } else {
              onLocationSelect({
                ...pos,
                address: `${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`
              });
            }
          });
        }
      });

      // Ustaw początkowy adres
      if (initialLocation) {
        newGeocoder.geocode({ location: initialLocation }, (results: any, status: any) => {
          if (status === 'OK' && results && results[0]) {
            onLocationSelect({
              ...initialLocation,
              address: results[0].formatted_address
            });
          }
        });
      }
    }
  }, [map, onLocationSelect, initialLocation]);

  return <div ref={ref} style={{ width: '100%', height: '400px' }} />;
};

// Komponent obsługujący różne stany ładowania
const render = (status: Status): React.ReactElement => {
  if (status === Status.LOADING) return <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
    <div className="text-gray-500">Ładowanie mapy...</div>
  </div>;
  if (status === Status.FAILURE) return <div className="w-full h-96 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
    <div className="text-red-600">Błąd podczas ładowania mapy Google</div>
  </div>;
  return <></>;
};

// Główny komponent
const GoogleMap: React.FC<GoogleMapProps> = ({ onLocationSelect, initialLocation, height = "400px" }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full h-96 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-center">
        <div className="text-yellow-600">Klucz API Google Maps nie został skonfigurowany</div>
      </div>
    );
  }

  return (
    <div style={{ height }}>
      <Wrapper apiKey={apiKey} render={render} libraries={['geometry']}>
        <MapComponent onLocationSelect={onLocationSelect} initialLocation={initialLocation} />
      </Wrapper>
    </div>
  );
};

export default GoogleMap;