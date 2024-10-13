import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

interface Profile {
  id: number
  name: string
  photo: string
  description: string
  location: { lat: number; lng: number }
  skills: string[]
}

interface MapProps {
  profile: Profile
}

export default function Map({ profile }: MapProps) {
  return (
    <div className="h-full flex flex-col">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div id="map" className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-[300px] overflow-hidden">
            <MapContainer style={{height: '100%', width: '100%'}} center={[profile.location.lat, profile.location.lng]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[profile.location.lat, profile.location.lng]}>
        
              </Marker>
            </MapContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">{profile.description}</p>
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(skill => (
              <Badge key={skill} variant="outline">{skill}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}