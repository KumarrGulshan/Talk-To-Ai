import { useState } from 'react'
import ImageGenerator from './components/ImageGenerator.jsx'

import './App.css'
import ChatComponent from './components/ChatComponet.jsx';
import RecipeGenerator from './components/RecipeGenerator.jsx';

function App() {
  const [activeTab, setactiveTab] = useState('Image-Generator');
  const handleTabchange = (Tab) =>{

 setactiveTab(Tab)
  }

  return (
   <div className=' justify-center  items-center  h-screen'>
    <div className=' text-xl font-bold  p-4 flex justify-center items-center gap-4 mb-10'>
    <button className='bg-blue-800 hover:bg-blue-950 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700 text-gray-50 p-1 rounded-lg ' onClick={()=>handleTabchange ("Image-Generated")}>Image-Generator</button>
    <button className='bg-blue-800 hover:bg-blue-950 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700 text-gray-50 p-1 rounded-lg ' onClick={()=>handleTabchange ("Recipe-Generator")}>Recipe-Generator</button>
    <button className='bg-blue-800 hover:bg-blue-950 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700 text-gray-50 p-1 rounded-lg ' onClick={()=>handleTabchange ("Ask-Ai")}>Ask-Ai</button>
    </div>

    <div>
     {activeTab === "Image-Generated" &&<ImageGenerator/>}
      {activeTab === "Recipe-Generator" && <RecipeGenerator/>}
      {activeTab === "Ask-Ai" && <ChatComponent/>}
    </div>

   </div>
  )
}

export default App
