import React from 'react'

function Hero() {

    const handleScroll = () => {
        window.scrollTo({
          top: 710, 
          behavior: 'smooth' // Optional, smooth scrolling animation
        });
      };
  return (
    <div className="hero h-full w-full" style={{backgroundImage: 'url(https://media.istockphoto.com/id/473174834/photo/wallpaper-village-in-uttarakhand.jpg?s=612x612&w=0&k=20&c=S652pdfZuIsHgsL-sHKdKizkCOixLtS18VobFAsGW4A=)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to UT Lands</h1>
            <p className="mb-5">Discover Uttarakhand's natural beauty. Your dream land awaits. Buy your slice of paradise with ease!</p>
            <button className="btn btn-primary"
            onClick={handleScroll}
            >Get Started</button>
            </div>
        </div>
    </div>
  )
}

export default Hero