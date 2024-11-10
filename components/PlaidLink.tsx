import React, { useCallback, useState, useEffect } from 'react'
import { Button } from './ui/button'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions'
import { useRouter } from 'next/router'
import { StyledString } from 'next/dist/build/swc/types'
import { plaidClient} from '@/lib/plaid'

const PlaidLink = ({user, variant} : PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState('')

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user); // await laen we cant make the first function of useeffect d8re await
            setToken(data?.linkToken);
        }
        getLinkToken();
    }, [user]);

    const onSuccess = useCallback <PlaidLinkOnSuccess>(async (public_token:string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })
        router.push('/')
}, [user])

const config: PlaidLinkOptions = {
    token,
    onSuccess,
}

const { open, ready} = usePlaidLink(config);

  return (
    <>
    {variant ==='primary'?(
        <Button 
        onClick={() => open}
        disabled = {!ready}
        className='plaidlink-primary'>
            Connect Bank
        </Button>
    ): variant ==='ghost'?(
        <Button>
            Connect Bank
        </Button>
    ): (
        <Button>
            Connect Bank
        </Button>
    )
}

    </>
  )
}

export default PlaidLink
