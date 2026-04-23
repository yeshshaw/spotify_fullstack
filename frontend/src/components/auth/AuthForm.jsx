export default function AuthForm({
  mode,
  setMode,
  authData,
  setAuthData,
  loginId,
  setLoginId,
  onSubmit,
  loading
}) {
  const isRegisterMode = mode === 'register'

  return (
    <div className='auth-card'>
      <div className='tabs auth-tabs'>
        <button type='button' className={mode === 'login' ? 'tab active' : 'tab'} onClick={() => setMode('login')}>
          Login
        </button>
        <button type='button' className={isRegisterMode ? 'tab active' : 'tab'} onClick={() => setMode('register')}>
          Register
        </button>
      </div>

      <h3 className='auth-title'>{isRegisterMode ? 'Create your premium profile' : 'Welcome back'}</h3>
      <p className='auth-subtitle'>Sign in to continue streaming your catalog.</p>

      <form className='form' onSubmit={onSubmit}>
        {isRegisterMode ? (
          <>
            <label>
              Username
              <input
                required
                value={authData.userName}
                onChange={(event) => setAuthData((prev) => ({ ...prev, userName: event.target.value }))}
              />
            </label>
            <label>
              Email
              <input
                type='email'
                required
                value={authData.email}
                onChange={(event) => setAuthData((prev) => ({ ...prev, email: event.target.value }))}
              />
            </label>
          </>
        ) : (
          <label>
            Username or Email
            <input required value={loginId} onChange={(event) => setLoginId(event.target.value)} />
          </label>
        )}

        <label>
          Password
          <input
            type='password'
            required
            value={authData.password}
            onChange={(event) => setAuthData((prev) => ({ ...prev, password: event.target.value }))}
          />
        </label>

        {isRegisterMode ? (
          <label>
            Role
            <select value={authData.role} onChange={(event) => setAuthData((prev) => ({ ...prev, role: event.target.value }))}>
              <option value='user'>User</option>
              <option value='artist'>Artist</option>
            </select>
          </label>
        ) : null}

        <button className='primary-action' disabled={loading} type='submit'>
          {loading ? 'Please wait...' : isRegisterMode ? 'Create Premium Account' : 'Continue to Player'}
        </button>
      </form>
    </div>
  )
}
