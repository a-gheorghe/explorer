import { useState } from 'react';
import type { SelectedLocation, WildlifeObservation } from '../../types';
import { useWildlifeFromCoordinates } from './useWildlifeFromCoordinates';
import Modal from 'react-modal';

const getHighResolutionPhotoUrl = (url: string, size: string) => {
  return url.replace(
    /\/(square|small|medium|large|original)\.(jpg|png)$/,
    `/${size}.$2`
  );
};

export const WildlifeTile = ({
  selectedLocation,
}: {
  selectedLocation: SelectedLocation | undefined;
}) => {
  const { data: wildlifeObservations } = useWildlifeFromCoordinates(
    selectedLocation?.latitude,
    selectedLocation?.longitude
  );
  const [selectedWildlifeObservation, setSelectedWildlifeObservation] =
    useState<WildlifeObservation>();
  return (
    <>
      <div>Wildlife</div>
      {wildlifeObservations && (
        <div>
          {/* TODO: Show this is a nicer way (indicate their are multiple photos per observation, list observations in a more appealing way) */}
          {wildlifeObservations.map(observation => (
            <div key={observation.id}>
              {/* TODO make this button nicer, use a pointer cursor, hover effect */}
              <button
                onClick={() => setSelectedWildlifeObservation(observation)}
              >
                <img
                  src={observation.photos[0].url}
                  alt={`Thumbnail photo of ${observation.species_guess}`}
                />
              </button>
            </div>
          ))}
        </div>
      )}
      <Modal
        isOpen={!!selectedWildlifeObservation}
        contentLabel={`Wildlife observation of ${selectedWildlifeObservation?.species_guess}`}
        onRequestClose={() => setSelectedWildlifeObservation(undefined)}
        // TODO bring these into a styled component
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90%',
            maxHeight: '90%',
          },
        }}
      >
        <div>{selectedWildlifeObservation?.species_guess}</div>
        <div>
          <img
            // TODO handle empty string
            // TODO show all photos associated with an observation
            // TODO handle loading state of photo better (text loads and then photo after a while)
            src={getHighResolutionPhotoUrl(
              selectedWildlifeObservation?.photos[0].url || '',
              'medium'
            )}
            alt={`Full photo of ${selectedWildlifeObservation?.species_guess}`}
          />
        </div>
      </Modal>
    </>
  );
};
