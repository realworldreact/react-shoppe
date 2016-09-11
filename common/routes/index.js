import chartRoute from './cart';
import { signUp, logIn } from './auth';

// this is where we put our child routes
export default {
  childRoutes: [
    chartRoute,
    signUp,
    logIn
  ]
};
