import { Tile, TileContent, TileTitle } from '../elements';
import styled from 'styled-components';

const FlagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
`;

const StyledFlagImage = styled.img`
  width: 80px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NoDataText = styled.div`
  color: #9ca3af;
  font-style: italic;
`;

export const FlagTile = ({ countryCode }: { countryCode?: string }) => {
  console.log('rendering flag tile');
  return (
    <Tile>
      <TileTitle>Flag</TileTitle>
      <TileContent>
        {countryCode ? (
          <FlagContainer>
            <StyledFlagImage
              src={`https://flagsapi.com/${countryCode.toUpperCase()}/flat/64.png`}
              alt={`Flag of ${countryCode.toUpperCase()}`}
            />
          </FlagContainer>
        ) : (
          <NoDataText>N/A</NoDataText>
        )}
      </TileContent>
    </Tile>
  );
};
