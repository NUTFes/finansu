import React, { useMemo } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

interface Props {
  onClick?: () => void;
  isDisabled?: boolean;
}

const DeleteButton = (props: Props) => {
  const { onClick, isDisabled } = props;

  const buttonClass = useMemo(() => {
    if (!isDisabled) {
      return 'cursor-default opacity-25';
    } else {
      return 'cursor-pointer hover:bg-gradient-to-br hover:from-red-600 hover:to-red-500';
    }
  }, [isDisabled]);

  return (
    <button
      disabled={!isDisabled}
      className={`${buttonClass} h-6 w-6 min-w-0 rounded-full bg-gradient-to-br from-red-500 to-red-600 p-0 flex items-center justify-center`}
      onClick={onClick}
      suppressHydrationWarning
    >
      <RiDeleteBinLine size={'15px'} color={'white'} />
    </button>
  );
};

export default DeleteButton;
