/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/utils/Cn';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { IconContext } from 'react-icons';
import * as AllMdIcons from 'react-icons/md';
import * as AllIo5Icons from 'react-icons/io5';

import Highlighter from 'react-highlight-words';

import { Button, Container, Input } from '@/components/UI';

interface NewCategoryInputs extends FieldValues {
  categoryName: string;
  categoryIconName: string;
  categoryIconBgColor: string;
  categoryIconColor: string;
}

const schema = yup.object().shape({
  categoryName: yup
    .string()
    .required('Category name is required')
    .min(3, 'Category name  must be at least 3 characters long')
    .max(10, 'Category name  must not exceed 10 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Category name  can only contain alphanumeric characters and underscores',
    ),
  categoryIconName: yup
    .string()
    .required('Category icon name name is required'),
  categoryIconBgColor: yup
    .string()
    .required('Category icon color is required')
    .test(
      'uniqueBgColor',
      'Category icon background color must be different from icon color',
      function (value) {
        const iconColor = this.parent.categoryIconColor;
        return value !== iconColor;
      },
    ),
  categoryIconColor: yup
    .string()
    .required('Category icon color is required')
    .test(
      'uniqueIconColor',
      'Category icon color must be different from background color',
      function (value) {
        const bgColor = this.parent.categoryIconBgColor;
        return value !== bgColor;
      },
    ),
});

const DEFAULT_COLORS = [
  '#fff',
  '#444',
  '#C9CC41',
  '#66CC41',
  '#41CCA7',
  '#4181CC',
  '#41A2CC',
  '#CC8441',
  '#9741CC',
  '#CC4173',
];

const CreateCategory = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewCategoryInputs>({
    mode: 'all',
    defaultValues: {
      categoryName: '',
      categoryIconName: '',
      categoryIconBgColor: '#444',
      categoryIconColor: '#fff',
    },
    resolver: yupResolver(schema) as any,
  });

  const setCustomValue = (id: string, value: string) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const categoryName = watch('categoryName');
  const categoryIconName = watch('categoryIconName');
  const categoryIconColor = watch('categoryIconColor');
  const categoryIconBgColor = watch('categoryIconBgColor');

  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const [categorySelectedIcon, setCategorySelectedIcon] = useState<any>();
  const [categorySearchIcons, setCategorySearchIcons] = useState<any[]>([]);

  // const [customColor, setCustomColor] = useState('#fff');

  const onSubmit: SubmitHandler<FieldValues> = (_, event) => {
    event?.preventDefault();

    if (
      !Object.keys(errors).length &&
      categoryName.length &&
      categoryIconName.length &&
      categoryIconBgColor.length &&
      categoryIconColor.length
    ) {
      const storedCategories = localStorage.getItem('categories') || [];
      console.log(storedCategories);

      console.log(
        JSON.stringify({
          icon: categorySelectedIcon.Icon.toString(),
          IconBgColor: categoryIconBgColor,
          IconColor: categoryIconColor,
          label: categoryName,
        }),
      );
    }
  };

  useEffect(() => {
    const searchingIcons =
      Object.entries(Object.assign(AllMdIcons, AllIo5Icons))
        .filter(
          ([iconName]) =>
            iconName
              .toLocaleLowerCase()
              .search(categoryIconName.toLowerCase()) > -1,
        )
        .slice(0, 200) || [];

    setCategorySearchIcons(searchingIcons as []);
  }, [categoryIconName]);

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-screen flex-col items-center justify-between pb-12 pt-9"
      >
        <main className="mx-auto flex w-full max-w-lg flex-col justify-start gap-2">
          <h2 className="mb-4 text-2xl font-semibold text-gray-dark dark:text-white-pale min-[500px]:text-center">
            Create new category
          </h2>
          <Input
            id="categoryName"
            type="text"
            value={categoryName}
            placeholder="Category name"
            register={register}
            label="Category name :"
            small
            errors={errors}
            errorMessage={errors.categoryName?.message as string}
          />
          <div>
            <p className="mb-2 text-base text-gray-dark dark:text-white-pale min-[500px]:text-xl">
              Category icon :
            </p>
            {categorySelectedIcon ? (
              <div
                className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg"
                style={{ backgroundColor: categoryIconBgColor }}
                onClick={() => {
                  const confirmToReplace = confirm(
                    'Are you sure, you want to replace this icon?',
                  );

                  if (confirmToReplace) {
                    setCategorySelectedIcon(null);
                    setCustomValue('categoryIconName', '');
                  }
                }}
              >
                <categorySelectedIcon.Icon
                  className="h-7 w-7 min-[500px]:h-9 min-[500px]:w-9"
                  color={categoryIconColor || '#fff'}
                />
              </div>
            ) : (
              <>
                <div
                  className="z-10 inline-flex cursor-pointer items-center justify-between rounded-lg border-2 border-gray-light bg-gray-400 px-4 py-2.5 text-center text-sm font-medium text-gray-light dark:bg-gray-500 dark:text-white-pale dark:hover:bg-gray-600 min-[500px]:text-base"
                  onClick={() => setIsSelecting((prev) => !prev)}
                >
                  Choose icon from library
                </div>
                {errors.categoryIconName?.message && (
                  <p className="mt-1 text-red max-[500px]:text-[15px]">
                    {errors.categoryIconName?.message}
                  </p>
                )}
              </>
            )}
          </div>
          {isSelecting && categorySearchIcons ? (
            <div className="flex flex-col gap-4">
              <div className="-mb-3 mt-3">
                <Input
                  id="categoryIconName"
                  type="text"
                  value={categoryIconName}
                  placeholder="Category icon name"
                  register={register}
                  small
                  errors={errors}
                  errorMessage={errors.categoryIconName?.message as string}
                />
              </div>
              <div className="grid max-h-96 grid-cols-4 gap-x-5 gap-y-4 overflow-auto min-[500px]:grid-cols-5">
                <IconContext.Provider value={{ size: '2em' }}>
                  {categorySearchIcons.map(([iconName, Icon]) => (
                    <div
                      key={iconName}
                      className="group flex cursor-pointer flex-col items-center overflow-hidden rounded-md"
                      onClick={() => {
                        setIsSelecting(false);

                        setCustomValue('categoryIconName', iconName);
                        setCategorySelectedIcon({
                          iconName,
                          Icon,
                        });
                      }}
                    >
                      <div className="flex items-center justify-center bg-gray-dark px-8 py-4 transition-colors group-hover:bg-gray-500">
                        <Icon
                          className={cn(
                            'h-7 w-7 min-[500px]:h-9 min-[500px]:w-9',
                            categoryIconColor,
                          )}
                        />
                      </div>
                      <Highlighter
                        className="pt-2 text-[.7em]"
                        searchWords={categoryIconName.split(' ')}
                        autoEscape={true}
                        textToHighlight={iconName.slice(2, iconName.length)}
                      />
                    </div>
                  ))}
                </IconContext.Provider>
              </div>
            </div>
          ) : null}
          <div className="my-4 min-[500px]:my-5">
            <p className="mb-4 text-base text-gray-dark dark:text-white-pale min-[500px]:text-xl">
              Category icon color :
            </p>
            <div className="categories-scrollbar flex gap-4 overflow-x-auto pb-3">
              {DEFAULT_COLORS.map((color: string) => (
                <div
                  key={color}
                  onClick={() => setCustomValue('categoryIconColor', color)}
                >
                  <div
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:opacity-90 min-[500px]:h-11 min-[500px]:w-11"
                    style={{ backgroundColor: color }}
                  >
                    {categoryIconColor === color ? (
                      <svg
                        className={cn(
                          'h-4 w-full',
                          categoryIconColor === '#fff'
                            ? 'text-black'
                            : 'text-white',
                        )}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            {errors.categoryIconColor?.message && (
              <p className="mt-2 text-red max-[500px]:text-[15px]">
                {errors.categoryIconColor?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <p className="mb-4 text-base text-gray-dark dark:text-white-pale min-[500px]:text-xl">
              Category icon background color :
            </p>
            <div className="categories-scrollbar flex gap-4 overflow-x-auto pb-3">
              {DEFAULT_COLORS.map((color: string) => (
                <div
                  key={color}
                  onClick={() => setCustomValue('categoryIconBgColor', color)}
                >
                  <div
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:opacity-90 min-[500px]:h-11 min-[500px]:w-11"
                    style={{ backgroundColor: color }}
                  >
                    {categoryIconBgColor === color ? (
                      <svg
                        className={cn(
                          'h-4 w-full',
                          categoryIconBgColor === '#fff'
                            ? 'text-black'
                            : 'text-white',
                        )}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            {errors.categoryIconBgColor?.message && (
              <p className="mt-2 text-red max-[500px]:text-[15px]">
                {errors.categoryIconBgColor?.message}
              </p>
            )}
          </div>
        </main>
        <footer className="mx-auto mt-16 flex w-full max-w-lg items-center justify-between min-[500px]:gap-8">
          <Button
            label="Cancel"
            onClick={() => {
              router.back();
            }}
          />
          <Button
            type="submit"
            label="Create Category"
            onClick={onSubmit}
            disabled={!!Object.keys(errors).length}
            filled
          />
        </footer>
      </form>
    </Container>
  );
};

export default CreateCategory;
