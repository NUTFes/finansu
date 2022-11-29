import {
  ChakraProvider,
  Center,
  Box,
  Heading,
  Input,
  Select,
  Button,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Router from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { get } from '@api/api_methods';
import { signUp } from '@api/signUp';
import { post } from '@api/user';
import theme from '@assets/theme';
import Email from '@components/common/Email';
import LoadingButton from '@components/common/LoadingButton';
import Password from '@components/common/Password';
import PasswordConfirmation from '@components/common/PasswordConfirmation';
import { Bureau, User, SignUp } from '@type/common';

export default function SignUpView() {
  // 新規登録中フラグ
  const [isSignUpNow, setIsSignUpNow] = useState<boolean>(false);

  // 局（Bureau）をフロントで定義
  const bureaus: Bureau[] = [
    {
      id: 1,
      name: '総務局',
    },
    {
      id: 2,
      name: '渉外局',
    },
    {
      id: 3,
      name: '財務局',
    },
    {
      id: 4,
      name: '企画局',
    },
    {
      id: 5,
      name: '制作局',
    },
    {
      id: 6,
      name: '情報局',
    },
  ];

  const [postUserData, setPostUserData] = useState<User>({
    name: '',
    bureauID: 1,
    roleID: 1,
  });

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<SignUp>({
    mode: 'all',
  });

  const userDataHandler =
    (input: string) =>
    (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
      setPostUserData({ ...postUserData, [input]: e.target.value });
    };

  const postUser = async (data: SignUp) => {
    setIsSignUpNow(true);
    const getUrl: string = process.env.CSR_API_URI + '/users';
    const postUserUrl: string = process.env.CSR_API_URI + '/users';
    const signUpUrl: string = process.env.CSR_API_URI + '/mail_auth/signup';

    const getRes = await get(getUrl);
    const userID: number = getRes[getRes.length - 1].id + 1;
    await post(postUserUrl, postUserData);
    const req = await signUp(signUpUrl, data, userID);
    const res = await req.json();
    if (req.status === 200) {
      localStorage.setItem('access-token', res.access_token);
      localStorage.setItem('login', 'true');
      Router.push('/purchaseorders');
    } else {
      console.log('Error' + res.status);
      console.log(res);
      alert(
        '新規登録に失敗しました。メールアドレスもしくはパスワードがすでに登録されている可能性があります',
      );
      setIsSignUpNow(false);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <form onSubmit={handleSubmit(postUser)} noValidate>
        <Flex mt='10' />
        <Grid templateColumns='repeat(12, 1fr)' gap={4}>
          <GridItem colSpan={1} />
          <GridItem colSpan={10}>
            <Grid templateColumns='repeat(12, 1fr)' gap={4}>
              <GridItem rowSpan={1} colSpan={4}>
                <Flex color='black.600' h='100%' justify='end' align='center'>
                  <Heading as='h4' size='md' my='2'>
                    名前
                  </Heading>
                </Flex>
              </GridItem>
              <GridItem rowSpan={1} colSpan={8}>
                <Input
                  minW='100'
                  borderRadius='full'
                  borderColor='primary.1'
                  type='text'
                  value={postUserData.name}
                  onChange={userDataHandler('name')}
                />
                bureauID
              </GridItem>
              <GridItem rowSpan={1} colSpan={4}>
                <Flex color='black.600' h='100%' justify='end' align='center'>
                  <Heading as='h4' size='md' my='2'>
                    学科
                  </Heading>
                </Flex>
              </GridItem>
              <GridItem rowSpan={1} colSpan={8}>
                <Flex>
                  <Select
                    minW='100'
                    borderRadius='full'
                    borderColor='primary.1'
                    value={postUserData.bureauID}
                    onChange={userDataHandler('bureauID')}
                  >
                    {bureaus.map((bureau) => (
                      <option key={bureau.id} value={bureau.id}>
                        {bureau.name}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </GridItem>
              <GridItem rowSpan={1} colSpan={4}>
                <Flex color='black.600' h='100%' justify='end' align='top'>
                  <Heading as='h4' size='md' my='2'>
                    メールアドレス
                  </Heading>
                </Flex>
              </GridItem>
              <GridItem rowSpan={1} colSpan={8}>
                <Flex>
                  <Email errors={errors} signUpRegister={register} />
                </Flex>
              </GridItem>
              <GridItem rowSpan={1} colSpan={4}>
                <Flex color='black.600' h='100%' justify='end' align='top'>
                  <Heading as='h4' size='md' my='2'>
                    パスワード
                  </Heading>
                </Flex>
              </GridItem>
              <GridItem rowSpan={1} colSpan={8}>
                <Flex>
                  <Password errors={errors} signUpRegister={register} />
                </Flex>
              </GridItem>
              <GridItem rowSpan={1} colSpan={4}>
                <Flex color='black.600' h='100%' justify='end' align='top'>
                  <Heading as='h4' size='md' my='2'>
                    パスワード確認
                  </Heading>
                </Flex>
              </GridItem>
              <GridItem rowSpan={1} colSpan={8}>
                <Flex>
                  <PasswordConfirmation
                    errors={errors}
                    register={register}
                    password={getValues('password')}
                  />
                </Flex>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
        <Flex mt='7' />
        <Center>
          <Box p='5' mb='2'>
            {isSignUpNow ? (
              <LoadingButton loadingText='登録中' />
            ) : (
              <Button color='white' bgGradient='linear(to-br, primary.1, primary.2)' type='submit'>
                登録
              </Button>
            )}
          </Box>
        </Center>
      </form>
    </ChakraProvider>
  );
}
