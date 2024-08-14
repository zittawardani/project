import { useEffect, useState } from 'react';
import { UserDataType } from '@/types/userDataTypes';
import { ModalEditProfile } from '@/components/ui/modals/editProfile';
import { Badge } from '@/components/ui/badge';
import Head from 'next/head';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { CheckCircleIcon, CircleUserRound, CogIcon, LoaderCircle, LockKeyholeIcon, ShoppingBasketIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import noData from '../../../../public/animations/nodata.json'
import emailVerified from '../../../../public/animations/emailVerified.json'
import Lottie from 'lottie-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Scrollbar } from '@radix-ui/react-scroll-area';

const ProfilePage = () => {
  const { data: session, status }: any = useSession()
  const [load, setLoad] = useState(false)
  const { toast } = useToast()
  const [user, setUser] = useState<UserDataType>({
    id: '',
    name: '',
    email: '',
    image: '',
    emailVerified: false,
    items: [],
    type: '',
    orders: []
  })

  const getDataUser = async () => {
    setLoad(true)
    if (session?.user) {
      try {
        const resp = await axios(`/api/user/get/${session?.user.id}`)
        setUser(resp.data)
        setLoad(false)
      } catch (error) {
        setLoad(true)
        toast({
          title: 'Uh Oh! 😒',
          description: 'Failed to get user data. Please check your connection or contact the developer!',
          variant: 'destructive'
        })
      }
    }
  }

  useEffect(() => {
    getDataUser()
  }, [session?.user.id])

  return (
    <>
      <Head>
        <title>DBIX | User - {user.name}</title>
      </Head>
      <Tabs className='max-w-screen-lg mx-auto pb-8' defaultValue='myProfile'>
        <ScrollArea className="w-full max-w-screen-xl lg:pb-0 pb-4 h-fit">
          <TabsList className='w-full'>
            <TabsTrigger value='myProfile' className='flex items-center gap-2'>
              <CircleUserRound size={20} />
              Profile
            </TabsTrigger>
            <TabsTrigger value='security' className='flex items-center gap-2'>
              <LockKeyholeIcon size={20} />
              Security
            </TabsTrigger>
            <TabsTrigger value='recentOrder' className='flex items-center gap-2'>
              <ShoppingBasketIcon size={20} />
              Recent Order
            </TabsTrigger>
            <TabsTrigger value='settings' className='flex items-center gap-2'>
              <CogIcon size={20} />
              Settings
            </TabsTrigger>
          </TabsList>
          <Scrollbar orientation='horizontal' />
        </ScrollArea>
        {load ? (
          <div className='w-full h-[50vh] opacity-50 flex justify-center items-center'>
            <div className='flex items-center gap-3'>
              <LoaderCircle size={28} className='animate-spin' />
              <h1 className='text-xl font-semibold'>Loading user ...</h1>
            </div>
          </div>
        ) : (
          <>
            <TabsContent value='myProfile' className='lg:mt-8 md:mt-6 mt-5'>
              <div className='flex flex-col w-full gap-5'>
                <Card className='w-full'>
                  <CardContent className='pt-3'>
                    <div className="flex-grow bg-white w-full flex flex-col gap-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <img
                            src={user.image}
                            alt="userImage"
                            className="w-20 h-20 rounded-full mr-3 object-cover border-2 border-foreground"
                          />
                          <div>
                            <h2 className="text-xl font-semibold capitalize">{user.name} </h2>
                            <p className="text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <h3 className="text-2xl font-bold mb-5">Personal Information</h3>
                        <table>
                          <tbody>
                            <tr>
                              <td className="text-gray-500 font-semibold py-2">Name</td>
                              <td className="text-gray-500 font-semibold ps-6 pe-2">:</td>
                              <td className="text-gray-500 capitalize">{user.name}</td>
                            </tr>
                            <tr>
                              <td className="text-gray-500 font-semibold py-2">Email</td>
                              <td className="text-gray-500 font-semibold ps-6 pe-2">:</td>
                              <td className="text-gray-500">{user.email}</td>
                            </tr>
                            <tr>
                              <td className="text-gray-500 font-semibold py-2">Phone</td>
                              <td className="text-gray-500 font-semibold ps-6 pe-2">:</td>
                              <td className="text-gray-500">{
                                user.phone ? user.phone : <Badge variant={'destructive'}>No data</Badge>
                              }</td>
                            </tr>
                            <tr>
                              <td className="text-gray-500 font-semibold py-2">Email Verified</td>
                              <td className="text-gray-500 font-semibold ps-6 pe-2">:</td>
                              <td className="text-gray-500">{
                                user.emailVerified ? <Badge className='flex items-center gap-1 w-fit'>Verified <CheckCircleIcon size={14} /> </Badge> : <Badge variant={'destructive'}>Not verified</Badge>
                              }</td>
                            </tr>
                            <tr>
                              <td className="text-gray-500 font-semibold py-2">Type login</td>
                              <td className="text-gray-500 font-semibold ps-6 pe-2">:</td>
                              <td className="text-gray-500 capitalize">{user.type}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </CardContent>
                </Card>
                <div className='' id='cart'>
                  <h1 className='text-2xl font-semibold mb-3'>Cart</h1>
                  <hr />
                </div>
                {user.items && user.items?.length > 0 ? (
                  <div className='grid lg:grid-cols-4 w-full md:grid-cols-2 grid-cols-1' ></div>
                ) : (
                  <div className='p-3 border rounded-xl pb-4 shadow flex flex-col gap-3'>
                    <div className="flex w-full flex-col gap-6 items-center">
                      <div className="flex flex-col gap-0 w-full items-center">
                        <Lottie animationData={noData} className='w-1/4' />
                        <h1 className="text-center text-gray-500">Unfortunately you haven't added the product to your cart. <br /> Click the add product button below to add the product to your cart.</h1>
                      </div>
                      <Link href={'/#products'}>
                        <Button size={'sm'} className="w-fit items-center">Add product</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value='security' className='lg:mt-8 md:mt-6 mt-5'>
              <div className='flex flex-col gap-3 w-full'>
                <div className='grid grid-cols-2 w-full mb-3 gap-10'>
                  <h1 className='text-xl pb-3 border-b font-semibold w-full'>Password changes</h1>
                  <h1 className='text-xl pb-3 border-b font-semibold w-full'>Email verification</h1>
                </div>
                <div className='grid grid-cols-2 w-full gap-10'>
                  <div className='w-full'>
                    <Card className=''>
                      <CardContent className='pt-3'>
                        <form className='w-full flex flex-col gap-3 items-start'>
                          <Input placeholder='your new password here...' />
                          <Input placeholder='confirm your new password here...' />
                          <Button type='submit' size={'sm'}>Confirm</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                  <div className='w-full'>
                    {user.emailVerified ? (
                      <Card className='bg-primary'>
                        <CardContent className='flex flex-col gap-2 items-center pt-3'>
                          <Lottie animationData={emailVerified} className='w-1/5' />
                          <h1 className='font-semibold text-primary-foreground'>Your email has been verified!</h1>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className=''>
                        <CardContent className='pt-3'>
                          <form className='w-full flex flex-col gap-3 items-start'>
                            <Input placeholder='Type your email here...' />
                            <Button type='submit' size={'sm'}>Confirm</Button>
                          </form>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
                <div className='grid grid-cols-2 w-full mb-3 gap-10 mt-5'>
                  <h1 className='text-xl pb-3 border-b font-semibold w-full'>Phone verification</h1>
                </div>
                <div className='grid grid-cols-2 w-full gap-10'>
                  <div className='w-full'>
                    <Card className=''>
                      <CardContent className='pt-3'>
                        <form className='w-full flex flex-col gap-3 items-start'>
                          <Input placeholder='Type your phone here...' />
                          <Button type='submit' size={'sm'}>Confirm</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>

                </div>
              </div>
            </TabsContent>
            <TabsContent value='recentOrder' className='w-full lg:mt-8 md:mt-6 mt-5'>
              <Card className='w-full pt-3'>
                <CardContent>
                  orders
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='settings' className='w-full lg:mt-8 md:mt-6 mt-5'>
              <Card className='w-full pt-3'>
                <CardContent>
                  settings
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </>
  );
};

export default ProfilePage;
