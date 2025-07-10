import React from 'react';
import Hearder from '../components/header.jsx';
import { Step } from '../components/Step.jsx';
import Description from '../components/Description.jsx';
import Testimonial from '../components/Testimonial.jsx';
import GeneratedBtn from '../components/GeneratedBtn.jsx';

export const Home = () => {
  return (
    <div>
      <Hearder />
      <Step/>
      <Description/>
      <Testimonial/>
      <GeneratedBtn/>
    </div>
  )
}
