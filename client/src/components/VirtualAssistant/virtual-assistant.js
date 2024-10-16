'use client'

import React, { useEffect, useState, useContext, useRef } from 'react'
import { Howl } from 'howler'
import axios from 'axios'
import { UserContext } from '../../UserContext'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function AnimatedCube() {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
      meshRef.current.rotation.y += delta
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export default function AudioPlayer() {
  const { isAuthenticated, user } = useContext(UserContext)
  const [isPlaying, setIsPlaying] = useState(false)
  const soundRef = useRef(null)

  useEffect(() => {
    const fetchPendingTasks = async () => {
      if (isAuthenticated && user) {
        try {
          console.log('Fetching pending tasks...')
          const response = await axios.get('http://localhost:3001/user/pendingTasks', {
            withCredentials: true,
            responseType: 'blob'
          })

          const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
          const audioUrl = URL.createObjectURL(audioBlob)

          if (!soundRef.current) {
            soundRef.current = new Howl({
              src: [audioUrl],
              format: ['mp3', 'ogg'],
              onplay: () => {
                setIsPlaying(true)
                console.log('Sound is playing')
              },
              onend: () => {
                setIsPlaying(false)
                console.log('Sound has ended')
              },
              onloaderror: (id, err) => {
                console.error('Error loading audio:', err)
              },
              onplayerror: (id, err) => {
                console.error('Error playing audio:', err)
              },
            })
          }

          if (!sessionStorage.getItem('audioPlayed')) {
            soundRef.current.play()
            sessionStorage.setItem('audioPlayed', 'true')
          }
        } catch (error) {
          console.error('Error fetching pending tasks:', error)
        }
      }
    }

    if (isAuthenticated && user) {
      fetchPendingTasks()
    }
  }, [isAuthenticated, user])

  return (
    <>
      {isPlaying && (
        <div className="fixed bottom-4 right-4 h-32 w-32">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedCube />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      )}
    </>
  )
}