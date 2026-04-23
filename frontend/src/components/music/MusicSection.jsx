export default function MusicSection({ music, musicLoading, hasMoreMusic, onLoadMore }) {
  return (
    <section className='section-card'>
      <div className='section-head'>
        <h3>Made For You</h3>
        <span>{music.length} songs loaded</span>
      </div>

      {music.length === 0 && !musicLoading ? <p className='muted'>No tracks found.</p> : null}

      <div className='track-list'>
        {music.map((track) => (
          <article key={track._id || track.id} className='track-card'>
            <div className='track-top'>
              <div className='track-cover'>♪</div>
              <div className='track-meta'>
                <strong>{track.title}</strong>
                <span className='muted'>Artist: {track.artist?.userName || 'Unknown'}</span>
              </div>
              <span className='track-tag'>Premium</span>
            </div>

            {track.uri ? <audio controls src={track.uri} preload='none' /> : null}
          </article>
        ))}
      </div>

      {hasMoreMusic ? (
        <button type='button' onClick={onLoadMore} disabled={musicLoading} className='load-more-btn'>
          {musicLoading ? 'Loading...' : 'Load More Songs'}
        </button>
      ) : null}
    </section>
  )
}
