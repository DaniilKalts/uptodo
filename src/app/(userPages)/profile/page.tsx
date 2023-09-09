/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import useTasksStore from '@/store/useTasksStore';
import { cn } from '@/utils/Cn';

import { SiMicrosoftexcel } from 'react-icons/si';
import { BsFillCameraFill } from 'react-icons/bs';
import ExcelJS from 'exceljs';
import { toast } from 'react-hot-toast';

import {
  FieldValues,
  Resolver,
  ResolverOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
    .max(20, 'Username must not exceed 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain alphanumeric characters and underscores',
    ),
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
  ACCOUNT_NAME = 1,
  ACCOUNT_PASSWORD = 2,
  ACCOUNT_IMAGE = 3,
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

  const [mounted, setMounted] = useState<boolean>(false);
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
        duration: 3000,
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
    console.log(process.env);

    openPicker({
      clientId: '',
      developerKey: '',
      viewId: 'DOCS',
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
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

  const [incompletedCount, setIcompletedCount] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);

  function getPriorityLabel(priority: number) {
    const priorityLabels = ['Low', 'Medium', 'High', 'Critical'];
    const index = Math.min(Math.floor(priority / 3), 3);

    return priorityLabels[index];
  }

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Your all Tasks List');
    sheet.properties.defaultRowHeight = 80;

    sheet.columns = [
      {
        header: 'Id',
        key: 'id',
        width: 10,
      },
      {
        header: 'Title',
        key: 'title',
        width: 10,
      },
      {
        header: 'Description',
        key: 'description',
        width: 10,
      },
      {
        header: 'CreatedAt',
        key: 'createdAt',
        width: 10,
      },
      {
        header: 'CompletedAt',
        key: 'completedAt',
        width: 10,
      },
      {
        header: 'Category',
        key: 'category',
        width: 10,
      },
      {
        header: 'Priority',
        key: 'priority',
        width: 10,
      },
    ];

    storeIncompletedTasks.forEach((task) => {
      sheet.addRow({
        id: task.id,
        title: task.title,
        description: task.description || 'No description',
        createdAt: new Date(task.createdAt),
        completedAt: 'Not finished yet',
        category: task.category.label,
        priority: getPriorityLabel(task.priority),
      });
    });

    storeCompletedTasks.forEach((task) => {
      sheet.addRow({
        id: task.id,
        title: task.title,
        description: task.description || 'No description',
        createdAt: new Date(task.createdAt),
        completedAt: new Date(task.completedAt),
        category: task.category.label,
        priority: getPriorityLabel(task.priority),
      });
    });

    workbook.xlsx.writeBuffer().then((excelData) => {
      const blob = new Blob([excelData], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'download.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  useEffect(() => {
    if (localStorage.getItem('accountAvatar')) {
      setAccountAvatar(localStorage.getItem('accountAvatar')!);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    setIcompletedCount(storeIncompletedTasks.length);
  }, [storeIncompletedTasks]);

  useEffect(() => {
    setCompletedCount(storeCompletedTasks.length);
  }, [storeCompletedTasks]);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setAvatarSelect('');
    }
  }, [isOpen]);

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
          {!isTackingPicture &&
            demoAccountAvatar &&
            demoAccountAvatar !== accountAvatar && (
              <>
                <Image
                  className="max-h-[340px] w-full object-cover"
                  width={250}
                  height={250}
                  src={demoAccountAvatar}
                  alt="Captured"
                />
                <footer className="my-6 flex items-center gap-6">
                  <Button
                    label="Cancel"
                    outline="gray"
                    onClick={() => {
                      setDemoAccountAvatar('');
                      startCamera();
                    }}
                  />
                  <Button
                    label="Edit"
                    filled
                    onClick={() => {
                      toast.success('The avatar has been editted');
                      setAccountAvatar(demoAccountAvatar);
                      setIsOpen(false);
                      localStorage.setItem('accountAvatar', demoAccountAvatar);
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
              startCamera();
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
        </div>
      </div>
    );

    footerContent = <></>;
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
              src={accountAvatar || '/images/home/no-avatar.jpg'}
              className="mb-4 h-24 w-24 rounded-full object-cover min-[500px]:h-32 min-[500px]:w-32"
              width={96}
              height={96}
              alt="Avatar"
            />
            <h5 className="text-xl text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
              {initialAccountName}
            </h5>
            <div className="mt-6 flex w-full max-w-[375px] items-center justify-between gap-5">
              <div className="w-2/4 rounded-md border border-gray-500 bg-gray-500 px-6 py-4 dark:border-gray-700 dark:bg-gray-700">
                <p className="text-center text-[15px] text-white-pale min-[500px]:text-lg">
                  {incompletedCount} Task left
                </p>
              </div>
              <div className="w-2/4 rounded-md border border-gray-500 bg-gray-500 px-6 py-4 dark:border-gray-700 dark:bg-gray-700">
                <p className="text-center text-[15px] text-white-pale min-[500px]:text-lg">
                  {completedCount} Task done
                </p>
              </div>
            </div>

            <div className="mt-7 flex w-full max-w-[375px] justify-center">
              {(storeIncompletedTasks.length || storeCompletedTasks.length) &&
              mounted ? (
                <Button
                  label="Export tasks to Excel File"
                  icon={SiMicrosoftexcel}
                  onClick={exportExcelFile}
                  outline="gray"
                />
              ) : (
                <Button
                  label="Export tasks to Excel File"
                  icon={SiMicrosoftexcel}
                  onClick={() => {}}
                  outline="gray"
                  disabled
                />
              )}
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
              <ProfileLink text="Support US" link="profile" svg={SupportIcon} />
              <ProfileLink text="Log out" link="login" svg={LogOutIcon} />
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
