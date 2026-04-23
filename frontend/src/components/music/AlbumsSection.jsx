export default function AlbumsSection({ albums, selectedAlbum, onOpenAlbum }) {
  return (
    <section className='section-card'>
      <div className='section-head'>
        <h3>Albums</h3>
        <span>{albums.length} collections</span>
      </div>

      {albums.length === 0 ? <p className='muted'>No albums found.</p> : null}

      <div className='album-list'>
        {albums.map((album) => (
          <button key={album._id || album.id} className='album-chip' onClick={() => onOpenAlbum(album._id || album.id)}>
            <div className='album-art' />
            <div className='album-meta'>
              <strong>{album.title}</strong>
              <p className='muted'>by {album.artist?.userName || 'Unknown'}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedAlbum ? (
        <div className='album-detail'>
          <h4>{selectedAlbum.title}</h4>
          <p className='muted'>Artist: {selectedAlbum.artist?.userName || 'Unknown'}</p>
          <div className='album-track-list'>
            {(selectedAlbum.music || []).map((track) => (
              <article key={track._id || track.id} className='track-card compact'>
                <div className='track-meta'>
                  <strong>{track.title}</strong>
                </div>
                {track.uri ? <audio controls src={track.uri} preload='none' /> : null}
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
