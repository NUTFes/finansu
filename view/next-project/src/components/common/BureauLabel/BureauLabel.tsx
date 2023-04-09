import React, { useMemo } from 'react';

import { BUREAUS_WITH_EN } from '@constants/bureaus';

import { BureauLabelProps } from './BureauLabel.type';
import Label from '../Label';

const BureauLabel: React.FC<BureauLabelProps> = (props) => {
  const { bureauName } = props;
  const bureauEn = useMemo(() => {
    const bureau = BUREAUS_WITH_EN.find((bureau) => bureau.name === bureauName);
    if (!bureau) return 'other';
    return bureau.name_en;
  }, []);

  return (
    <Label isOutline color={bureauEn}>
      {bureauName}
    </Label>
  );
};

export default BureauLabel;
