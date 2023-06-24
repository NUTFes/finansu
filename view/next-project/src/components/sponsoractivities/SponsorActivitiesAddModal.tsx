import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useMemo } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { post } from '@/utils/api/api_methods';
import { MultiSelect } from '@components/common';

import {
  CloseButton,
  Modal,
  OutlinePrimaryButton,
  PrimaryButton,
  Select,
  Input,
  Textarea,
} from '@components/common';
import { BUREAUS } from '@constants/bureaus';
import { DESIGNERS, DESIGNER_VALUES } from "@constants/designers";
import { SponsorActivity, Sponsor, SponsorStyle, User } from '@type/common';

const TABLE_COLUMNS = [
  '企業名',
  '協賛スタイル',
  '担当者名',
  '回収状況',
];

const TABLE_COLUMNS2 = [
  'オプション',
  'デザイン作成',
  '移動距離(km)',
  '交通費',
];

interface Props {
  users: User[];
  sponsors: Sponsor[];
  sponsorStyles: SponsorStyle[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const REMARK_COUPON = `<クーポン> [詳細 :  ○○]\n`;
const REMARK_PAMPHLET = `<パンフレット掲載内容> [企業名 : x],[住所 : x],[HP : x],[ロゴ : x],[営業時間 : x],[電話番号 : x],[キャッチコピー : x],[地図 : x],[その他 :  ]\n`;
const REMARK_POSTER = `<ポスター掲載内容> パンフレット広告拡大\n`;

export default function SponsorActivitiesAddModal(props: Props) {
  const router = useRouter();
  const reset = () => {
    setIsDone(false);
  };

  const [isDone, setIsDone] = useState(false);
  const { users, sponsors, sponsorStyles } = props;

  const [formData, setFormData] = useState<SponsorActivity>({
    id: 0,
    sponsorID: sponsors[0].id || 0,
    userID: users[0].id || 0,
    isDone: false,
    feature: 'なし',
    design:0,
    url:"",
    expense: 0,
    remark: REMARK_PAMPHLET,
  });


  const setDesign =
  (input: string) =>
  (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const remarkOption = 
      formData.feature === 'ポスター'
      ? REMARK_POSTER
      : formData.feature === 'クーポン'
      ? REMARK_COUPON
      : '';
    const newRemarkDesign =
      e.target.value === '0'
        ? REMARK_PAMPHLET
        :"";
    setFormData({ ...formData, design: Number(e.target.value), remark: remarkOption+newRemarkDesign});
  };

  const setFeature =
  (input: string) =>
  (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newRemarkFeature =
      e.target.value === 'ポスター'
        ? REMARK_POSTER
        : e.target.value === 'クーポン'
        ? REMARK_COUPON
        : '';
    const remarkDesign =
      formData.design === 0
        ? REMARK_PAMPHLET
        :"";
    setFormData({ ...formData, [input]: e.target.value, remark: newRemarkFeature+remarkDesign});
  };

  const [selectedStyleIds, setSelectedStyleIds] = useState<number[]>([sponsorStyles[0].id || 0]);
  const [isStyleError, setIsStyleError] = useState(false);
  useEffect(() => {
    if (selectedStyleIds.length === 0) {
      setIsStyleError(true);
    } else {
      setIsStyleError(false);
    }
  }, [selectedStyleIds]);

  // 担当者を局でフィルタを適用
  const [bureauId, setBureauId] = useState<number>(1);
  const filteredUsers = useMemo(() => {
    const res = users
      .filter((user) => {
        return user.bureauID === bureauId;
      })
      .filter((user, index, self) => {
        return self.findIndex((u) => u.name === user.name) === index;
      });
    if (res.length !== 0) setFormData({ ...formData, userID: res[0].id });
    return res;
  }, [bureauId]);

  const formDataHandler =
    (input: string) =>
    (
      e:
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      setFormData({ ...formData, [input]: e.target.value });
    };

  // 協賛活動の登録と更新を行い、ページをリロード
  const submit = (data: SponsorActivity) => {
    const { expense, userID, sponsorID, ...rest } = data;
    const submitData: SponsorActivity = {
      expense: Math.round(expense * 11),
      userID: Number(userID),
      sponsorID: Number(sponsorID),
      ...rest,
    };
    addSponsorActivities(submitData);
    props.setIsOpen(false);
    router.reload();
  };

  // 協賛活動の追加
  const addSponsorActivities = async (data: SponsorActivity) => {
    const sponsorActivitiesUrl = process.env.CSR_API_URI + '/activities';
    const res = await post(sponsorActivitiesUrl, data);

    const activityStyleUrl = process.env.CSR_API_URI + '/activity_styles';
    const activityStyleData = selectedStyleIds.map((id) => {
      return { activityID: res.id, sponsorStyleID: id };
    });
    activityStyleData.map(async (data) => {
      await post(activityStyleUrl, data);
    });
  };

  const styleOotions = useMemo(() => {
    const options = sponsorStyles.map((style) => {
      return {
        value: String(style.id || 0),
        label: `${style.style} / ${style.feature} / ${style.price} 円`,
      };
    });
    return options;
  }, [sponsorStyles]);

  const isSelectSponsorBooth = useMemo(() => {
    const isBoothOnly = selectedStyleIds.length === 1;
    const isBooth = selectedStyleIds.some((id) => {
      return sponsorStyles[id - 1]?.style === '企業ブース';
    });
    return isBooth && isBoothOnly;
  }, [selectedStyleIds, sponsorStyles]);

  useEffect(() => {
    if (isSelectSponsorBooth) {
      setFormData({
        ...formData,
        feature: 'なし',
        remark: "",
      });
    }
  }, [isSelectSponsorBooth]);

  // 協賛活動の情報
  const content = (data: SponsorActivity) => (
    <div className='mx-auto my-10 grid grid-cols-5 items-center justify-items-center gap-3'>
      <p className='text-black-600'>協賛企業</p>
      <div className='col-span-4 w-full'>
        <Select value={data.sponsorID} onChange={formDataHandler('sponsorID')}>
          {sponsors &&
            sponsors.map((sponsor: Sponsor) => (
              <option key={sponsor.id} value={sponsor.id}>
                {sponsor.name}
              </option>
            ))}
          {!sponsors && <option>企業が登録されていません</option>}
        </Select>
      </div>
      <p className='text-black-600'>協賛スタイル</p>
      <div className='col-span-4 w-full'>
        <MultiSelect
          options={styleOotions}
          onChange={(value) => {
            setSelectedStyleIds(value.map((v) => Number(v.value)));
          }}
        />
      </div>
      <p className='text-black-600'>所属している局</p>
      <div className='col-span-4 w-full'>
        <Select value={bureauId} onChange={(e) => setBureauId(Number(e.target.value))}>
          {BUREAUS.map((bureaus) => (
            <option key={bureaus.id} value={bureaus.id}>
              {bureaus.name}
            </option>
          ))}
        </Select>
      </div>
      <p className='text-black-600'>担当者名</p>
      <div className='col-span-4 w-full'>
        <Select value={data.userID} onChange={formDataHandler('userID')}>
          {filteredUsers.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
      </div>
      <p className='text-black-600'>回収状況</p>
      <div className='col-span-4 w-full'>
        <Select
          value={data.isDone ? '回収済み' : '未回収'}
          onChange={(e) => {
            setFormData({ ...formData, isDone: e.target.value === '回収済み' });
          }}
        >
          <option value={'未回収'} selected>
            未回収
          </option>
          <option value={'回収済み'}>回収済み</option>
        </Select>
      </div>
      <p className='text-black-600'>オプション</p>
      <div className='col-span-4 w-full'>
        <Select
          value={data.feature}
          onChange={setFeature('feature')}
        >
          <option value={'なし'} selected>
            なし
          </option>
          <option value={'ポスター'} disabled={isSelectSponsorBooth}>
            ポスター
          </option>
          <option value={'クーポン'} disabled={isSelectSponsorBooth}>
            クーポン
          </option>
        </Select>
      </div>
      <p className='text-black-600 text-center'>広告データurl</p>
      <div className={clsx('col-span-4 grid w-full')}>
        <Input value={data.url} onChange={formDataHandler('url')} />
      </div>
      <p className='text-black-600'>デザイン作成</p>
      <div className='col-span-4 flex w-full justify-around'>
        {DESIGNER_VALUES.map((designer) => (
            <div className='flex gap-3'>
              <input
                type='radio'
                id={designer.id}
                name='design'
                value={designer.value}
                checked={data.design === designer.value}
                onChange={setDesign('design')}
              />
              <label htmlFor={designer.id}>{designer.label}</label>
            </div>
          ))}
      </div>
      <p className='text-black-600'>移動距離(km)</p>
      <div className='col-span-4 w-full'>
        <Input
          type='number'
          className='w-full'
          id={String(data.id)}
          value={data.expense}
          onChange={formDataHandler('expense')}
        />
      </div>
      <p className='text-black-600'>交通費</p>
      <div className='col-span-4 w-full'>
        <p className='w-full'>{Math.round(data.expense * 11)}円</p>
      </div>
      <p className='text-black-600'>備考</p>
      <div className='col-span-4 w-full'>
        <Textarea
          className='w-full'
          id={String(data.id)}
          value={data.remark}
          onChange={formDataHandler('remark')}
        />
      </div>
    </div>
  );

  const SponsorActivityTable = (sponsorActivities: SponsorActivity) => {
    const sponsorView = sponsors.find(
      (sponsor) => sponsor.id === Number(sponsorActivities.sponsorID),
    );

    const sponsorStyleView = sponsorStyles.filter((style) => {
      if (style.id) return selectedStyleIds.includes(style.id);
      return false;
    });
    const userView = users.find((user) => user.id === Number(sponsorActivities.userID));

    return (
      <div>
        <table className='mt-10 mb-7 w-full table-fixed border-collapse'>
          <thead>
            <tr className='border border-x-white-0 border-b-primary-1 border-t-white-0 py-3'>
              {TABLE_COLUMNS.map((tableColumn: string) => (
                <th key={tableColumn} className='border-b-primary-1 px-6 pb-2'>
                  <div className='text-center text-sm text-black-600'>{tableColumn}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='border border-x-white-0 border-b-primary-1 border-t-white-0'>
            <tr className='border border-x-white-0 border-b-primary-1 border-t-white-0'>
              <td className='py-3'>
                <p className='text-center text-sm text-black-600'>{sponsorView?.name}</p>
              </td>
              <td className='flex flex-col gap-2 py-3'>
                {sponsorStyleView.map((style) => (
                  <div key={style.id} className='text-center text-sm text-black-600'>
                    {style.style} / {style.feature} / {style.price} 円
                  </div>
                ))}
              </td>
              <td className='py-3'>
                <div className='text-center text-sm text-black-600'>{userView?.name}</div>
              </td>
              <td className='py-3'>
                <div className='text-center text-sm text-black-600'>
                  {sponsorActivities.isDone ? '回収済み' : '未回収'}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className='mb-7 w-full table-fixed border-collapse'>
          <thead>
            <tr className='border border-x-white-0 border-b-primary-1 border-t-white-0 py-3'>
              {TABLE_COLUMNS2.map((tableColumn: string) => (
                <th key={tableColumn} className='border-b-primary-1 px-6 pb-2'>
                  <div className='text-center text-sm text-black-600'>{tableColumn}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='border border-x-white-0 border-b-primary-1 border-t-white-0'>
            <tr className='border border-x-white-0 border-b-primary-1 border-t-white-0'>
              <td className='py-3'>
                <div className='text-center text-sm text-black-600'>
                  {sponsorActivities.feature}
                </div>
              </td>
              <td className='py-3'>
                <div className='text-center text-sm text-black-600'>
                  {DESIGNERS[sponsorActivities.design]}
                </div>
              </td>
              <td className='py-3'>
                <div className='text-center text-sm text-black-600'>
                  {sponsorActivities.expense}
                </div>
              </td>
              <td className='py-3'>
                <div className='text-center text-sm text-black-600'>
                  {Math.round(sponsorActivities.expense * 11)}円
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className='mb-7 w-full table-fixed border-collapse'>
          <thead>
            <tr className='border border-x-white-0 border-b-primary-1 border-t-white-0 py-3'>
              <th className='border-b-primary-1 px-6 pb-2'>
                <div className='text-center text-sm text-black-600'>広告データurl</div>
              </th>
            </tr>
          </thead>
          <tbody className='border border-x-white-0 border-b-primary-1 border-t-white-0'>
            <tr>
              <td>
                <div className='py-3 text-sm text-black-600'>
                  <p
                    className='border-primary-1 text-center'
                  >
                    {sponsorActivities.url === '' && <div>なし</div>}
                    {sponsorActivities.url}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className='mb-10 w-full table-fixed border-collapse'>
          <thead>
            <tr className='border border-x-white-0 border-b-primary-1 border-t-white-0 py-3'>
              <th className='border-b-primary-1 px-6 pb-2'>
                <div className='text-center text-sm text-black-600'>備考</div>
              </th>
            </tr>
          </thead>
          <tbody className='border border-x-white-0 border-b-primary-1 border-t-white-0'>
            <tr>
              <td>
                <div className='py-3 text-sm text-black-600'>
                  <p
                    className={clsx('border-primary-1', {
                      'text-center': sponsorActivities.remark.length < 36,
                    })}
                  >
                    {sponsorActivities.remark === '' && <div>なし</div>}
                    {sponsorActivities.remark}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Modal className='mt-64 md:mt-32 md:w-1/2'>
      <div className='w-full'>
        <div className='ml-auto w-fit'>
          <CloseButton
            onClick={() => {
              props.setIsOpen(false);
            }}
          />
        </div>
      </div>
      <div className='mx-auto mb-5 w-fit text-xl text-black-600'>協賛活動の登録</div>
      {!isDone && <>{content(formData)}</>}
      {isDone ? (
        <>
          <div className='mx-auto w-fit'>{SponsorActivityTable(formData)}</div>
          <div className='flex flex-row justify-center gap-5'>
            <OutlinePrimaryButton onClick={reset}>戻る</OutlinePrimaryButton>
            <PrimaryButton
              onClick={() => {
                submit(formData);
              }}
            >
              登録を確定する
            </PrimaryButton>
          </div>
        </>
      ) : (
        <>
          <div className='mx-auto flex w-fit flex-col items-center gap-2'>
            {isStyleError && (
              <div className='text-sm text-red-600'>協賛スタイルを選択してください</div>
            )}
            <PrimaryButton
              onClick={() => {
                setIsDone(true);
              }}
              disabled={!sponsors || isStyleError}
            >
              <p>確認へ</p>
              <RiArrowDropRightLine size={23} />
            </PrimaryButton>
          </div>
        </>
      )}
    </Modal>
  );
}
