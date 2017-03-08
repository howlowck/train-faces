import React, { PropTypes } from 'react'
import styles from './HomePage.scss'
export const HomePage = ({ guests }) => (
  <div className={styles.base}>
    <h1>Get Ready to Train your Face API!!!</h1>
    <h2>How to use this:</h2>
    <ol>
      <li>1. Get a key from the Cognitive Service Face API</li>
      <li>2. Copy and paste the key into "FaceApiKey" in the "Configure" Section</li>
      <li>3. Go to "PersonGroup", and create a PersonGroup</li>
    </ol>
  </div>
)

HomePage.propTypes = {
  guests: PropTypes.array
}

export default HomePage
