import Container from '@/components/UI/Container';
import React from 'react';

const page = () => (
  <Container>
    <div className="mx-auto flex flex-col items-center justify-center">
      <main className="flex w-full max-w-[575px] flex-col justify-start">
        <section className="mx-auto mt-7 flex w-full flex-col justify-center gap-6 min-[525px]:w-11/12 min-[575px]:w-10/12">
          <div className="relative flex flex-wrap items-center gap-4 rounded-md bg-gray-700 p-4">
            <div className="h-5 w-5 cursor-pointer rounded-full border-2 border-white-pale bg-transparent"></div>
            <div>
              <h6 className="mb-[6px] text-base text-white-pale min-[475px]:text-xl">
                Buy Grocery
              </h6>
              <p className="text-base text-gray-200 min-[475px]:text-base">
                Today At 16:45
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </Container>
);

export default page;
