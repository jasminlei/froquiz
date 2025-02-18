import React, { useState, useEffect } from 'react'

const frogComments = [
  'Ribbit and weep, darling. These scores aren’t for amateurs.',
  'Try harder, sweetie. Even my tadpoles score higher.',
  'Hop along, rookie. This leaderboard is for legends.',
  'You call that a high score? That’s cute.',
  'Some of us were just born to win. Others… well, there’s always next time.',
  'Your best effort? Bless your heart.',
  'Keep practicing, hun. Maybe one day you’ll croak up to my level.',
  'I don’t compete, I dominate. Learn the difference.',
  'It’s lonely at the top, but someone’s gotta be here.',
]

function ProfileFrogComment() {
  const [comment, setComment] = useState('')

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * frogComments.length)
    setComment(frogComments[randomIndex])
  }, [])

  return comment
}

export default ProfileFrogComment
