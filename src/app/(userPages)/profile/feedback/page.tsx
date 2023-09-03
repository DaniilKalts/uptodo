'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { toast } from 'react-hot-toast';

import { AiOutlineSend } from 'react-icons/ai';

import { Button, Container, Input, Textarea } from '@/components/UI';

interface FeedbackInputs extends FieldValues {
  email: string;
  userName: string;
  message: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  userName: yup
    .string()
    .required('User Name is required')
    .min(2, 'User Name must be at least 10 characters long')
    .max(30, 'User Name must not exceed 400 characters'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters long'),
});

const Feedback = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FeedbackInputs>({
    mode: 'all',
    defaultValues: {
      email: '',
      userName: '',
      message: '',
    },
    resolver: yupResolver(schema),
  });

  const email = watch('email');
  const userName = watch('userName');
  const message = watch('message');

  const onSubmit: SubmitHandler<FieldValues> = async (_, event) => {
    event?.preventDefault();

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
    }

    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        userName,
        message,
      }),
    }).finally(() => setIsLoading(false));

    if (await response.ok) {
      toast('Your Feedback is sent', {
        icon: '✔️',
        duration: 2000,
      });

      setTimeout(() => {
        router.back();
      }, 2000);
    } else {
      toast('Your Feedback is not sent', {
        icon: '❌',
        duration: 2000,
      });
    }
  };

  return (
    <div className="pb-[140px] max-[475px]:pb-[9rem]">
      <Container>
        <div className="flex h-auto items-center justify-center max-[475px]:mt-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex w-full max-w-[525px] flex-col overflow-auto rounded-lg border p-6 dark:bg-black-light min-[475px]:p-8"
          >
            <div className="flex w-full items-center justify-between max-[525px]:mb-2">
              <h2 className="text-[26px] font-medium text-purple min-[475px]:text-3xl">
                Feedback
              </h2>
              <p className="text-5xl max-[525px]:absolute max-[525px]:right-4 max-[525px]:top-4">
                &#128640;
              </p>
            </div>
            <p className="max-w-xs text-base text-gray-dark dark:text-white-pale min-[475px]:text-lg">
              If you had any issues or you liked our product, please share with
              us!
            </p>
            <div className="mt-6 grid gap-x-6 min-[575px]:grid-cols-2">
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="user2023@gmail.com"
                register={register}
                label="Email"
                small
                errors={errors}
                errorMessage={errors.email?.message as string}
              />
              <Input
                id="userName"
                type="text"
                value={userName}
                placeholder="Ivan Ivanov"
                register={register}
                label="User Name"
                small
                errors={errors}
                errorMessage={errors.userName?.message as string}
              />
            </div>
            <Textarea
              id="message"
              value={message}
              placeholder="Leave a comment..."
              register={register}
              label="Message"
              small
              rows={6}
              errors={errors}
              errorMessage={errors.message?.message as string}
            />
            <div className="mt-2 flex flex-col items-center justify-center gap-4">
              <Button
                type="submit"
                label="Send Feedback"
                onClick={() => {}}
                outline="purple"
                iconReversed
                disabled={isLoading || !!Object.keys(errors).length}
                isLoading={isLoading}
                icon={AiOutlineSend}
              />
              <p className="text-base">We will get back to you very soon!</p>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Feedback;
