import { ReactElement } from 'react'
import Head from 'next/head'

import { AuthLayout, Login } from '@/components'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Page
