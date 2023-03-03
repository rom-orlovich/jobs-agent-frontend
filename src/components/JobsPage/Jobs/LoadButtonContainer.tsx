import LoadButton from '@/components/Buttons/LoadButton';
import { useSWRInfiniteHook } from '@/lib/swr';
import React, { MouseEventHandler } from 'react';
const loadButtonStyle = {
  loadButtonContainer: 'flex w-full items-center justify-center',
  loadButton: 'items-center px-7 py-2 text-2xl'
};

interface LoadButtonContainerProps {
  setSize: ReturnType<typeof useSWRInfiniteHook>['setSize'];
  hasMore?: boolean;
}

function LoadButtonContainer({ setSize, hasMore }: LoadButtonContainerProps) {
  const handleLoadButtonClick: MouseEventHandler<HTMLButtonElement> = () => setSize((size) => size + 2);
  return (
    <div className={loadButtonStyle.loadButtonContainer}>
      <LoadButton
        disabled={!hasMore}
        className={loadButtonStyle.loadButton}
        onClick={handleLoadButtonClick}
      >
        טען משרות
      </LoadButton>
    </div>
  );
}

export default LoadButtonContainer;
