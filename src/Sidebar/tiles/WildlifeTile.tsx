import { useState } from 'react';
import type { SelectedLocation, WildlifeObservation } from '../../types';
import Modal from 'react-modal';
import styled from 'styled-components';

const ObservationTile = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`;

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
  console.log('rendering wildlife tile');
  const [selectedWildlifeObservation, setSelectedWildlifeObservation] =
    useState<WildlifeObservation>();
  return (
    <>
      <div>Recent wildlife sightings</div>
      {selectedLocation?.wildlifeObservations && (
        <div>
          {/* TODO: Show this is a nicer way (indicate their are multiple photos per observation, list observations in a more appealing way) */}
          {selectedLocation?.wildlifeObservations?.map(observation => (
            <ObservationTile key={observation.id}>
              {/* TODO make this button nicer, use a pointer cursor, hover effect */}
              <div> Observed on {observation.observed_on_string}</div>
              <button
                onClick={() => setSelectedWildlifeObservation(observation)}
              >
                See observation photos{' '}
              </button>
              <div>
                {observation.photos.map(photo => {
                  return (
                    <img
                      src={photo.url}
                      alt={`Thumbnail photo of ${observation.species_guess}`}
                    />
                  );
                })}
              </div>
            </ObservationTile>
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
        <button onClick={() => setSelectedWildlifeObservation(undefined)}>
          Close
        </button>
        {selectedWildlifeObservation && (
          <img
            // TODO handle empty string
            // TODO show all photos associated with an observation
            // TODO handle loading state of photo better (text loads and then photo after a while)
            src={getHighResolutionPhotoUrl(
              selectedWildlifeObservation.photos[0].url || '',
              'medium'
            )}
            alt={`Full photo of ${selectedWildlifeObservation.species_guess}`}
          />
        )}
      </Modal>
    </>
  );
};
