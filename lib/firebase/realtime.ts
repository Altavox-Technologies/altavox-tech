'use client'

import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  type Unsubscribe,
} from 'firebase/firestore'
import { getFirebaseDb } from '@/lib/firebase/client'

export type RealtimeEvent = {
  id: string
  type: string
  title: string
  body: string
  visibility: 'private' | 'public'
  actorId?: string
  createdAt: Date | null
  source?: string
  correlationId?: string
}

/**
 * Subscribe to a supported live channel. Call connectFirebaseSession()
 * first so Firestore Security Rules receive the Firebase identity.
 */
export function subscribeToRealtimeChannel(
  channelId: 'site-announcements' | 'admin-activity',
  onEvents: (events: RealtimeEvent[]) => void,
  onError?: (error: Error) => void,
  pageSize = 50,
): Unsubscribe {
  const safePageSize = Math.max(1, Math.min(pageSize, 100))
  const eventsRef = collection(getFirebaseDb(), 'realtimeChannels', channelId, 'events')
  const eventsQuery = query(eventsRef, orderBy('createdAt', 'desc'), limit(safePageSize))

  return onSnapshot(
    eventsQuery,
    (snapshot) => {
      onEvents(snapshot.docs.map((item) => {
        const data = item.data()
        const createdAt = data.createdAt?.toDate?.() ?? null

        return {
          id: item.id,
          type: String(data.type ?? ''),
          title: String(data.title ?? ''),
          body: String(data.body ?? ''),
          visibility: data.visibility === 'public' ? 'public' : 'private',
          ...(typeof data.actorId === 'string' ? { actorId: data.actorId } : {}),
          createdAt,
          ...(typeof data.source === 'string' ? { source: data.source } : {}),
          ...(typeof data.correlationId === 'string' ? { correlationId: data.correlationId } : {}),
        }
      }))
    },
    (error) => onError?.(error),
  )
}
