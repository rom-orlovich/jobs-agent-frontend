import DownloadButton from '@/components/Buttons/DownloadButton';
import SearchButton from '@/components/Buttons/SearchButton';
import { UseDownloadHooksProps } from '@/hooks/useDownloadController';
import { UseScannerHooksProps } from '@/hooks/useScannerController';
import React from 'react';

const searchItemButtonsStyle = {
  buttonsContainer: 'flex md:justify-end justify-between xs:gap-8',
  download: ''
};
function SearchItemButtons({
  downloadState,
  handleDownloadButton,
  handleLoadButton,
  scanner,
  hash
}: UseDownloadHooksProps & UseScannerHooksProps & { hash?: string }) {
  return (
    <div className={searchItemButtonsStyle.buttonsContainer}>
      <SearchButton
        onClick={handleLoadButton(hash)}
        disabled={downloadState.isMutating || scanner.isMutating}
        className={searchItemButtonsStyle.download}
      >
        חפש מחדש
      </SearchButton>

      <DownloadButton
        onClick={handleDownloadButton(hash)}
        disabled={downloadState.isMutating || scanner.isMutating}
        className={searchItemButtonsStyle.download}
      >
        הורדה
      </DownloadButton>
    </div>
  );
}

export default SearchItemButtons;
