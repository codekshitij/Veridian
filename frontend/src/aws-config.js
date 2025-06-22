const awsConfig = {

    Auth: {
      region: 'us-east-2',
      userPoolId: 'us-east-2_BVEis8CBh',
      userPoolWebClientId: '2rdg61hatj3r7lkaca71g8smvm',
      
      oauth: {
        domain: 'veridian-auth-domain.auth.us-east-2.amazoncognito.com',
        scope: ['email', 'openid', 'profile'],
        redirectSignIn: 'http://localhost:5173/',
        redirectSignOut: 'http://localhost:5173/',
        responseType: 'code'
      }
    }
};

export default awsConfig;
