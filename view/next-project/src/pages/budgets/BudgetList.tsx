import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, ChakraProvider } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Flex,
  Spacer,
  Select,
  Icon,
  Text,
  createIcon,
} from '@chakra-ui/react';
import theme from '@assets/theme';
import { Center } from '@chakra-ui/react';
import { RiPencilFill, RiAddCircleLine } from 'react-icons/ri';
import Header from '@components/Header';

const BudgetList: NextPage = () => {
  const budgetList = [
    {
      id: 1,
      name: '教育振興会費',
      year: '2021',
      value: 1200000,
      createDate: '2021/11/12/12:00',
      updateDate: '2021/11/12/12:00',
      lastUpdatedBy: '田中日菜',
    },
    {
      id: 2,
      name: '同窓会費',
      year: '2021',
      value: 200000,
      createDate: '2021/11/12/12:00',
      updateDate: '2021/11/12/12:00',
      lastUpdatedBy: '田中日菜',
    },
    {
      id: 3,
      name: '企業協賛金',
      year: '2021',
      value: 420000,
      createDate: '2021/11/12/12:00',
      updateDate: '2021/11/12/12:00',
      lastUpdatedBy: '熊谷優希',
    },
    {
      id: 4,
      name: '裏予算',
      year: '2021',
      value: 30000,
      createDate: '2021/11/12/12:00',
      updateDate: '2021/11/12/12:00',
      lastUpdatedBy: '齋藤博起',
    },
    {
      id: 5,
      name: '教育振興会費',
      year: '2021',
      value: 3000000,
      createDate: '2021/11/12/12:00',
      updateDate: '2021/11/12/12:00',
      lastUpdatedBy: '齋藤博起',
    },
    {
      id: 6,
      name: '学内募金',
      year: '2021',
      value: 250000,
      createDate: '2021/11/12/12:00',
      updateDate: '2021/11/12/12:00',
      lastUpdatedBy: '齋藤博起',
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
                予算一覧
              </Center>
              <Select variant='flushed' w='100'>
                <option value='2021'>2021</option>
                <option value='2022'>2022</option>
              </Select>
            </Flex>
            <Flex>
              <Spacer />
              <Box>
                <Button
                  textColor='white'
                  leftIcon={<RiAddCircleLine color={'white'} />}
                  bgGradient='linear(to-br, primary.1, primary.2)'
                >
                  予算登録
                </Button>
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
                      項目
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center fontSize='sm' color='black.600'>
                      年度
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7' isNumeric>
                    <Center fontSize='sm' color='black.600'>
                      金額
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center></Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center color='black.600'>作成日時</Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center color='black.600'>更新日時</Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center color='black.600'>最終更新者</Center>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {budgetList.map((budgetItem) => (
                  <Tr key={budgetItem.id}>
                    <Td>
                      <Center color='black.300'>{budgetItem.id}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{budgetItem.name}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{budgetItem.year}</Center>
                    </Td>
                    <Td isNumeric color='black.300'>
                      {budgetItem.value}
                    </Td>
                    <Td>
                      <Center>
                        <Button
                          w='40px'
                          h='40px'
                          borderRadius='full'
                          background='linear-gradient(117.83deg, #18C4FB -42.15%, #3BDBFF 15.38%, #63DAFF 20.61%, #00C1ED 100.91%)'
                        >
                          <RiPencilFill color={'white'} />
                        </Button>
                      </Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{budgetItem.createDate}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{budgetItem.updateDate}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{budgetItem.lastUpdatedBy}</Center>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th>
                    <Center fontSize='sm' fontWeight='500' color='black.600'>
                      合計
                    </Center>
                  </Th>
                  <Th isNumeric fontSize='sm' fontWeight='500' color='black.300'>
                    2400000
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default BudgetList;
