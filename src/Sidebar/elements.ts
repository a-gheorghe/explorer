import styled from 'styled-components';

export const SidebarContainer = styled.div`
  background-color: pink;
  height: 100%;
  overflow-y: scroll;
`;

export const Tile = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;

  flex: 1;
`;

export const TileTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

export const TileContent = styled.div`
  font-size: 1rem;
  margin: 0;
`;
