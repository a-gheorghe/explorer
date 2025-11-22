import type { SelectedLocation } from '../../types';

export const CoordinatesTile = ({
  selectedLocation,
}: {
  selectedLocation: SelectedLocation | undefined;
}) => {
  return (
    <div>
      Coordinates: {selectedLocation?.latitude}, {selectedLocation?.longitude}
    </div>
  );
};
