import { keepPreviousData, useQuery } from '@tanstack/react-query';

const createCountryQuery = (latitude?: number, longitude?: number) => {
  return {
    queryKey: ['countryFromCoordinates', latitude, longitude],
    queryFn: async () => {
      const MAP_URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(MAP_URL);
      const mapData = await response.json();
      return {
        name: mapData.address.country,
        code: mapData.address.country_code,
      };
    },
    enabled: !!latitude && !!longitude,
    staleTime: 1000 * 60 * 60 * 24 * 30, // 30 days - countries don't change often
    refetchOnMount: false, // Don't refetch if we have cached data
    placeholderData: keepPreviousData, // This allows us to keep the previous data until the new one comes in. For the flag, this means that we can use memo to prevent unnecessary re-rendering
  };
};

export const useCountryFromCoordinates = (
  latitude?: number,
  longitude?: number
) => {
  const { error, data, isLoading } = useQuery(
    createCountryQuery(latitude, longitude)
  );
  console.log('data is', data);
  return { isLoading, error, data };
};

export const useCountryCode = (latitude?: number, longitude?: number) => {
  const { data } = useQuery({
    ...createCountryQuery(latitude, longitude),
    select: data => data.code,
  });
  return { data };
};
