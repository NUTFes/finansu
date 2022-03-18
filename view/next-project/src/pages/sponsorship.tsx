import type { NextPage } from 'next';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import EditButton from '@components/General/EditButton';
import RegistButton from '@components/General/RegistButton';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Spacer,
  Select,
  Icon,
  Text,
  createIcon,
} from '@chakra-ui/react';

import theme from '@assets/theme';
import { Center, Box } from '@chakra-ui/react';
import { RiPencilFill, RiAddCircleLine } from 'react-icons/ri';
import Header from '@components/Header';
import { getDomainLocale } from 'next/dist/shared/lib/router/router';

const sponsorship: NextPage = () => {
  const sponsorshipList = [
    {
      id: 1,
      name: '海龍',
      tel: '000-0000-0000',
      email: 'kairyu@gmail.com',
      address: '新潟県長岡市上富岡町2丁目280-1',
      representative: '長岡太郎',
      created_at: '2022/3/1',
      updated_at: '2022/3/2',
    },
  ];
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <hr />

      <Center>
        <Box m='10' px='10' boxShadow='base' rounded='lg'>
          <Box mt='10' mx='5'>
            <Flex>
              <Center mr='5' fontSize='2xl' fontWeight='100' color='black.0'>
                企業一覧
              </Center>
              <Select variant='flushed' w='100'>
                <option value='2021'>2021</option>
                <option value='2022'>2022</option>
              </Select>
            </Flex>
            <Flex>
              <Spacer />
              <Box>
                <RegistButton>
                  <RiAddCircleLine
                    size={20}
                    style={{
                      marginRight: 5,
                    }}
                  />
                  企業登録
                </RegistButton>
              </Box>
            </Flex>
          </Box>
          <Box p='5' mb='2'>
            <Table>
              <Thead>
                <Tr>
                  <Th borderBottomColor='#76E4F7'>
                    <Center fontSize='sm' color='black.600'>
                      ID
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center fontSize='sm' mr='1' color='black.600'>
                      企業名
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center fontSize='sm' color='black.600'>
                      電話番号
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7' isNumeric>
                    <Center fontSize='sm' color='black.600'>
                      メール
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center>住所</Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center color='black.600'>代表者</Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center color='black.600'></Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center color='black.600'>作成日時</Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center color='black.600'>更新日時</Center>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {sponsorshipList.map((sponsorshipItem) => (
                  <Tr key={sponsorshipItem.id}>
                    <Td>
                      <Center color='black.300'>{sponsorshipItem.id}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{sponsorshipItem.name}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{sponsorshipItem.tel}</Center>
                    </Td>
                    <Td isNumeric color='black.300'>
                      {sponsorshipItem.email}
                    </Td>
                    <Td>
                      <Center color='black.300'>{sponsorshipItem.address}</Center>
                    </Td>{' '}
                    <Td>
                      <Center color='black.300'>{sponsorshipItem.representative}</Center>
                    </Td>
                    <Td>
                      <Center>
                        <EditButton />
                      </Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{sponsorshipItem.created_at}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{sponsorshipItem.updated_at}</Center>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default sponsorship;
