// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import ThreadDetail from '../components/ThreadDetail'

export const Route = createFileRoute('/')({
  component: ThreadDetail,
})
