import { AssetIcon } from './AssetDetails/AssetIcon';
import { PriceDisplay } from './AssetDetails/PriceDisplay';
import { ChangeIndicator } from './AssetDetails/ChangeIndicator';
import { FundingRate } from './AssetDetails/FundingRate';
import { OpenInterest } from './AssetDetails/OpenInterest';

export const AssetInfo = () => {
  return (
    <div className='AssetInfo'>
      <AssetIcon />
      <PriceDisplay />
      <ChangeIndicator />
      <FundingRate />
      <OpenInterest />
    </div>
  );
};
