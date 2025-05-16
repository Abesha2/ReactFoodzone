import React from 'react';
import { useSelector } from 'react-redux';

function UserProfile() {
    const user = useSelector((state) => state.user);

    if (!user || !user.isLoggedIn) {
        return (
            <div>
                <h2>User Profile</h2>
                <p>You are not logged in.</p>
                <Link to="/login">Log In</Link>
            </div>
        );
    }

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            {user.profilePhoto && (
                <div className="profile-photo">
                    <img
                        src={URL.createObjectURL(user.profilePhoto)} // Display local file
                        alt={`${user.firstName || 'User'} Profile`}
                        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                </div>
            )}
            <p><strong>First Name:</strong> {user.firstName || 'N/A'}</p>
            <p><strong>Last Name:</strong> {user.lastName || 'N/A'}</p>
            <p><strong>Email:</strong> {user.email || 'N/A'}</p>
            <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {user.dateOfBirth || 'N/A'}</p>
            <p><strong>Age:</strong> {user.age !== undefined ? user.age : 'N/A'}</p>
            {/* You can add more details here as needed */}
        </div>
    );
}

export default UserProfile;