import React, { useState, useEffect} from 'react';
import axios from 'axios';

const ProfileForm = () => {
    const [profile, setProfile] = useState({name: '', email: '', bio: '', profilePicture: null});
    const [file, setFile] = useState(null);
    useEffect(() => {
      
        axios.get('/api/profile')
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the profile!', error)
            })
    }, [])

    const handleChange = (e)=> {
        setProfile({
            ...profile, [e.target.name]: e.target.value,

        })
    }

    const handleFileChange = (e)=> {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', profile.name);
        formData.append('email', profile.email);
        formData.append('bio', profile.bio);
        if(file){
            formData.append('profilePicture', file);

        }

        axios.post('/api/profile', formData)
            .then(response => {
                console.log(response.data);

            })
            .catch(error => {
                console.error('There was error updating the profile', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
            <input type="email" name="email" value={profile.email} onChange = {handleChange} placeholder='Email' />
            <textarea name='bio' value={profile.bio} onChange={hanfleChange} placeholder='Bio' />
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Update Profile</button>
        </form>
    )
    
}

export default ProfileForm;