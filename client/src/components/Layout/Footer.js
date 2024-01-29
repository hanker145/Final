import React from 'react'
import { Link } from 'react-router-dom'
import About from './../../pages/About';
import Contact from './../../pages/Contact';
import Policy from './../../pages/Policy';

const Footer = () => {
  return (
    <div className="footer">
      <h4 className='text-center'>All Right Reserved &copy; GiauP</h4>
      <p className='text-center mt-3'>
        <Link to="/about">About</Link>
        |
        <Link to="/contact">Contact</Link>
        |
        <Link to="/policy">Policy</Link>
      </p>
    </div>
  )
}

export default Footer
