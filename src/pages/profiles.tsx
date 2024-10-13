import { useState } from 'react'
import { profiles, Profile } from '../lib/profiles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/button"
import { Badge } from '../components/ui/badge'
import Map from '../components/Map'
import { MapPin, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Profiles() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const Navigate=useNavigate();

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="container mx-auto p-4">
      <div className='flex items-center justify-between'>
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Profile Collection</h1>
      <Button onClick={()=> Navigate("/dashboard")}>Go to dashboard</Button>
      </div>
      <div className='border w-full h-12 px-4 py-2 mb-6'>
        <input
          className='w-full h-full outline-none bg-transparent text-white'
          placeholder='Search a Profile'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map(profile => (
          <Card key={profile.id} className="overflow-hidden">
            <CardHeader className="relative p-0">
              <img src={profile.photo} alt={profile.name} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  onClick={() => setSelectedProfile(profile)}
                  className="text-white"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View Summary
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-2">{profile.name}</CardTitle>
              <CardDescription className="text-sm text-zinc-200 mb-4">{profile.description}</CardDescription>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map(skill => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedProfile && (
        <div className="fixed inset-y-0 right-0 w-full lg:w-2/4 bg-zinc-800 shadow-lg overflow-hidden transition-transform duration-300 transform translate-x-0" style={{ zIndex: 50 }}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-white font-bold">{selectedProfile.name}</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedProfile(null)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <Map profile={selectedProfile} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Profiles