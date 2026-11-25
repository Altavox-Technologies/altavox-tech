interface RateBucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, RateBucket>()
const MAX_BUCKETS = 5_000

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim().slice(0, 64)
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim().slice(0, 64)
  return 'unknown'
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now()
  if (buckets.size > MAX_BUCKETS) {
    for (const [k, v] of buckets.entries()) {
      if (v.resetAt <= now) buckets.delete(k)
    }
    if (buckets.size > MAX_BUCKETS) {
      buckets.clear()
    }
  }

  const current = buckets.get(key)
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    }
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    }
  }

  current.count += 1
  return {
    allowed: true,
    remaining: Math.max(0, limit - current.count),
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  }
}
