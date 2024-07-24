import { Meta } from '@storybook/react';
import { OpenAddModalButton } from '@components/sponsoractivities';

const meta: Meta<typeof OpenAddModalButton> = {
  title: 'FinanSu/sponsoractivities/OpenAddModalButton',
  component: OpenAddModalButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

export const Primary = {
  args: {
    className: 'm-10',
    children: <h1>children</h1>,
  },
};
