import AuthForm from '../components/auth/AuthForm'

export default function AuthPage({
  mode,
  setMode,
  authData,
  setAuthData,
  loginId,
  setLoginId,
  onSubmit,
  loading,
  message,
  error
}) {
  return (
    <main className='auth-shell'>
      <section className='auth-hero'>
        <p className='auth-badge'>Spotify Premium</p>
        <h1>Feel every beat.</h1>
        <p>
          Stream your entire catalog with a clean premium experience, personalized vibe, and smooth playback.
        </p>
      </section>

      <section className='auth-panel'>
        <AuthForm
          mode={mode}
          setMode={setMode}
          authData={authData}
          setAuthData={setAuthData}
          loginId={loginId}
          setLoginId={setLoginId}
          onSubmit={onSubmit}
          loading={loading}
        />

        {message || error ? (
          <div className='status-stack'>
            {message ? <p className='success'>{message}</p> : null}
            {error ? <p className='error'>{error}</p> : null}
          </div>
        ) : null}
      </section>
    </main>
  )
}
