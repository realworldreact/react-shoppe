import cartRoute from './cart';
import { signUp, logIn } from './auth';

// this is where we put our child routes
export default {
  childRoutes: [
    cartRoute,
    signUp,
    logIn
  ]
};
