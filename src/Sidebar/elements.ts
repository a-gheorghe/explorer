import styled from 'styled-components';

export const SidebarContainer = styled.div`
  background: linear-gradient(to bottom, #f8f9fa, #f1f3f5);
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d0d5db;
    border-radius: 4px;

    &:hover {
      background: #9ca3af;
    }
  }
`;

export const Tile = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`;

export const TileTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TileContent = styled.div`
  font-size: 1rem;
  margin: 0;
  color: #1f2937;
  line-height: 1.6;
`;
