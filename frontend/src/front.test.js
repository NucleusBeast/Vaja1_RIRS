// javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import Photos from './components/Photos';
import Header from './components/Header';
import AddPhoto from './components/AddPhoto';
import Login from './components/Login';
import Register from './components/Register';
import Photo from './components/Photo';
import Profile from './components/Profile';
import PhotoCard from "./components/PhotoCard";
import {MemoryRouter} from "react-router-dom"; // update this path if your Photos/ App component is elsewhere

describe('Frontend React Tests (10)', () => {
    // Test 1: App component renders the main welcome message on the home route.
    test('renders the main welcome message', () => {
        render(<Photos />);
        expect(screen.getByText(/Photos:/i)).toBeInTheDocument();
    });

    // Test 2: Check if theme toggle button is present in Header component.
    test('Header contains theme toggle button', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
        expect(toggleButton).toBeInTheDocument();
    });

    // Test 3: Check if Header contains link to homepage.
    test('Header contains link to homepage', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const homeLink = screen.getByText(/Vaja3/i);
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
    });

    // Test 4: Check if AddPhoto component renders the publish heading.
    test('AddPhoto component renders publish heading', () => {
        render(<MemoryRouter>
            <AddPhoto />
        </MemoryRouter>);
        // match the actual heading text and use role lookup for robustness
        expect(screen.getByRole('heading', { name: /Publish a photo/i })).toBeInTheDocument();

    });

    // Test 5: Check if Login component renders the login heading.
    test('Login component renders login heading', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    });

    // Test 6: Check if Register component renders the register heading.
    test('Register component renders register heading', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: /Register/i })).toBeInTheDocument();
    });

    // Test 7: Check if Profile component renders the profile heading.
    test('Profile component renders profile heading', () => {
        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );
        expect(screen.getByRole('heading', { name: /Profile/i })).toBeInTheDocument();
    });

    // Test 8: Check if Photo component renders the photo details heading.
    test('Photo component renders photo details heading', () => {
        const samplePhoto = {
            _id: '1',
            name: 'Sample Photo',
            path: 'sample.jpg'
        }
        render(
            <MemoryRouter>
                <Photo photo={samplePhoto}/>
            </MemoryRouter>
        );
        expect(screen.getByRole('img', { name: /Sample Photo/i })).toBeInTheDocument();
    });

    // Test 9: Check if photo card displays photo name.
    test('PhotoCard displays photo name', () => {
        const samplePhoto = {
            _id: '1',
            name: 'Sample Photo',
            postedBy: 'SampleUser'
        };
        render(
            <MemoryRouter>
                <PhotoCard photo={samplePhoto} />
            </MemoryRouter>
        );
        const photoName = screen.getByText(/Sample Photo/i);
        expect(photoName).toBeInTheDocument();
    });

    // Test 10: Check if Photos component fetches and displays photos.
    test('Photos component fetches and displays photos', async () => {
        render(
            <MemoryRouter>
                <Photos />
            </MemoryRouter>
        );
        const photosHeading = await screen.findByText(/Photos:/i);
        expect(photosHeading).toBeInTheDocument();
    });
});