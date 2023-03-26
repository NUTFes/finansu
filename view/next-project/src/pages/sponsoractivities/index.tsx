import clsx from 'clsx';
import Head from 'next/head';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { userAtom } from '@/store/atoms';
import { get } from '@api/api_methods';
import { Card, Title } from '@components/common';
import MainLayout from '@components/layout/MainLayout';
import DetailModal from '@components/sponsoractivities/DetailModal';
import OpenAddModalButton from '@components/sponsoractivities/OpenAddModalButton';
import OpenDeleteModalButton from '@components/sponsoractivities/OpenDeleteModalButton';
import OpenEditModalButton from '@components/sponsoractivities/OpenEditModalButton';
import { SponsorActivity, SponsorActivityView } from '@type/common';

interface Props {
  sponsorActivities: SponsorActivity[];
  sponsorActivitiesView: SponsorActivityView[];
}

export async function getServerSideProps() {
  const getSponsorAcvitiesUrl = process.env.SSR_API_URI + '/activities';
  const getSponsorAcvitiesViewUrl = process.env.SSR_API_URI + '/activities/details';
  const sponsorActivitiesRes = await get(getSponsorAcvitiesUrl);
  const sponsorActivitiesViewRes = await get(getSponsorAcvitiesViewUrl);
  return {
    props: {
      sponsorActivities: sponsorActivitiesRes,
      sponsorActivitiesView: sponsorActivitiesViewRes,
    },
  };
}

export default function SponsorActivities(props: Props) {
  const [user] = useRecoilState(userAtom);
  const [sponsorActivitiesID, setSponsorActivitiesID] = useState<number>(1);
  const [sponsorActivitiesItem, setSponsorActivitiesViewItem] = useState<SponsorActivityView>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = (sponsorActivitiesID: number, sponsorActivitiesItem: SponsorActivityView) => {
    setSponsorActivitiesID(sponsorActivitiesID);
    setSponsorActivitiesViewItem(sponsorActivitiesItem);
    setIsOpen(true);
  };

  const formatDate = (date: string) => {
    const datetime = date.replace('T', ' ').replace('Z', '');
    const datetime2 = datetime.substring(5, datetime.length - 3).replace('-', '/');
    return datetime2;
  };

  return (
    <MainLayout>
      <Head>
        <title>協賛活動</title>
        <meta name='viewpoinst' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Card>
        <div className='mx-5 mt-10'>
          <div className='flex'>
            <Title title={'協賛活動'} />
            <select className={'w-100'}>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
            </select>
          </div>
          <div className='flex justify-end'>
            <OpenAddModalButton>協賛活動登録</OpenAddModalButton>
          </div>
        </div>
        <div className='w-100 mb-2 p-5'>
          <table className='mb-5 w-full table-fixed border-collapse'>
            <thead>
              <tr className='border border-x-white-0 border-b-primary-1 border-t-white-0 py-3'>
                <th className='w-1/11 border-b-primary-1 pb-2'>
                  <div className='text-center text-sm text-black-600'>企業名</div>
                </th>
                <th className='w-1/11 border-b-primary-1 pb-2'>
                  <div className='text-center text-sm text-black-600'>協賛スタイル</div>
                </th>
                <th className='w-1/11 border-b-primary-1 pb-2'>
                  <div className='text-center text-sm text-black-600'>担当者名</div>
                </th>
                <th className='w-2/11 border-b-primary-1 pb-2'>
                  <div className='text-center text-sm text-black-600'>回収状況</div>
                </th>
                <th className='w-2/11 border-b-primary-1 pb-2'>
                  <div className='text-center text-sm text-black-600'>作成日時</div>
                </th>
                <th className='w-2/11 border-b-primary-1 pb-2'>
                  <div className='text-center text-sm text-black-600'>更新日時</div>
                </th>
                <th className='w-1/11 border-b-primary-1 pb-2'>
                  <div className='text-center text-sm text-black-600'></div>
                </th>
              </tr>
            </thead>
            <tbody className='border border-x-white-0 border-b-primary-1 border-t-white-0'>
              {props.sponsorActivitiesView.map((sponsorActivitiesItem, index) => (
                <tr key={sponsorActivitiesItem.sponsorActivity.id}>
                  <td
                    className={clsx(
                      'px-1',
                      index === 0 ? 'pt-4 pb-3' : 'py-3',
                      index === props.sponsorActivitiesView.length - 1
                        ? 'pb-4 pt-3'
                        : 'border-b py-3',
                    )}
                    onClick={() => {
                      onOpen(sponsorActivitiesItem.sponsorActivity.id || 0, sponsorActivitiesItem);
                    }}
                  >
                    <div className='text-center text-sm text-black-600'>
                      {sponsorActivitiesItem.sponsor.name}
                    </div>
                  </td>
                  <td
                    className={clsx(
                      'px-1',
                      index === 0 ? 'pt-4 pb-3' : 'py-3',
                      index === props.sponsorActivitiesView.length - 1
                        ? 'pb-4 pt-3'
                        : 'border-b py-3',
                    )}
                    onClick={() => {
                      onOpen(sponsorActivitiesItem.sponsorActivity.id || 0, sponsorActivitiesItem);
                    }}
                  >
                    <div className='text-center text-sm text-black-600'>
                      <p>{sponsorActivitiesItem.sponsorStyle.scale}</p>
                      <p>{sponsorActivitiesItem.sponsorStyle.isColor ? 'カラー' : 'モノクロ'}</p>
                      <p>{sponsorActivitiesItem.sponsorStyle.price} 円</p>
                    </div>
                  </td>
                  <td
                    className={clsx(
                      'px-1',
                      index === 0 ? 'pt-4 pb-3' : 'py-3',
                      index === props.sponsorActivitiesView.length - 1
                        ? 'pb-4 pt-3'
                        : 'border-b py-3',
                    )}
                    onClick={() => {
                      onOpen(sponsorActivitiesItem.sponsorActivity.id || 0, sponsorActivitiesItem);
                    }}
                  >
                    <div className='text-center text-sm text-black-600'>
                      {sponsorActivitiesItem.user.name}
                    </div>
                  </td>
                  <td
                    className={clsx(
                      'px-1',
                      index === 0 ? 'pt-4 pb-3' : 'py-3',
                      index === props.sponsorActivitiesView.length - 1
                        ? 'pb-4 pt-3'
                        : 'border-b py-3',
                    )}
                    onClick={() => {
                      onOpen(sponsorActivitiesItem.sponsorActivity.id || 0, sponsorActivitiesItem);
                    }}
                  >
                    {sponsorActivitiesItem.sponsorActivity.isDone && (
                      <div className='text-center text-sm text-black-600'>回収完了</div>
                    )}
                    {!sponsorActivitiesItem.sponsorActivity.isDone && (
                      <div className='text-center text-sm text-black-600'>未回収</div>
                    )}
                  </td>
                  <td
                    className={clsx(
                      'px-1',
                      index === 0 ? 'pt-4 pb-3' : 'py-3',
                      index === props.sponsorActivitiesView.length - 1
                        ? 'pb-4 pt-3'
                        : 'border-b py-3',
                    )}
                    onClick={() => {
                      onOpen(sponsorActivitiesItem.sponsorActivity.id || 0, sponsorActivitiesItem);
                    }}
                  >
                    <div className='text-center text-sm text-black-600'>
                      {formatDate(sponsorActivitiesItem.sponsorActivity.createdAt)}
                    </div>
                  </td>
                  <td
                    className={clsx(
                      'px-1',
                      index === 0 ? 'pt-4 pb-3' : 'py-3',
                      index === props.sponsorActivitiesView.length - 1
                        ? 'pb-4 pt-3'
                        : 'border-b py-3',
                    )}
                    onClick={() => {
                      onOpen(sponsorActivitiesItem.sponsorActivity.id || 0, sponsorActivitiesItem);
                    }}
                  >
                    <div className='text-center text-sm text-black-600'>
                      {formatDate(sponsorActivitiesItem.sponsorActivity.updatedAt)}
                    </div>
                  </td>
                  <td
                    className={clsx(
                      'px-1',
                      index === 0 ? 'pt-4 pb-3' : 'py-3',
                      index === props.sponsorActivitiesView.length - 1
                        ? 'pb-4 pt-3'
                        : 'border-b py-3',
                    )}
                  >
                    <div className='flex'>
                      <div className='mx-1'>
                        <OpenEditModalButton
                          id={sponsorActivitiesItem.sponsorActivity.id || '0'}
                          sponsorActivity={sponsorActivitiesItem.sponsorActivity}
                          isDisabled={
                            user.bureauID === 2 ||
                            user.bureauID === 3 ||
                            user.bureauID === 6 ||
                            user.id === sponsorActivitiesItem.sponsorActivity.id
                          }
                        />
                      </div>
                      <div className='mx-1'>
                        <OpenDeleteModalButton
                          id={sponsorActivitiesItem.sponsorActivity.id || 0}
                          isDisabled={
                            user.bureauID === 2 ||
                            user.bureauID === 3 ||
                            user.bureauID === 6 ||
                            user.id === sponsorActivitiesItem.sponsorActivity.id
                          }
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {isOpen && sponsorActivitiesItem && (
        <DetailModal
          id={sponsorActivitiesID}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          sponsorActivitiesViewItem={sponsorActivitiesItem}
          isDelete={false}
        />
      )}
    </MainLayout>
  );
}
