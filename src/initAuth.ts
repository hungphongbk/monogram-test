import {init} from 'next-firebase-auth'

const initAuth = () => {
  init({
    authPageURL: '/login',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    onLoginRequestError: (err) => {
      console.error(err)
    },
    onLogoutRequestError: (err) => {
      console.error(err)
    },
    firebaseAdminInitConfig: {
      credential: (process.env.FIREBASE_ADMIN_CREDENTIAL as any),
      databaseURL: 'https://my-example-app.firebaseio.com',
    },
    // Use application default credentials (takes precedence over fireaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: true,
    firebaseClientInitConfig: {
      apiKey: "AIzaSyASuAstX4EKqZGQHJsbG90duLFNhiKWIMI",
      authDomain: "mweeter-43ccd.firebaseapp.com",
      projectId: "mweeter-43ccd",
      storageBucket: "mweeter-43ccd.appspot.com",
      messagingSenderId: "1089953711557",
      appId: "1:1089953711557:web:9aca60354309da4da6b7ac"
    },
    cookies: {
      name: 'mweeter',
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: false,
    },
    onVerifyTokenError: (err) => {
      console.error(err)
    },
    onTokenRefreshError: (err) => {
      console.error(err)
    },
  })
}

export default initAuth