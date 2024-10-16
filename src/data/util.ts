'use client'
import { isServer } from '@tanstack/react-query'

export function getBaseURL() {
  if (!isServer) {
    return ''
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

export function getEigenAPIURL() {

  // return 'https://api.eigenexplorer.com'
  return 'https://api-holesky.eigenexplorer.com'
}

export function getEigenAppURL() {

  // return 'https://app.eigenlayer.xyz'
  return 'https://holesky.eigenlayer.xyz'
}