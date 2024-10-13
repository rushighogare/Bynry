export interface Profile {
    id: number
    name: string
    photo: string
    description: string
    location: { lat: number; lng: number }
    skills: string[]
}

export const profiles: Profile[] = [
    {
        id: 1,
        name: "John Doe",
        photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "Software Engineer with 5 years of experience in building scalable web applications.",
        location: { lat: 40.7128, lng: -74.0060 },
        skills: ["React", "Node.js", "TypeScript"]
    },
    {
        id: 2,
        name: "Jane Smith",
        photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "UX Designer passionate about creating intuitive and user-centered digital experiences.",
        location: { lat: 34.0522, lng: -118.2437 },
        skills: ["UI/UX Design", "Figma", "User Research"]
    },
    {
        id: 3,
        name: "Bob Johnson",
        photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "Marketing specialist with a focus on digital strategies and data-driven campaigns.",
        location: { lat: 41.8781, lng: -87.6298 },
        skills: ["Digital Marketing", "SEO", "Content Strategy"]
    }
]