import { request } from './client'

const API_URL = import.meta.env.VITE_API_URL || ''

function buildApiUrl(path) {
  const baseUrl = API_URL.replace(/\/$/, '')
  return `${baseUrl}${path}`
}

export const spotifyApi = {
  register: (payload) =>
    request(buildApiUrl('/api/auth/register'), {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  login: (payload) =>
    request(buildApiUrl('/api/auth/login'), {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getMusic: ({ page = 1, limit = 12 } = {}) => request(buildApiUrl(`/api/music?page=${page}&limit=${limit}`)),

  getAlbums: () => request(buildApiUrl('/api/music/albums')),

  getAlbumById: (albumId) => request(buildApiUrl(`/api/music/albums/${albumId}`)),

  uploadMusic: ({ title, file }) => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('music', file)

    return request(buildApiUrl('/api/music/upload'), {
      method: 'POST',
      body: formData
    })
  },

  createAlbum: (payload) =>
    request(buildApiUrl('/api/music/createAlbum'), {
      method: 'POST',
      body: JSON.stringify(payload)
    })
}
