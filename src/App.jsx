import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import ImageUploadForm from './components/ImageUploadForm'
import TaskManager from './components/TaskManager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>User Registration</h1>
      <RegistrationForm />
      <h1>Image Upload</h1>
      <ImageUploadForm />
      <h1>User Profile</h1>
      <ProfileForm />

      <h1>Task Manager</h1>
      <TaskManager/>
    </div>
  )
}

export default App
