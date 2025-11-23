import type { Coordinates } from '../../types';
import { Tile, TileContent, TileTitle } from '../elements';
import styled from 'styled-components';

const CoordinatesDisplay = styled.div`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9375rem;
  color: #374151;
  background: #f9fafb;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
`;

const CoordinateRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CoordinateLabel = styled.span`
  color: #6b7280;
  font-weight: 500;
  min-width: 60px;
`;

const CoordinateValue = styled.span`
  color: #1f2937;
`;

export const CoordinatesTile = ({
  coordinates,
}: {
  coordinates?: Coordinates;
}) => {
  console.log('rendering coordinates tile');
  if (!coordinates) return null;

  return (
    <Tile>
      <TileTitle>Coordinates</TileTitle>
      <TileContent>
        <CoordinatesDisplay>
          <CoordinateRow>
            <CoordinateLabel>Lat:</CoordinateLabel>
            <CoordinateValue>{coordinates.latitude.toFixed(6)}</CoordinateValue>
          </CoordinateRow>
          <CoordinateRow>
            <CoordinateLabel>Lng:</CoordinateLabel>
            <CoordinateValue>
              {coordinates.longitude.toFixed(6)}
            </CoordinateValue>
          </CoordinateRow>
        </CoordinatesDisplay>
      </TileContent>
    </Tile>
  );
};
