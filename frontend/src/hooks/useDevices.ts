import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

export const useDevices = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: () => api.get('/api/devices'),
  })
}

export const useDevice = (deviceId: string) => {
  return useQuery({
    queryKey: ['device', deviceId],
    queryFn: () => api.get(`/api/devices/${deviceId}`),
    enabled: !!deviceId,
  })
}

export const useDeleteDevice = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (deviceId: string) => api.delete(`/api/devices/${deviceId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] })
    },
  })
}
