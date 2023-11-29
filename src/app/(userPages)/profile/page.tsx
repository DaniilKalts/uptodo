/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

import useTasksStore from '@/store/useTasksStore';
import { cn } from '@/utils/Cn';

import { toast } from 'react-hot-toast';

import { BsFillCameraFill } from 'react-icons/bs';

import {
  FieldValues,
  Resolver,
  ResolverOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Cropper from 'react-easy-crop';
import useDrivePicker from 'react-google-drive-picker';

import ProfileLink from '@/components/userPages/Profile/ProfileTypography';
import Modal from '@/components/UI/Modals/Modal';

import {
  SettingsIcon,
  ProfileNameIcon,
  ProfileImageIcon,
  ProfilePasswordIcon,
  AboutUsIcon,
  FaqIcon,
  FeedbackIcon,
  SupportIcon,
  LogOutIcon,
} from '@/components/userPages/Profile/Icons/Profile';
import { Container, Button, Input } from '@/components/UI';
import getCroppedImg from '@/utils/EasyCrop';
import { TaskType } from '@/types';

interface AccountChangeInputs extends FieldValues {
  accountName: string;
  accountOldPassword: string;
  accountNewPassword: string;
}

let oldPassword = 'Danya17!';

const schema = yup.object().shape({
  accountName: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must not exceed 20 characters'),
  accountOldPassword: yup
    .string()
    .required('Old password is required')
    .min(8, 'Old password must be at least 8 characters long')
    .max(20, 'Old password must not exceed 20 characters')
    .test(
      'matches-specific-string',
      'This password does not match the old one',
      (value) => value === oldPassword,
    ),
  accountNewPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters long')
    .max(20, 'New password must not exceed 20 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'New password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    ),
});

enum STEPS {
  INCOMPLETED_TASKS = 1,
  COMPLETED_TASKS = 2,
  AVATAR_EDIT = 3,
  ACCOUNT_NAME = 4,
  ACCOUNT_PASSWORD = 5,
  ACCOUNT_IMAGE = 6,
  DELETE_ACCOUNT_IMAGE = 7,
}

type TaskPropsValue =
  | null
  | string
  | number
  | Date
  | {
      bgColor: string;
      label: string;
    };

const Profile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccountChangeInputs>({
    mode: 'all',
    defaultValues: {
      accountName: 'KaltsDaniil',
      accountOldPassword: '',
      accountNewPassword: '',
    },
    resolver: yupResolver(schema) as unknown as Resolver<
      AccountChangeInputs,
      ResolverOptions<AccountChangeInputs>
    >,
  });

  const session = useSession();
  const [accountAvatar, setAccountAvatar] = useState<string>('');

  const accountName = watch('accountName');
  const accountOldPassword = watch('accountOldPassword');
  const accountNewPassword = watch('accountNewPassword');

  const [initialAccountName, setInitialAccountName] =
    useState<string>('KaltsDaniil');

  const setCustomValue = (id: string, value: TaskPropsValue) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const [step, setStep] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  let modalAlign: 'items-center' | 'items-end' = 'items-center';
  let modalTitle: string = '';
  let bodyContent = null;
  let footerContent = null;

  const onSubmit: SubmitHandler<FieldValues> = (_, event) => {
    event?.preventDefault();

    if (accountOldPassword.length && accountNewPassword.length) {
      oldPassword = accountNewPassword;

      toast('The account password is changed', {
        icon: '🔑',
        duration: 2000,
      });

      setCustomValue('accountOldPassword', '');
      setCustomValue('accountNewPassword', '');

      setStep(null);
      setIsOpen(false);
    }
  };

  const [avatarSelect, setAvatarSelect] = useState<
    '' | 'tack' | 'gallery' | 'googleDrive'
  >('');

  // Tack picture
  const videoRef = useRef(null);
  const [isTackingPicture, setIsTackingPicture] = useState<boolean>(false);
  const [demoAccountAvatar, setDemoAccountAvatar] = useState<string>('');

  // Function to start the camera and set up video feed
  const startCamera = async () => {
    if (
      isTackingPicture ||
      (demoAccountAvatar && accountAvatar !== demoAccountAvatar)
    ) {
      return;
    }

    setIsTackingPicture(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      (videoRef.current as any).srcObject = stream;
    } catch (error) {
      toast.error(`Error accessing camera: ${error}`);
    }
  };

  // Function to stop the camera
  const stopCamera = () => {
    if (!isTackingPicture) {
      return;
    }

    const stream = (videoRef.current as any).srcObject as MediaStream;

    if (stream) {
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      (videoRef.current as any).srcObject = null;
      setIsTackingPicture(false);
    }
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<number>(0);

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        demoAccountAvatar,
        croppedAreaPixels as number,
        0,
      );

      setAccountAvatar(croppedImage as string);

      toast('The avatar has been editted', {
        icon: '📸',
        duration: 2000,
      });
      setIsOpen(false);

      localStorage.setItem('accountAvatar', croppedImage as string);
      setDemoAccountAvatar('');
    } catch (e) {
      console.log(e);
    }
  }, [croppedAreaPixels]);

  // Function to take a photo
  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = (videoRef.current as any).videoWidth;
    canvas.height = (videoRef.current as any).videoHeight;
    const context = canvas.getContext('2d');

    // Flip the image horizontally
    context?.translate(canvas.width, 0);
    context?.scale(-1, 1);

    context?.drawImage(
      videoRef.current as any,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    // Convert the canvas image to a data URL
    const dataURL = canvas.toDataURL('image/png');
    setDemoAccountAvatar(dataURL as any);

    stopCamera();
  };

  // Import from gallery
  const fileRef = useRef(null);

  // Function to handle file selection
  const handleFileSelect = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDemoAccountAvatar(imageUrl);
    }
  };

  function convertDriveLink(shareableLink: string) {
    const fileIdMatch = shareableLink.match(/\/file\/d\/(.+?)\/view/);
    if (fileIdMatch && fileIdMatch.length > 1) {
      const fileId = fileIdMatch[1];

      return `https://drive.google.com/uc?id=${fileId}`;
    }
    return shareableLink;
  }

  // Import from Google Drive
  const [openPicker] = useDrivePicker();
  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      developerKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
      viewId: 'DOCS',
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      callbackFunction: (driveData) => {
        if (driveData.docs) {
          setDemoAccountAvatar(convertDriveLink(driveData.docs[0].url));
        }
      },
    });
  };

  const storeIncompletedTasks = useTasksStore(
    (state) => state.incompletedTasks,
  );
  const storeCompletedTasks = useTasksStore((state) => state.completedTasks);

  const [incompletedTasks, setIcompletedTasks] = useState<TaskType[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    if (localStorage.getItem('accountAvatar')) {
      setAccountAvatar(localStorage.getItem('accountAvatar')!);
    } else {
      setAccountAvatar(session.data?.user?.image!);
      setInitialAccountName(session.data?.user?.name!);
      setCustomValue('accountName', session.data?.user?.name!);
    }
  }, [session]);

  useEffect(() => {
    if (storeIncompletedTasks.length) {
      setIcompletedTasks(
        storeIncompletedTasks.sort(
          (taskA: TaskType, taskB: TaskType) => taskA.todayAt - taskB.todayAt,
        ),
      );
    }
  }, [storeIncompletedTasks]);

  useEffect(() => {
    if (storeCompletedTasks.length) {
      setCompletedTasks(
        storeCompletedTasks.sort(
          (taskA: TaskType, taskB: TaskType) =>
            taskA.completedAt - taskB.completedAt,
        ),
      );
    }
  }, [storeCompletedTasks]);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setAvatarSelect('');

      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  const linkRegex = /(https?:\/\/[^\s]+)/g;

  if (step === STEPS.INCOMPLETED_TASKS) {
    modalAlign = 'items-center';
    modalTitle = 'Tasks Left';

    bodyContent = (
      <div className="my-8 grid w-full gap-5 min-[575px]:grid-cols-2">
        {incompletedTasks.map((task) => (
          <div
            key={task.id}
            className="flex w-full flex-col justify-between rounded-lg border border-gray-400 border-gray-700 bg-gray-800 px-4 py-5"
          >
            <div className="mb-6">
              <h4 className="mb-3 text-lg font-bold text-purple md:text-xl">
                {task.title}
              </h4>
              <p className="break-all text-base text-gray-100 md:text-lg">
                {task.description?.split('\n')?.map((line, index) => (
                  <React.Fragment key={index}>
                    {line.split(linkRegex).map((part, i) => {
                      if (i % 2 === 1) {
                        return (
                          <a
                            key={`${index}-${i}`}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {part}
                          </a>
                        );
                      }
                      return part;
                    })}
                    {task.description && <br />}
                  </React.Fragment>
                ))}
                {!task.description && 'No description'}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-gray-100">
                <p className="text-base text-purple-light min-[500px]:text-lg">
                  {new Date(task.todayAt).toLocaleString('en-GB', {
                    month: 'long',
                  })}{' '}
                  {new Date(task.todayAt).getDate()},{' '}
                  {new Date(task.todayAt)
                    .getHours()
                    .toString()
                    .padStart(2, '0')}
                  :
                  {new Date(task.todayAt)
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}
                </p>
                <Link
                  href={`/tasks/${task.id}?previousPage=profile`}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-800 ring-purple hover:ring-2 min-[500px]:h-8 min-[500px]:w-8"
                  aria-label="edit note"
                  role="button"
                >
                  <Image
                    className="w-[80%]"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/4-by-3-multiple-styled-cards-svg1dark.svg"
                    width={96}
                    height={96}
                    alt="edit"
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    footerContent = (
      <footer className="flex items-center justify-center gap-6">
        <Button
          label="Cancel"
          onClick={() => {
            setStep(null);
            setIsOpen(false);
          }}
          small
          outline="gray"
          disabled={!!errors.accountName?.message}
        />
      </footer>
    );
  }

  if (step === STEPS.COMPLETED_TASKS) {
    modalAlign = 'items-center';
    modalTitle = 'Tasks Done';

    bodyContent = (
      <div className="my-8 grid w-full gap-5 min-[575px]:grid-cols-2">
        {completedTasks.map((task) => (
          <div
            key={task.id}
            className="flex w-full flex-col justify-between rounded-lg border border-gray-400 border-gray-700 bg-gray-800 px-4 py-5"
          >
            <div className="mb-6">
              <h4 className="mb-3 text-lg font-bold text-purple md:text-xl">
                {task.title}
              </h4>
              <p className="break-all text-base text-gray-100 md:text-lg">
                {task.description?.split('\n')?.map((line, index) => (
                  <React.Fragment key={index}>
                    {line.split(linkRegex).map((part, i) => {
                      if (i % 2 === 1) {
                        return (
                          <a
                            key={`${index}-${i}`}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {part}
                          </a>
                        );
                      }
                      return part;
                    })}
                    {task.description && <br />}
                  </React.Fragment>
                ))}
                {!task.description && 'No description'}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-gray-100">
                <p className="text-base text-purple-light min-[500px]:text-lg">
                  {new Date(task.completedAt).toLocaleString('en-GB', {
                    month: 'long',
                  })}{' '}
                  {new Date(task.completedAt).getDate()},{' '}
                  {new Date(task.completedAt)
                    .getHours()
                    .toString()
                    .padStart(2, '0')}
                  :
                  {new Date(task.completedAt)
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}
                </p>
                <Link
                  href={`/tasks/${task.id}?previousPage=profile`}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-800 ring-purple hover:ring-2 min-[500px]:h-8 min-[500px]:w-8"
                  aria-label="edit note"
                  role="button"
                >
                  <Image
                    className="w-[80%]"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/4-by-3-multiple-styled-cards-svg1dark.svg"
                    width={96}
                    height={96}
                    alt="edit"
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    footerContent = (
      <footer className="flex items-center justify-center gap-6">
        <Button
          label="Cancel"
          onClick={() => {
            setStep(null);
            setIsOpen(false);
          }}
          outline="gray"
          small
          disabled={!!errors.accountName?.message}
        />
      </footer>
    );
  }

  if (step === STEPS.AVATAR_EDIT) {
    modalAlign = 'items-center';
    modalTitle = 'Your account Image';

    bodyContent = (
      <div className="mb-6 mt-8">
        <Image
          src={accountAvatar || '/images/home/no-avatar.jpg'}
          className="mb-4 h-60 w-60 rounded-full object-cover min-[500px]:h-72 min-[500px]:w-72"
          width={96}
          height={96}
          alt="Avatar"
        />
      </div>
    );
    footerContent = (
      <footer className="flex items-center gap-6">
        <Button
          label="Cancel"
          onClick={() => {
            setStep(null);
            setIsOpen(false);
          }}
          disabled={!!errors.accountName?.message}
        />
        <Button
          label="Edit"
          onClick={() => {
            setStep(STEPS.ACCOUNT_IMAGE);
          }}
          disabled={!!errors.accountName?.message}
          filled
        />
      </footer>
    );
  }

  if (step === STEPS.ACCOUNT_NAME) {
    modalAlign = 'items-center';
    modalTitle = 'Change account name';

    bodyContent = (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 w-full max-w-sm"
      >
        <Input
          id="accountName"
          type="text"
          value={accountName}
          placeholder="Enter your Username"
          register={register}
          small
          ghost
          errors={errors}
          errorMessage={errors.accountName?.message as string}
        />
      </form>
    );
    footerContent = (
      <footer className="mt-2 flex w-full items-center justify-between min-[500px]:gap-8">
        <Button
          label="Cancel"
          onClick={() => {
            setCustomValue('accountName', initialAccountName);

            setStep(null);
            setIsOpen(false);
          }}
        />
        <Button
          type="submit"
          label="Edit"
          onClick={() => {
            if (accountName !== initialAccountName) {
              toast.success('The account name is changed');
            }

            setInitialAccountName(accountName);
            setStep(null);
            setIsOpen(false);
          }}
          disabled={!!errors.accountName?.message}
          filled
        />
      </footer>
    );
  }

  if (step === STEPS.ACCOUNT_PASSWORD) {
    modalAlign = 'items-center';
    modalTitle = 'Change account Password';

    bodyContent = (
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full max-w-sm">
        <Input
          id="accountOldPassword"
          type="password"
          value={accountOldPassword}
          placeholder="Old Password"
          register={register}
          label="Enter old password"
          small
          ghost
          errors={errors}
          errorMessage={errors.accountOldPassword?.message as string}
        />
        <Input
          id="accountNewPassword"
          type="password"
          value={accountNewPassword}
          placeholder="New password"
          register={register}
          label="Enter new password"
          small
          ghost
          errors={errors}
          errorMessage={errors.accountNewPassword?.message as string}
        />
        <footer className="mt-8 flex w-full items-center justify-between min-[500px]:gap-8">
          <Button
            label="Cancel"
            onClick={() => {
              setCustomValue('accountOldPassword', '');
              setCustomValue('accountNewPassword', '');

              setStep(null);
              setIsOpen(false);
            }}
          />
          <Button
            type="submit"
            label="Edit"
            onClick={onSubmit}
            disabled={!!Object.keys(errors).length}
            filled
          />
        </footer>
      </form>
    );
    footerContent = <></>;
  }

  if (step === STEPS.ACCOUNT_IMAGE) {
    modalAlign = 'items-end';
    modalTitle = 'Change account Image';

    bodyContent = (
      <div className="mt-4 w-full bg-gray-700 pb-6">
        <div>
          {isTackingPicture ? (
            <>
              <video
                style={{ transform: 'scaleX(-1)' }}
                ref={videoRef}
                autoPlay
              />
              <div className="mx-auto my-6 w-full max-w-xs">
                <Button
                  label="Take Photo"
                  icon={BsFillCameraFill}
                  filled
                  onClick={takePhoto}
                />
              </div>
              <hr className="mb-4 mt-5 h-[2px] w-full rounded border-0 bg-gray-light" />
            </>
          ) : null}
          {!isTackingPicture && demoAccountAvatar && (
            <>
              <div className="relative h-[280px] max-h-[340px] w-full object-cover">
                {demoAccountAvatar.includes('https://drive.google.com') ? (
                  <Image
                    className="mx-auto max-h-[275px] w-[275px] rounded-full object-cover"
                    width={250}
                    height={250}
                    src={demoAccountAvatar}
                    alt="Captured"
                  />
                ) : (
                  <Cropper
                    image={demoAccountAvatar}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    cropShape="round"
                    onCropChange={setCrop}
                    onCropComplete={(_croppedArea, croppedAreaPixels) => {
                      onCropComplete(_croppedArea, croppedAreaPixels);
                    }}
                    onZoomChange={setZoom}
                  />
                )}
              </div>
              <footer className="my-6 flex items-center gap-6">
                <Button
                  label="Cancel"
                  outline="gray"
                  onClick={() => {
                    setDemoAccountAvatar('');
                    setAvatarSelect('');
                    startCamera();
                  }}
                />
                <Button
                  label="Edit"
                  filled
                  onClick={() => {
                    if (
                      !demoAccountAvatar.includes('https://drive.google.com/')
                    ) {
                      showCroppedImage();
                    } else {
                      setAccountAvatar(demoAccountAvatar);

                      toast('The avatar has been editted', {
                        icon: '📸',
                        duration: 2000,
                      });
                      setIsOpen(false);

                      localStorage.setItem('accountAvatar', demoAccountAvatar);
                      setDemoAccountAvatar('');
                    }
                  }}
                />
              </footer>
              <hr className="mb-4 mt-5 h-[2px] w-full rounded border-0 bg-gray-light" />
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
        <div className="flex flex-col items-start">
          <div
            onClick={() => {
              setAvatarSelect('tack');
              if (isTackingPicture) {
                stopCamera();
              } else if (!isTackingPicture) {
                startCamera();
              }
            }}
            className={cn(
              'flex w-full cursor-pointer justify-start py-[14px] text-center text-lg font-light text-white-pale transition-colors hover:text-purple min-[500px]:text-xl',
              { 'text-purple': avatarSelect === 'tack' },
            )}
          >
            Tack picture
          </div>
          <div
            onClick={() => {
              setAvatarSelect('gallery');
              stopCamera();
              (fileRef.current as any).click();
            }}
            className={cn(
              'flex w-full cursor-pointer justify-start py-[14px] text-center text-lg font-light text-white-pale transition-colors hover:text-purple min-[500px]:text-xl',
              { 'text-purple': avatarSelect === 'gallery' },
            )}
          >
            Import from gallery
          </div>
          <div
            onClick={() => {
              setAvatarSelect('googleDrive');
              stopCamera();
              handleOpenPicker();
            }}
            className={cn(
              'flex w-full cursor-pointer justify-start py-[14px] text-center text-lg font-light text-white-pale transition-colors hover:text-purple min-[500px]:text-xl',
              { 'text-purple': avatarSelect === 'googleDrive' },
            )}
          >
            Import from Google Drive
          </div>
          {accountAvatar ? (
            <div
              onClick={() => {
                stopCamera();
                setStep(STEPS.DELETE_ACCOUNT_IMAGE);
              }}
              className={
                'flex w-full cursor-pointer justify-start py-[14px] text-center text-lg font-light text-red transition-colors hover:text-red-dark min-[500px]:text-xl'
              }
            >
              Delete account Image
            </div>
          ) : null}
        </div>
      </div>
    );

    footerContent = <></>;
  }

  if (step === STEPS.DELETE_ACCOUNT_IMAGE) {
    modalAlign = 'items-center';
    modalTitle = 'Delete account Image';

    bodyContent = (
      <section className="my-7 flex flex-col items-center">
        <Image
          src={accountAvatar || '/images/home/no-avatar.jpg'}
          className="mb-4 h-60 w-60 rounded-full object-cover grayscale min-[500px]:h-72 min-[500px]:w-72"
          width={96}
          height={96}
          alt="Avatar"
        />
        <h2 className="mt-3 text-center text-[18px] text-white-pale min-[500px]:px-4 min-[500px]:text-[20px]">
          Are you sure you want to delete your account Image?
        </h2>
      </section>
    );

    footerContent = (
      <footer className="flex w-full items-center justify-between min-[500px]:gap-8">
        <Button label="Cancel" onClick={() => setStep(STEPS.ACCOUNT_IMAGE)} />
        <Button
          label="Delete"
          onClick={() => {
            localStorage.setItem('accountAvatar', '');
            setAccountAvatar('');
            setDemoAccountAvatar('');
            setIsOpen(false);

            toast('The account image is deleted', {
              icon: '🗑️',
              duration: 2000,
            });
          }}
          filled
        />
      </footer>
    );
  }

  return (
    <div className="pb-36 md:pb-40">
      <Container>
        <div className="mx-auto mt-8 flex flex-col items-center justify-center">
          <header className="flex w-full flex-col items-center justify-center">
            <h6 className="mb-4 text-xl text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
              Profile
            </h6>
            <Image
              onClick={() => {
                setStep(STEPS.AVATAR_EDIT);
                setIsOpen(true);
              }}
              src={accountAvatar || '/images/home/no-avatar.jpg'}
              className="mb-4 h-[104px] w-[104px] cursor-pointer rounded-full object-cover hover:opacity-90 min-[500px]:h-32 min-[500px]:w-32"
              width={96}
              height={96}
              alt="Avatar"
            />
            <h5 className="text-xl text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
              {initialAccountName}
            </h5>
            <div className="mt-6 flex w-full max-w-[375px] items-center justify-between gap-5">
              <div
                onClick={() => {
                  if (incompletedTasks.length) {
                    setStep(STEPS.INCOMPLETED_TASKS);
                    setIsOpen(true);
                  }
                }}
                className={cn(
                  'w-2/4 rounded-md border border-gray-500 bg-gray-500 px-5 py-4 transition-colors dark:border-gray-700 dark:bg-gray-700 min-[500px]:px-6',
                  {
                    'cursor-pointer hover:bg-gray-light dark:hover:bg-gray-600':
                      incompletedTasks.length,
                    'cursor-no-drop': !incompletedTasks.length,
                  },
                )}
              >
                <p className="text-center text-[15px] text-white-pale min-[500px]:text-lg">
                  {incompletedTasks.length} Tasks Left
                </p>
              </div>
              <div
                onClick={() => {
                  if (completedTasks.length) {
                    setStep(STEPS.COMPLETED_TASKS);
                    setIsOpen(true);
                  }
                }}
                className={cn(
                  'w-2/4 rounded-md border border-gray-500 bg-gray-500 px-5 py-4 transition-colors dark:border-gray-700 dark:bg-gray-700 min-[500px]:px-6',
                  {
                    'cursor-pointer hover:bg-gray-light dark:hover:bg-gray-600':
                      completedTasks.length,
                    'cursor-no-drop': !completedTasks.length,
                  },
                )}
              >
                <p className="text-center text-[15px] text-white-pale min-[500px]:text-lg">
                  {completedTasks.length} Tasks Done
                </p>
              </div>
            </div>
          </header>
          <main className="mt-4 flex w-full max-w-lg flex-col justify-start">
            <section className="mt-5">
              <h5 className="text-sm text-gray-dark dark:text-gray-200 min-[500px]:text-lg">
                Settings
              </h5>
              <ProfileLink
                text="App Settings"
                link="profile/settings"
                svg={SettingsIcon}
              />
            </section>
            <section className="mt-5">
              <h5 className="text-sm text-gray-dark dark:text-gray-200 min-[500px]:text-lg">
                Account
              </h5>
              <ProfileLink
                text="Change account name"
                onClick={() => {
                  setStep(STEPS.ACCOUNT_NAME);
                  setIsOpen(true);
                }}
                svg={ProfileNameIcon}
              />
              <ProfileLink
                text="Change account password"
                onClick={() => {
                  setStep(STEPS.ACCOUNT_PASSWORD);
                  setIsOpen(true);
                }}
                svg={ProfilePasswordIcon}
              />
              <ProfileLink
                text="Change account Image"
                onClick={() => {
                  setStep(STEPS.ACCOUNT_IMAGE);
                  setIsOpen(true);
                }}
                svg={ProfileImageIcon}
              />
            </section>
            <section className="mt-5">
              <h5 className="text-sm text-gray-dark dark:text-gray-200 min-[500px]:text-lg">
                Uptodo
              </h5>
              <ProfileLink
                text="About US"
                link="profile/about"
                svg={AboutUsIcon}
              />
              <ProfileLink text="FAQ" link="profile/faq" svg={FaqIcon} />
              <ProfileLink
                text="Help & Feedback"
                link="profile/feedback"
                svg={FeedbackIcon}
              />
              <ProfileLink
                text="Support US"
                link="profile/support-us"
                svg={SupportIcon}
              />
              <div
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="group flex cursor-pointer items-center gap-3 py-3"
              >
                {LogOutIcon}
                <p className="text-base text-red group-hover:text-red-dark min-[500px]:text-lg">
                  Log out
                </p>
              </div>
            </section>
          </main>
        </div>
        <Modal
          title={modalTitle}
          isOpen={isOpen}
          noPaddingX={modalTitle === 'Change account Image'}
          body={bodyContent}
          footer={footerContent}
          outsideClose={modalTitle === 'Change account Image'}
          onClose={() => setIsOpen(false)}
          modalAlign={modalAlign}
          bgType="dark"
          motionConfig={null}
        />
      </Container>
    </div>
  );
};

export default Profile;
