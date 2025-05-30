export type InstructorType = {
  id: number
  description: string
  photoPath: string
  name: string
}

export type HorseType = {
  name: string
  description: string
  imagePaths: string[]
  id: string
  age: number
}

export type UserReservationType = {
  id: number
  name: string
  phone: string
  serviceType: string
  service: string
  comment: string
  date: string
  time: string
  email: string
  instructorName: string
  instructorId: number
  instructor: InstructorType
}

export type CampReservationType = {
  id: number
  childName: string
  childAge: number
  dates: string[]
  parentPhone: string
  parentEmail: string
  parentName: string
  comment: string
}