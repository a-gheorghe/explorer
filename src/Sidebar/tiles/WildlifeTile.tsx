import { useState } from 'react';
import type { WildlifeObservation } from '../../types';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Tile, TileContent, TileTitle } from '../elements';

const ObservationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
`;

const ObservationCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: #fafafa;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d1d5db;
    background: #f9fafb;
  }
`;

const ObservationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`;

const ObservationDate = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

const SpeciesName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  margin-top: 12px;
`;

const PhotoThumbnail = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ViewButton = styled.button`
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.1s ease;

  &:hover {
    background: #4f46e5;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
`;

const EmptyState = styled.div`
  color: #9ca3af;
  font-size: 0.875rem;
  text-align: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  background: #f9fafb;
`;

const CloseButton = styled.button`
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    border-color: #d1d5db;
  }

  &:focus {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
`;

const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative' as const,
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    margin: 'auto',
    maxWidth: '90vw',
    maxHeight: '90vh',
    width: 'auto',
    height: 'auto',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '24px',
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    outline: 'none',
  },
};

const getHighResolutionPhotoUrl = (url: string, size: string) => {
  return url.replace(
    /\/(square|small|medium|large|original)\.(jpg|png)$/,
    `/${size}.$2`
  );
};

export const WildlifeTile = ({
  observations,
}: {
  observations?: WildlifeObservation[];
}) => {
  console.log('rendering wildlife tile');
  const [selectedWildlifeObservation, setSelectedWildlifeObservation] =
    useState<WildlifeObservation>();

  return (
    <Tile>
      <TileTitle>Wildlife Observations</TileTitle>
      <TileContent>
        {!observations || observations.length === 0 ? (
          <EmptyState>
            No wildlife observations found for this location.
          </EmptyState>
        ) : (
          <ObservationsContainer>
            {observations.map(observation => (
              <ObservationCard key={observation.id}>
                <ObservationHeader>
                  <div>
                    <SpeciesName>
                      {observation.species_guess || 'Unknown species'}
                    </SpeciesName>
                    <ObservationDate>
                      Observed on {observation.observed_on_string}
                    </ObservationDate>
                  </div>
                  <ViewButton
                    onClick={() => setSelectedWildlifeObservation(observation)}
                    aria-label={`View photos of ${observation.species_guess}`}
                  >
                    View Photos
                  </ViewButton>
                </ObservationHeader>
                {observation.photos && observation.photos.length > 0 && (
                  <PhotoGrid>
                    {observation.photos.map((photo, index) => (
                      <PhotoThumbnail
                        key={photo.id || index}
                        src={photo.url}
                        alt={`Photo ${index + 1} of ${observation.species_guess}`}
                        onClick={() =>
                          setSelectedWildlifeObservation(observation)
                        }
                      />
                    ))}
                  </PhotoGrid>
                )}
              </ObservationCard>
            ))}
          </ObservationsContainer>
        )}
      </TileContent>
      <Modal
        isOpen={!!selectedWildlifeObservation}
        contentLabel={`Wildlife observation of ${selectedWildlifeObservation?.species_guess}`}
        onRequestClose={() => setSelectedWildlifeObservation(undefined)}
        style={modalStyles}
        ariaHideApp={false}
      >
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {selectedWildlifeObservation?.species_guess ||
                'Wildlife Observation'}
            </ModalTitle>
            <CloseButton
              onClick={() => setSelectedWildlifeObservation(undefined)}
              aria-label="Close modal"
            >
              Close
            </CloseButton>
          </ModalHeader>
          {selectedWildlifeObservation?.photos &&
            selectedWildlifeObservation.photos.length > 0 && (
              <ModalImage
                src={getHighResolutionPhotoUrl(
                  selectedWildlifeObservation.photos[0].url || '',
                  'large'
                )}
                alt={`Full photo of ${selectedWildlifeObservation.species_guess}`}
              />
            )}
          {selectedWildlifeObservation?.observed_on_string && (
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Observed on {selectedWildlifeObservation.observed_on_string}
            </div>
          )}
        </ModalContent>
      </Modal>
    </Tile>
  );
};
