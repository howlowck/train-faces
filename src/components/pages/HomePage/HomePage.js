/* global location */

import React, { PropTypes } from 'react'
import styles from './HomePage.scss'
import { Link } from 'react-router'
import { TwitterButton, FacebookLikeButton } from 'react-social-buttons'

const url = location.href

export const HomePage = ({ guests }) => (
  <div className={styles.base}>
    <h1>Get Ready to Train your Face API!!!</h1>
    <h2>How to use this tool:</h2>
    <ol>
      <li>1. Get a key from the Cognitive Service Face API</li>
      <li>2. Copy and paste the key into "FaceApiKey" in the <Link to='config'>Configure</Link> Section</li>
      <li>3. <Link to='person-groups/_create'>Create a PersonGroup</Link></li>
      <li>4. Go to your created group and Add a Person (like you).</li>
      <li>5. Add a Face by using the webcam</li>
      <li>6. Go to the Group Home Page, and click on "Train"</li>
      <li>7. Hit "Refresh", until the status says "Succeeded"</li>
      <li>8. Go to the <Link to='test'>Test</Link> page to test the faces you trained.</li>
    </ol>
    <br />
    <h2>Share if you like it :)</h2>
    <FacebookLikeButton url={url} />
    <TwitterButton url={url} text={'Check out this Face Trainer tool ' +
      'for the MSFT Cognitive Services Face API #microsoft'} />
  </div>
)

HomePage.propTypes = {
  guests: PropTypes.array
}

export default HomePage
