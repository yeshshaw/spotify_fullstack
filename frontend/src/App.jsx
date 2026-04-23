import { useEffect, useMemo, useState } from 'react'
import { MUSIC_PAGE_SIZE } from './app/constants'
import { clearStoredUser, readStoredUser, writeStoredUser } from './app/storage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import { spotifyApi } from './services/api/spotifyApi'

export default function App() {
  const [mode, setMode] = useState('login')
  const [user, setUser] = useState(readStoredUser)

  const [authData, setAuthData] = useState({ userName: '', email: '', password: '', role: 'user' })
  const [loginId, setLoginId] = useState('')

  const [music, setMusic] = useState([])
  const [albums, setAlbums] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState(null)

  const [musicPage, setMusicPage] = useState(1)
  const [hasMoreMusic, setHasMoreMusic] = useState(false)
  const [musicLoading, setMusicLoading] = useState(false)

  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadFile, setUploadFile] = useState(null)
  const [albumTitle, setAlbumTitle] = useState('')
  const [albumMusicIds, setAlbumMusicIds] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const isArtist = useMemo(() => user?.role === 'artist', [user])

  async function loadDashboard() {
    setMusicLoading(true)
    setError('')

    try {
      const [musicRes, albumRes] = await Promise.all([
        spotifyApi.getMusic({ page: 1, limit: MUSIC_PAGE_SIZE }),
        spotifyApi.getAlbums()
      ])

      setMusic(musicRes.music || [])
      setMusicPage(musicRes.pagination?.page || 1)
      setHasMoreMusic(Boolean(musicRes.pagination?.hasMore))
      setAlbums(albumRes.albums || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setMusicLoading(false)
    }
  }

  async function loadMoreMusic() {
    if (!hasMoreMusic || musicLoading) return

    setMusicLoading(true)
    setError('')

    try {
      const nextPage = musicPage + 1
      const musicRes = await spotifyApi.getMusic({ page: nextPage, limit: MUSIC_PAGE_SIZE })

      setMusic((prev) => [...prev, ...(musicRes.music || [])])
      setMusicPage(musicRes.pagination?.page || nextPage)
      setHasMoreMusic(Boolean(musicRes.pagination?.hasMore))
    } catch (err) {
      setError(err.message)
    } finally {
      setMusicLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadDashboard()
    }
  }, [user])

  async function handleAuthSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response =
        mode === 'register'
          ? await spotifyApi.register(authData)
          : await spotifyApi.login(
              loginId.includes('@')
                ? { email: loginId.trim(), password: authData.password }
                : { userName: loginId.trim(), password: authData.password }
            )

      const nextUser = {
        id: response.id,
        userName: response.userName,
        email: response.email,
        role: response.role
      }

      setUser(nextUser)
      writeStoredUser(nextUser)
      setMessage(response.message || 'Success')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function openAlbum(albumId) {
    setError('')

    try {
      const response = await spotifyApi.getAlbumById(albumId)
      setSelectedAlbum(response.album || null)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleUploadSubmit(event) {
    event.preventDefault()
    if (!uploadFile) return

    setLoading(true)
    setError('')

    try {
      const response = await spotifyApi.uploadMusic({ title: uploadTitle, file: uploadFile })
      setMessage(response.message || 'Track uploaded')
      setUploadTitle('')
      setUploadFile(null)
      await loadDashboard()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateAlbumSubmit(event) {
    event.preventDefault()

    setLoading(true)
    setError('')

    try {
      const musics = albumMusicIds
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)

      const response = await spotifyApi.createAlbum({ title: albumTitle, musics })
      setMessage(response.message || 'Album created')
      setAlbumTitle('')
      setAlbumMusicIds('')
      await loadDashboard()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    clearStoredUser()
    setUser(null)
    setMusic([])
    setAlbums([])
    setSelectedAlbum(null)
    setMusicPage(1)
    setHasMoreMusic(false)
    setMessage('Logged out locally')
    setError('')
  }

  if (!user) {
    return (
      <AuthPage
        mode={mode}
        setMode={setMode}
        authData={authData}
        setAuthData={setAuthData}
        loginId={loginId}
        setLoginId={setLoginId}
        onSubmit={handleAuthSubmit}
        loading={loading}
        message={message}
        error={error}
      />
    )
  }

  return (
    <DashboardPage
      user={user}
      isArtist={isArtist}
      onLogout={logout}
      message={message}
      error={error}
      music={music}
      musicLoading={musicLoading}
      hasMoreMusic={hasMoreMusic}
      onLoadMoreMusic={loadMoreMusic}
      albums={albums}
      selectedAlbum={selectedAlbum}
      onOpenAlbum={openAlbum}
      uploadTitle={uploadTitle}
      setUploadTitle={setUploadTitle}
      setUploadFile={setUploadFile}
      albumTitle={albumTitle}
      setAlbumTitle={setAlbumTitle}
      albumMusicIds={albumMusicIds}
      setAlbumMusicIds={setAlbumMusicIds}
      onUploadSubmit={handleUploadSubmit}
      onCreateAlbumSubmit={handleCreateAlbumSubmit}
      loading={loading}
      hasUploadFile={Boolean(uploadFile)}
    />
  )
}
