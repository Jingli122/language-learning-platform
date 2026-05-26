const API_BASE_URL = import.meta.env.VITE_API_URL || ''

interface ApiOptions extends RequestInit {
  token?: string
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || '请求失败')
  }

  return data
}

export default apiRequest
