export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? 'sampleJWT',
  expiresIn: '1d',
};
