// This is a simplified auth stub file
// The actual authentication logic will be implemented in the backend

export const auth = {
  isAuthenticated: () => true, // Mock implementation
  getUser: () => ({
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    image: null
  }),
  // Add more stub methods as needed
}

// Mock session type definition
export type Session = {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}
