import { useQuery } from '@tanstack/react-query';
import type { ObservationResponse } from '../../types';

export const createWildlifeQuery = (latitude?: number, longitude?: number) => {
  const WILDLIFE_API_URL = `https://api.inaturalist.org/v1/observations?lat=${latitude}&lng=${longitude}&radius=10&per_page=5&order=desc&order_by=created_at&has[]=photos&quality_grade=research`;

  return {
    queryKey: ['wildlifeFromCoordinates', latitude, longitude],
    queryFn: async () => {
      const response = await fetch(WILDLIFE_API_URL);
      const data: ObservationResponse = await response.json();
      return data.results;
    },
    enabled: !!latitude && !!longitude,
  };
};

export const useWildlifeFromCoordinates = (
  latitude?: number,
  longitude?: number
) => {
  const { data, error, isLoading } = useQuery({
    ...createWildlifeQuery(latitude, longitude),
  });
  return { data, error, isLoading };
};
