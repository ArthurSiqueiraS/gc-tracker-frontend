import { useState, useEffect } from 'react'
import './CharTracker.scss';
import Tracker from './TrackerCard'
import { fetchChars } from '../services/requests'

const CharTracker = ({ char }) => {
  const [useDefaultStyle, setUseDefaultStyle] = useState(false);
  const { challenges, splash } = char
  
  const charStyle = { backgroundImage: `url('${splash}')` }

  const handleCharClick = (event) => {
    const charAreaClicked = ['char-header', 'trackers'].includes(event.target.className)
    const hasCompletedChallenge = char.challenges.some(ch => ch.completedTimes === ch.completionTimes)
    
    if (charAreaClicked && hasCompletedChallenge) {
      setUseDefaultStyle(!useDefaultStyle)
    }
  }

  return (
    <div className="char-tracker" style={charStyle} onClick={handleCharClick}>
      <div className="char-header" />
        <div className="trackers">
          { challenges.map((challenge) => (
            <Tracker challenge={challenge} useDefaultStyle={useDefaultStyle} key={challenge.id} />
          ))}
        </div>
    </div>
  )
}

const CharTrackerList = () => {
  const [chars, setChars] = useState([])

  useEffect(() => {
    fetchChars().then(response => {
      setChars(response.data)
    })
  }, [])

  return (chars).map((char) => (
    <CharTracker char={char} key={char.id} />
  ))
}

export default CharTrackerList;