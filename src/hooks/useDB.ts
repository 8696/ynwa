import { useContext } from 'react'
import { DBContext } from '../context/DBContext'

export function useDB() {
  return useContext(DBContext)
}
