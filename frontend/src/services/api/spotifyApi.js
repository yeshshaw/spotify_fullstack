import { request } from './client'

export const spotifyApi = {
  register: (payload) =>
    request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  login: (payload) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getMusic: ({ page = 1, limit = 12 } = {}) => request(`/api/music?page=${page}&limit=${limit}`),

  getAlbums: () => request('/api/music/albums'),

  getAlbumById: (albumId) => request(`/api/music/albums/${albumId}`),

  uploadMusic: ({ title, file }) => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('music', file)

    return request('/api/music/upload', {
      method: 'POST',
      body: formData
    })
  },

  createAlbum: (payload) =>
    request('/api/music/createAlbum', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
}
