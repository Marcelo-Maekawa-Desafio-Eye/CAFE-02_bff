export default () => ({
//  port: parseInt(process.env.PORT, 10) || 3000,
    port: 3000,
    jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '3600s',
  });
  