import { Link } from 'react-router-dom';

function AccessDeniedPage() {
  return (
    <div>
      <h2>Access Denied</h2>
      <p>You need to be logged in to access this page.</p>
      <Link to="/sign-in">Login</Link>
    </div>
  );
}

export default AccessDeniedPage;
