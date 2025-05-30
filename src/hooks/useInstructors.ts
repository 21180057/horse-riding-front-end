import { useEffect, useState } from 'react'
import { type InstructorType } from '../types'
import { END_POINTS } from '../constants'

export default function useInstructors() {
  const [instructors, setInstructors] = useState<InstructorType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAllInstructors = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(END_POINTS.instructors)
        const instructorsData = await response.json()
        await new Promise((resolve) => setTimeout(resolve, 1111));
        setInstructors(instructorsData)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllInstructors()
  }, [])

  return {
    instructors,
    setInstructors,
    isLoading,
  }
}
