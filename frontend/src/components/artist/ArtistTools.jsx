export default function ArtistTools({
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
    <section className='artist-studio'>
      <div className='section-head'>
        <h3>Artist Studio</h3>
        <span>Publish and organize your tracks</span>
      </div>

      <div className='studio-grid'>
        <form className='studio-form' onSubmit={onUploadSubmit}>
          <h4>Upload Track</h4>
          <label>
            Title
            <input required value={uploadTitle} onChange={(event) => setUploadTitle(event.target.value)} />
          </label>
          <label>
            Audio File
            <input
              type='file'
              accept='audio/*'
              required
              onChange={(event) => setUploadFile(event.target.files?.[0] || null)}
            />
          </label>
          <button type='submit' disabled={loading || !hasUploadFile} className='primary-action'>
            Upload
          </button>
        </form>

        <form className='studio-form' onSubmit={onCreateAlbumSubmit}>
          <h4>Create Album</h4>
          <label>
            Album Title
            <input required value={albumTitle} onChange={(event) => setAlbumTitle(event.target.value)} />
          </label>
          <label>
            Music IDs (comma separated)
            <textarea value={albumMusicIds} onChange={(event) => setAlbumMusicIds(event.target.value)} rows={4} />
          </label>
          <button type='submit' disabled={loading} className='primary-action'>
            Create Album
          </button>
        </form>
      </div>
    </section>
  )
}
