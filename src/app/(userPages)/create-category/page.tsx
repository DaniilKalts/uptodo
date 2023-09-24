/* eslint-disable func-names */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/utils/Cn';
import useCategoriesStore from '@/store/useCategories';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { IconContext } from 'react-icons';
import * as AllMdIcons from 'react-icons/md';
import * as AllIo5Icons from 'react-icons/io5';

import Highlighter from 'react-highlight-words';
import { HexColorPicker } from 'react-colorful';

import { Button, Container, Input } from '@/components/UI';

interface NewCategoryInputs extends FieldValues {
  categoryName: string;
  categoryIcon: string;
  categoryIconBgColor: string;
  categoryIconColor: string;
}

const schema = yup.object().shape({
  categoryName: yup
    .string()
    .required('Category name is required')
    .min(3, 'Category name must be at least 3 characters long')
    .max(10, 'Category name must not exceed 10 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Category name  can only contain alphanumeric characters and underscores',
    ),
  categoryIcon: yup.string().required('Category icon is required'),
  categoryIconBgColor: yup
    .string()
    .required('Category icon background color is required')
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
  '#CCFF80',
  '#21A300',
  '#FF9680',
  '#A31D00',
  '#80FFFF',
  '#0069A3',
  '#80FFD9',
  '#00A372',
  '#809CFF',
  '#0055A3',
  '#FF80EB',
  '#A30089',
  '#FC80FF',
  '#A000A3',
  '#80FFA3',
  '#00A3A3',
  '#80D1FF',
  '#0069A3',
  '#FF8080',
  '#A30000',
  '#80FFD1',
  '#00A369',
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
      categoryIcon: '',
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
  const categoryIcon = watch('categoryIcon');
  const categoryIconColor = watch('categoryIconColor');
  const categoryIconBgColor = watch('categoryIconBgColor');

  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const [categorySelectedIcon, setCategorySelectedIcon] = useState<any>();
  const [categorySearchIcons, setCategorySearchIcons] = useState<any[]>([]);

  const [customColor, setCustomColor] = useState('#999');
  const [customBgColor, setCustomBgColor] = useState('#999');

  const [isSelectingCustomColor, setIsSelectingCustomColor] =
    useState<boolean>(false);
  const [isSelectingCustomBgColor, setIsSelectingCustomBgColor] =
    useState<boolean>(false);

  const addCategory = useCategoriesStore((state) => state.addCategory);

  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = (_, event) => {
    event?.preventDefault();

    if (
      !Object.keys(errors).length &&
      categoryName.length &&
      categoryIcon.length &&
      categoryIconBgColor.length &&
      categoryIconColor.length
    ) {
      if (!isAddingCategory) {
        addCategory({
          icon: categoryIcon,
          iconBgColor: isSelectingCustomBgColor
            ? customBgColor
            : categoryIconBgColor,
          iconColor: isSelectingCustomColor ? customColor : categoryIconColor,
          label: categoryName,
        });
      }

      setIsAddingCategory(true);

      router.back();
    }
  };

  useEffect(() => {
    const searchingIcons =
      Object.entries(Object.assign(AllMdIcons, AllIo5Icons))
        .filter(
          ([iconName]) =>
            iconName.toLocaleLowerCase().search(categoryIcon.toLowerCase()) >
            -1,
        )
        .slice(0, 200) || [];

    setCategorySearchIcons(searchingIcons as []);
  }, [categoryIcon]);

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
                style={{
                  backgroundColor: isSelectingCustomBgColor
                    ? customBgColor
                    : categoryIconBgColor,
                }}
                onClick={() => {
                  const confirmToReplace = confirm(
                    'Are you sure, you want to replace this icon?',
                  );

                  if (confirmToReplace) {
                    setCategorySelectedIcon(null);
                    setCustomValue('categoryIcon', '');
                  }
                }}
              >
                <categorySelectedIcon.Icon
                  className="h-7 w-7 min-[500px]:h-9 min-[500px]:w-9"
                  color={
                    isSelectingCustomColor ? customColor : categoryIconColor
                  }
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
                {errors.categoryIcon?.message && (
                  <p className="mt-1 text-red max-[500px]:text-[15px]">
                    {errors.categoryIcon?.message}
                  </p>
                )}
              </>
            )}
          </div>
          {isSelecting && categorySearchIcons ? (
            <div className="flex flex-col gap-4">
              <div className="-mb-3 mt-3">
                <Input
                  id="categoryIcon"
                  type="text"
                  value={categoryIcon}
                  placeholder="Category icon name"
                  register={register}
                  small
                  errors={errors}
                  errorMessage={errors.categoryIcon?.message as string}
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

                        setCustomValue('categoryIcon', iconName);
                        setCategorySelectedIcon({
                          iconName,
                          Icon,
                        });
                      }}
                    >
                      <div className="flex items-center justify-center bg-gray-dark px-8 py-4 text-white transition-colors group-hover:bg-gray-500">
                        <Icon
                          className={cn(
                            'h-7 w-7  min-[500px]:h-9 min-[500px]:w-9',
                            categoryIconColor,
                          )}
                        />
                      </div>
                      <Highlighter
                        className="pt-2 text-[.7em]"
                        searchWords={categoryIcon.split(' ')}
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
            <p className="mb-1 text-base text-gray-dark dark:text-white-pale min-[500px]:text-xl">
              Category icon color :
            </p>
            {isSelectingCustomColor ? (
              <div className="mb-5 flex flex-col gap-5">
                <HexColorPicker color={customColor} onChange={setCustomColor} />
                <input
                  placeholder="icon color"
                  className="w-fit bg-gray-light text-white"
                  onChange={(e) => setCustomColor(e.target.value)}
                  value={customColor}
                />
              </div>
            ) : null}
            <div className="categories-scrollbar flex gap-4 overflow-x-auto pb-3 pt-3">
              <div
                onClick={() => {
                  if (isSelectingCustomColor) {
                    setIsSelectingCustomColor(false);
                    setCustomValue('categoryIconColor', customColor);
                    if (!DEFAULT_COLORS.includes(customColor)) {
                      DEFAULT_COLORS.unshift(customColor);
                      setCustomColor('#999');
                    }
                  } else {
                    setIsSelectingCustomColor(true);
                  }
                }}
              >
                <div
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-2xl hover:opacity-90 min-[500px]:h-11 min-[500px]:w-11 min-[500px]:text-3xl"
                  style={{ backgroundColor: customColor }}
                >
                  +
                </div>
              </div>
              {DEFAULT_COLORS.map((color: string, id) => (
                <div
                  key={`${id}iconColor`}
                  onClick={() => {
                    setCustomColor(color);
                    setCustomValue('categoryIconColor', color);
                  }}
                >
                  <div
                    className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:opacity-90 min-[500px]:h-11 min-[500px]:w-11"
                    style={{ backgroundColor: color }}
                  >
                    <div
                      onClick={() => {
                        const confirmToRemove = confirm(
                          'Are you sure, you want to delete this color?',
                        );

                        if (confirmToRemove) {
                          DEFAULT_COLORS.splice(
                            DEFAULT_COLORS.findIndex((clr) => clr === color),
                            1,
                          );
                        }
                      }}
                      className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red"
                    >
                      x
                    </div>
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
            <p className="mb-1 text-base text-gray-dark dark:text-white-pale min-[500px]:text-xl">
              Category icon background color :
            </p>
            {isSelectingCustomBgColor ? (
              <div className="mb-5 flex flex-col gap-5">
                <HexColorPicker
                  color={customBgColor}
                  onChange={setCustomBgColor}
                  className="mb-5"
                />
                <input
                  placeholder="icon color"
                  className="w-fit bg-gray-light text-white"
                  onChange={(e) => setCustomBgColor(e.target.value)}
                  value={customBgColor}
                />
              </div>
            ) : null}
            <div className="categories-scrollbar flex gap-4 overflow-x-auto pb-3 pt-3">
              <div
                onClick={() => {
                  if (isSelectingCustomBgColor) {
                    setIsSelectingCustomBgColor(false);
                    setCustomValue('categoryIconBgColor', customBgColor);
                    if (!DEFAULT_COLORS.includes(customBgColor)) {
                      DEFAULT_COLORS.unshift(customBgColor);
                      setCustomBgColor('#999');
                    }
                  } else {
                    setIsSelectingCustomBgColor(true);
                  }
                }}
              >
                <div
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-2xl hover:opacity-90 min-[500px]:h-11 min-[500px]:w-11 min-[500px]:text-3xl"
                  style={{ backgroundColor: customBgColor }}
                >
                  +
                </div>
              </div>
              {DEFAULT_COLORS.map((color: string, id) => (
                <div
                  key={`${id}iconBgColor`}
                  onClick={() => {
                    setCustomBgColor(color);
                    setCustomValue('categoryIconBgColor', color);
                  }}
                >
                  <div
                    className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:opacity-90 min-[500px]:h-11 min-[500px]:w-11"
                    style={{ backgroundColor: color }}
                  >
                    <div
                      onClick={() => {
                        const confirmToRemove = confirm(
                          'Are you sure, you want to delete this color?',
                        );

                        if (confirmToRemove) {
                          DEFAULT_COLORS.splice(
                            DEFAULT_COLORS.findIndex((clr) => clr === color),
                            1,
                          );
                        }
                      }}
                      className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red"
                    >
                      x
                    </div>
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
        <footer className="mx-auto mt-16 flex w-full max-w-lg items-center justify-between min-[500px]:gap-14">
          <div className="w-2/5 min-[500px]:w-1/2">
            <Button
              label="Cancel"
              onClick={() => {
                router.back();
              }}
            />
          </div>
          <div className="w-3/5 max-[500px]:max-w-[175px] min-[500px]:w-1/2">
            <Button
              type="submit"
              label="Create Category"
              onClick={onSubmit}
              disabled={!!Object.keys(errors).length || isAddingCategory}
              filled
            />
          </div>
        </footer>
      </form>
    </Container>
  );
};

export default CreateCategory;
