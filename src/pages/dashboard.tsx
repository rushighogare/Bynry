import React, { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Pencil, Trash2 } from "lucide-react"

interface Profile {
  id: number
  name: string
  email: string
  photo: string
  description: string
  location: { lat: number; lng: number }
  skills: string
  address?: string
}

const initialProfiles: Profile[] = [
  { id: 1, name: "John Doe", email: "john@example.com", description: "Software Engineer", photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", location: { lat: 40, lng: 50 }, skills: "c++, Python, Java" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", description: "Software Engineer", photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", location: { lat: 40, lng: 50 }, skills: "c++, Python, Java" },
]

export default function ProfileDashboard() {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null)
  const [newProfile, setNewProfile] = useState<Omit<Profile, 'id'>>({ name: '', email: '', description: '', photo: '', location: { lat: 0, lng: 0 }, skills: '', address: '' })

  const handleCreateProfile = async () => {
    const id = Math.max(0, ...profiles.map(p => p.id)) + 1
    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${newProfile.address}&apiKey=3d44fd50416b402cb6694eaa5e1bdaf1`);
    const data = await response.json();
    console.log(data);
    
    setProfiles([...profiles, { id, ...newProfile, location: { lat: 50, lng: 50 } }])
    setNewProfile({ name: '', email: '', description: '', photo: '', location: { lat: 0, lng: 0 }, skills: '', address: ' ' })
  }

  const handleUpdateProfile = () => {
    if (editingProfile) {
      setProfiles(profiles.map(p => p.id === editingProfile.id ? editingProfile : p))
      setEditingProfile(null)
    }
  }

  const handleDeleteProfile = (id: number) => {
    setProfiles(profiles.filter(p => p.id !== id))
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-8">Profile Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{editingProfile ? 'Edit Profile' : 'Create New Profile'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium ">Name</label>
                <Input
                  id="name"
                  value={editingProfile ? editingProfile.name : newProfile.name}
                  onChange={(e) => editingProfile
                    ? setEditingProfile({ ...editingProfile, name: e.target.value })
                    : setNewProfile({ ...newProfile, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium ">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={editingProfile ? editingProfile.email : newProfile.email}
                  onChange={(e) => editingProfile
                    ? setEditingProfile({ ...editingProfile, email: e.target.value })
                    : setNewProfile({ ...newProfile, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label htmlFor="photo" className="block text-sm font-medium ">Photo</label>
                <Input
                  id="photo"
                  type="url"
                  value={editingProfile ? editingProfile.photo : newProfile.photo}
                  onChange={(e) => editingProfile
                    ? setEditingProfile({ ...editingProfile, photo: e.target.value })
                    : setNewProfile({ ...newProfile, photo: e.target.value })}
                  placeholder="Enter Photo URL"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium ">Location</label>
                <Input
                  id="location"
                  type="text"
                  value={editingProfile ? editingProfile.address : newProfile.address}
                  onChange={(e) => editingProfile
                    ? setEditingProfile({ ...editingProfile, address: e.target.value })
                    : setNewProfile({ ...newProfile, address: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium ">Bio</label>
                <Textarea
                  id="description"
                  value={editingProfile ? editingProfile.description : newProfile.description}
                  onChange={(e) => editingProfile
                    ? setEditingProfile({ ...editingProfile, description: e.target.value })
                    : setNewProfile({ ...newProfile, description: e.target.value })}
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label htmlFor="skills" className="block text-sm font-medium ">Skills</label>
                <Input
                  id="skills"
                  type="text"
                  value={editingProfile ? editingProfile.skills : newProfile.skills}
                  onChange={(e) => editingProfile
                    ? setEditingProfile({ ...editingProfile, skills: e.target.value })
                    : setNewProfile({ ...newProfile, skills: e.target.value })}
                  placeholder="Enter skills seperated by ','"
                />
              </div>
              <Button
                onClick={editingProfile ? handleUpdateProfile : handleCreateProfile}
                disabled={editingProfile
                  ? !editingProfile.name || !editingProfile.email
                  : !newProfile.name || !newProfile.email
                }
              >
                {editingProfile ? 'Update Profile' : 'Create Profile'}
              </Button>
              {editingProfile && (
                <Button variant="outline" onClick={() => setEditingProfile(null)}>
                  Cancel
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell>{profile.name}</TableCell>
                    <TableCell>{profile.email}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingProfile(profile)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteProfile(profile.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}