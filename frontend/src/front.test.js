import React, { useState, useEffect } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';

// --- Mock Components ---
// In a real project, you would import your actual components.
// These are simplified versions for testing purposes.

const Home = () => <h1>Welcome to the App</h1>;
const NotFound = () => <h1>404 - Page Not Found</h1>;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This simulates a fetch call
        const fetchUsers = async () => {
            try {
                // In a real app, you'd fetch from your API
                const mockUsers = [{ _id: '1', username: 'testuser' }];
                await new Promise(resolve => setTimeout(resolve, 100)); // simulate network delay
                setUsers(mockUsers);
            } catch (e) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ul>
            {users.map(user => <li key={user._id}>{user.username}</li>)}
        </ul>
    );
};


const App = () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/users">Users</Link>
    </nav>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </div>
);


// --- Tests ---

describe('Frontend React Tests (10)', () => {
  // Test 1: App component renders the main welcome message on the home route.
  test('renders the main welcome message', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByText(/Welcome to the App/i)).toBeInTheDocument();
  });

  // Test 2: App component has a navigation link to the Login page.
  test('has a link to the login page', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  // Test 3: Clicking the "Login" link navigates to the login page.
  test('navigates to the login page when link is clicked', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.click(screen.getByRole('link', { name: /login/i }));
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  // Test 4: Login page renders a username input field.
  test('login form has a username input', () => {
    render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  // Test 5: Login page renders a password input field.
  test('login form has a password input', () => {
    render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  // Test 6: User can type into the username input.
  test('allows user to type in username field', () => {
    render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');
  });

  // Test 7: User can type into the password input.
  test('allows user to type in password field', () => {
    render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  // Test 8: Users page shows a loading message initially.
  test('users page shows loading state initially', () => {
    render(<MemoryRouter initialEntries={['/users']}><App /></MemoryRouter>);
    expect(screen.getByText(/loading users.../i)).toBeInTheDocument();
  });

  // Test 9: Users page displays a list of users after fetching.
  test('users page displays users after loading', async () => {
    render(<MemoryRouter initialEntries={['/users']}><App /></MemoryRouter>);
    // Wait for the loading message to disappear and user data to be rendered
    const userItem = await screen.findByText(/testuser/i);
    expect(userItem).toBeInTheDocument();
  });

  // Test 10: Navigating to a bad route shows the "Not Found" page.
  test('shows "Not Found" for a bad route', () => {
    render(<MemoryRouter initialEntries={['/some/bad/route']}><App /></MemoryRouter>);
    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });
});