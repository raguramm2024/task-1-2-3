import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="card">
      <h1>Dashboard</h1>
      <p>This page is protected and requires authentication.</p>
      {user ? (
        <div>
          <p>
            Logged in as <strong>{user.name}</strong>
          </p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading your profile...</p>
      )}
    </div>
  );
};

export default DashboardPage;
