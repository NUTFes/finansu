import { useState } from 'react';
import LoginLayout from '@components/layout/LoginLayout';
import LoginView from '@components/auth/LoginView';
import SignUpView from '@components/auth/SignUpView';
import { ChakraProvider, Center, Flex, Box, Heading, Link, Spacer } from '@chakra-ui/react';
import theme from '@assets/theme';
import { get } from '@api/api_methods';

interface Department {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  departments: Department[];
}

export async function getServerSideProps() {
  const getDepartmentsUrl: string = process.env.SSR_API_URI + '/departments';
  const departmentsRes: Department = await get(getDepartmentsUrl);
  return {
    props: {
      departments: departmentsRes,
    },
  };
}

export default function Home(props: Props) {
  let [isMember, setIsMember] = useState(true);
  const cardContent = (isMember: boolean) => {
    if (isMember) {
      return (
        <>
          <Flex justify='center' align='center' mt='1.5rem'>
            <Center>
              <Link onClick={() => setIsMember(!isMember)}>
                <Heading as='h3' size='md'>
                  Log in
                </Heading>
              </Link>
            </Center>
            <Center mx='1rem'>
              <Heading as='h4' size='md'>
                /
              </Heading>
            </Center>
            <Center gap='2rem'>
              <Link onClick={() => setIsMember(!isMember)}>Sign up</Link>
            </Center>
          </Flex>
          {/* <LoginView /> */}
        </>
      );
    } else {
      return (
        <>
          <Flex justify='center' align='center' mt='1.5rem'>
            <Center>
              <Link onClick={() => setIsMember(!isMember)}>
                <Heading as='h3' size='md'>
                  Sign up
                </Heading>
              </Link>
            </Center>
            <Center mx='1rem'>
              <Heading as='h4' size='md'>
                /
              </Heading>
            </Center>
            <Center gap='2rem'>
              <Link onClick={() => setIsMember(!isMember)}>Log in</Link>
            </Center>
          </Flex>
          <SignUpView departments={props.departments} />
        </>
      );
    }
  };
  return (
    <LoginLayout>
      <ChakraProvider theme={theme}>
        <Center>
          <Box m='2rem' px='10' boxShadow='base' rounded='lg'>
            <Box gap='gap-s'>{cardContent(isMember)}</Box>
          </Box>
        </Center>
      </ChakraProvider>
    </LoginLayout>
  );
}
