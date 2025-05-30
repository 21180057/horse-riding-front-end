import { useEffect, useState } from 'react'
import { type HorseType } from '../types'
import { useParams } from 'react-router-dom'
import { END_POINTS } from '../constants'

export function useHorses() {
  const { id } = useParams<{ id: string }>()
  const [horses, setHorses] = useState<HorseType[]>([])
  const [currentHorse, setCurrentHorse] = useState<HorseType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (id) return;
    const fetchHorses = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(END_POINTS.horses)
        const horseData = await response.json()
        await new Promise((resolve) => setTimeout(resolve, 1111));
        setHorses(horseData)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchHorses()
  }, [id])

  useEffect(() => {
    if (!id || +id <= 0) return

    const fetchHorseById = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(END_POINTS.horses + id)
        const horseData = await response.json()

        setCurrentHorse(horseData)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHorseById()
  }, [id])

  return {
    horses,
    currentHorse,
    isLoading,
  }
}
