import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.get('/api/notifications'),
  })
}

export const useDeviceNotifications = (deviceId: string) => {
  return useQuery({
    queryKey: ['notifications', deviceId],
    queryFn: () => api.get(`/api/notifications/device/${deviceId}`),
    enabled: !!deviceId,
  })
}

export const useMarkAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (notificationId: string) => 
      api.patch(`/api/notifications/${notificationId}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => api.patch('/api/notifications/read-all'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}
