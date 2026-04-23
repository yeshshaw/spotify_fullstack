import ArtistTools from '../components/artist/ArtistTools'
import AlbumsSection from '../components/music/AlbumsSection'
import MusicSection from '../components/music/MusicSection'

export default function DashboardPage({
  user,
  isArtist,
  onLogout,
  message,
  error,
  music,
  musicLoading,
  hasMoreMusic,
  onLoadMoreMusic,
  albums,
  selectedAlbum,
  onOpenAlbum,
  uploadTitle,
  setUploadTitle,
  setUploadFile,
  albumTitle,
  setAlbumTitle,
  albumMusicIds,
  setAlbumMusicIds,
  onUploadSubmit,
  onCreateAlbumSubmit,
  loading,
  hasUploadFile
}) {
  return (
    <main className='spotify-shell'>
      <aside className='spotify-sidebar'>
        <div className='brand-block'>
          <div className='spotify-dot' />
          <div>
            <h1>Spotify</h1>
            <p>Premium Clone</p>
          </div>
        </div>

        <nav className='sidebar-nav'>
          <button type='button' className='nav-item active'>
            Home
          </button>
          <button type='button' className='nav-item'>
            Search
          </button>
          <button type='button' className='nav-item'>
            Your Library
          </button>
          <button type='button' className='nav-item'>
            Liked Songs
          </button>
        </nav>

        <div className='sidebar-user'>
          <p>{user.userName}</p>
          <span>{user.role.toUpperCase()}</span>
        </div>
      </aside>

      <section className='spotify-main'>
        <header className='spotify-header'>
          <div>
            <h2>Good evening</h2>
            <p className='muted'>Welcome back to your premium music space.</p>
          </div>

          <div className='header-actions'>
            <button type='button' className='header-pill'>
              Explore Premium
            </button>
            <button type='button' onClick={onLogout} className='header-pill ghost'>
              Logout
            </button>
          </div>
        </header>

        {message || error ? (
          <div className='status-stack'>
            {message ? <p className='success'>{message}</p> : null}
            {error ? <p className='error'>{error}</p> : null}
          </div>
        ) : null}

        {isArtist ? (
          <ArtistTools
            uploadTitle={uploadTitle}
            setUploadTitle={setUploadTitle}
            setUploadFile={setUploadFile}
            albumTitle={albumTitle}
            setAlbumTitle={setAlbumTitle}
            albumMusicIds={albumMusicIds}
            setAlbumMusicIds={setAlbumMusicIds}
            onUploadSubmit={onUploadSubmit}
            onCreateAlbumSubmit={onCreateAlbumSubmit}
            loading={loading}
            hasUploadFile={hasUploadFile}
          />
        ) : null}

        <section className='spotify-grid'>
          <MusicSection
            music={music}
            musicLoading={musicLoading}
            hasMoreMusic={hasMoreMusic}
            onLoadMore={onLoadMoreMusic}
          />
          <AlbumsSection albums={albums} selectedAlbum={selectedAlbum} onOpenAlbum={onOpenAlbum} />
        </section>

        <footer className='player-bar'>
          <div>
            <strong>Now Playing UI</strong>
            <p className='muted'>Select any track to play directly from cards.</p>
          </div>
          <div className='player-lights'>
            <span />
            <span />
            <span />
          </div>
        </footer>
      </section>
    </main>
  )
}
