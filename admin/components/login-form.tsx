'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster, toast } from 'sonner';
import { useSignInMutation } from '@/features/api/authApiSlice';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '@/features/auth/authSlice';
import { setTimeout } from 'timers';
import { Calligraffitti } from 'next/font/google';
import Link from 'next/link';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const router = useRouter();
	const dispatch = useDispatch();
	const [signIn, { data, isError, isLoading, isSuccess, error }] = useSignInMutation()

	const [username, setUsername] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		const signInData = await signIn({ username, password }) as any;

		if (!signInData.data || signInData.error) {
			const error = signInData.error.data;

			if (error) {
				if (error?.message) {
					toast.error(error?.message)
				} else {
					toast.error('Something went wrong')
				}
			} else {
				toast.error('Something went wrong')
			}
			return;
		}

		const { accessToken, admin } = signInData?.data?.data;
		dispatch(setAuthenticated({ admin, accessToken }))
		toast.success('Sucessfully logged in')

		setTimeout(() => {
			router.push('/dashboard');
		}, 500);

	}

	return (
		<>
			<Toaster richColors />
			<div className={cn('grid gap-6', className)} {...props}>
				<form onSubmit={onSubmit}>
					<div className='grid gap-2'>
						<div className='grid gap-1'>
							<Label className='sr-only' htmlFor='username'>
								username
							</Label>
							<Input
								id='username'
								placeholder='name@example.com'
								type='username'
								autoCapitalize='none'
								autoComplete='username'
								autoCorrect='off'
								disabled={isLoading}
								required
								onChange={(e) => setUsername(e.target.value)}
							/>
							<Label className='sr-only' htmlFor='username'>
								Password
							</Label>
							<Input
								id='password'
								placeholder='********'
								type='password'
								autoCapitalize='none'
								autoComplete='password'
								autoCorrect='off'
								disabled={isLoading}
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button disabled={isLoading}>
							{isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
							Log In
						</Button>
					</div>
				</form>
			</div>

			<div className='flex flex-col space-y-2 text-center'>
				<p className='text-sm text-muted-foreground'>
					Dont remember your password?{' '}
					<Link href='/register' className='underline text-white'>
						Forget
					</Link>
				</p>
			</div>
		</>
	);
}
