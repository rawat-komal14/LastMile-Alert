import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { ArrowLeft, Navigation, PhoneCall } from "lucide-react";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to smoothly center the map when selectedShelter changes
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, { duration: 1.5 }); // Smooth pan and zoom animation
    }
  }, [center, map]);
  return null;
}

function Shelters() {
  const [selectedShelter, setSelectedShelter] = useState(null);

  const sheltersList = [
    {
      id: 1,
      name: "Community Hall Safe Zone Sector 4",
      coords: [12.9716, 77.5946],
      distance: "1.2 km away",
      capacity: "450 / 600 slots available",
      contact: "+91 98765 43210",
      status: "Open & Secure",
    },
    {
      id: 2,
      name: "Government Higher Secondary School",
      coords: [12.9820, 77.6010],
      distance: "3.4 km away",
      capacity: "820 / 1000 slots available",
      contact: "+91 91234 56789",
      status: "Open & Secure",
    },
    {
      id: 3,
      name: "Central Relief Stadium Ground",
      coords: [12.9600, 77.5800],
      distance: "4.8 km away",
      capacity: "1,400 / 2,000 slots available",
      contact: "+91 99887 76655",
      status: "Open & Stocked",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <nav className="border-b border-slate-800 bg-slate-950/95 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/citizen"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:bg-slate-800"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-lg font-bold">Offline Safe Zones & Shelters</h1>
              <p className="text-xs text-slate-400">Interactive Map & Vector Canvas</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3">
        {/* Left Sidebar: Shelter List */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-80px)] space-y-4 border-r border-slate-800 bg-slate-950">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Verified Relief Camps</h2>
            <p className="text-xs text-slate-400">Click any shelter to center map and view directions.</p>
          </div>

          {sheltersList.map((shelter) => (
            <div
              key={shelter.id}
              onClick={() => setSelectedShelter(shelter)}
              className={`rounded-2xl border p-5 cursor-pointer transition ${
                selectedShelter?.id === shelter.id
                  ? "border-emerald-500 bg-emerald-950/20 shadow-lg"
                  : "border-slate-800 bg-slate-900 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-semibold">
                  {shelter.status}
                </span>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Navigation size={13} className="text-emerald-500" /> {shelter.distance}
                </span>
              </div>

              <h3 className="mt-3 font-bold text-base">{shelter.name}</h3>
              <p className="mt-1 text-xs text-slate-400">{shelter.capacity}</p>

              <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                <span className="flex items-center gap-1 text-slate-300">
                  <PhoneCall size={13} className="text-blue-400" /> {shelter.contact}
                </span>
                <span className="text-emerald-400 font-semibold hover:underline">View on Map →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Leaflet Map Canvas */}
        <div className="col-span-2 h-[500px] lg:h-[calc(100vh-80px)] w-full relative z-10">
          <MapContainer
            center={[12.9716, 77.5946]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", background: "#020617" }}
          >
            {/* Smoothly pans to selected shelter coordinates */}
            <MapController center={selectedShelter ? selectedShelter.coords : null} />

            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {sheltersList.map((shelter) => (
              <Marker
                key={shelter.id}
                position={shelter.coords}
                eventHandlers={{
                  click: () => setSelectedShelter(shelter),
                }}
              >
                <Popup>
                  <div className="p-1 text-slate-900">
                    <strong className="block font-bold text-sm">{shelter.name}</strong>
                    <span className="text-xs text-slate-600 block mt-1">{shelter.capacity}</span>
                    <span className="text-xs text-emerald-600 font-semibold block mt-1">Status: {shelter.status}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>
    </div>
  );
}

export default Shelters;