import { Tile, TileContent, TileTitle } from '../elements';
import styled from 'styled-components';

const CountryName = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
`;

const NoDataText = styled.div`
  color: #9ca3af;
  font-style: italic;
`;

export const CountryTile = ({ countryName }: { countryName?: string }) => {
  console.log('rendering country tile');
  return (
    <Tile>
      <TileTitle>Country</TileTitle>
      <TileContent>
        {countryName ? (
          <CountryName>{countryName}</CountryName>
        ) : (
          <NoDataText>N/A</NoDataText>
        )}
      </TileContent>
    </Tile>
  );
};
