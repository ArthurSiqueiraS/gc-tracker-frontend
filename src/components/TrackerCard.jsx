import { useState } from 'react'
import './TrackerCard.scss';
import { MdOutlineStarOutline, MdOutlineStar } from 'react-icons/md';
import { markChallenge } from '../services/requests'

const Stars = ({ totalStars, markedStars, onClick }) => {
  const stars = []
  const starColors = ['grey', 'red', 'orange', 'yellow']
  starColors.splice(1, 3 - totalStars)
  
  const starColor = starColors[markedStars]

  for (let i = 0; i < totalStars; i++) {
    stars.push(i < markedStars ? 
      <MdOutlineStar 
        key={i} 
        onClick={() => onClick(i)} 
        style={{ fill: starColor }}
      /> : 
      <MdOutlineStarOutline 
        key={i} 
        onClick={() => onClick(i + 1)} 
        style={{ fill: starColor }} 
      />
    )
  }

  return stars;
}

const TrackerCard = ({ challenge, useDefaultStyle }) => {
  const [localChallenge, setLocalChallenge] = useState(challenge)

  const { 
    challenge_id: challengeID,
    completion_times: completionTimes, 
    completed_times: completedTimes,
    char_id: charID,
  } = localChallenge

  const layerNames = ['hidden', 'blurred', 'desaturated']
  if (completionTimes === 2) {
    layerNames.splice(1, 1)
  }
  if (completionTimes === 1) {
    layerNames.splice(1, 2)
  } 

  const handleStarClick = (mark) => {
    markChallenge(charID, challengeID, mark).then(response => {
      setLocalChallenge(response.data)
    })
  } 

  const trackerCompleted = () => {
    return completedTimes === completionTimes
  }

  const getTrackerStyle = () => {
    if (useDefaultStyle) {
      return { margin: trackerCompleted() && '5px 10px' }
    }

    if (trackerCompleted()) {
      return {
        transition: '1.5s',
        transform: 'rotateY(270deg)', 
      }
    }

    return {}
  }

  return (
    <div 
      className={`tracker ${localChallenge.identifier} ${layerNames[completedTimes]}`}
      style={getTrackerStyle()}
    >
      <div className="stars">
        <Stars onClick={handleStarClick} totalStars={completionTimes} markedStars={completedTimes} />
      </div>
    </div>
  )
}

export default TrackerCard