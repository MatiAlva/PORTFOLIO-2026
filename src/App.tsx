import { LazyMotion, MotionConfig } from 'motion/react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ExperienceProvider } from '@/context/ExperienceProvider';
import { LocaleProvider } from '@/context/LocaleProvider';
import { RootLayout } from '@/components/layout/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // TODO: re-enable once the real projects are ready.
      // {
      //   path: 'projects/:slug',
      //   // Case studies are split into their own chunk.
      //   lazy: async () => ({ Component: (await import('@/pages/ProjectPage')).default }),
      // },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

const loadMotionFeatures = () => import('@/lib/motionFeatures').then((module) => module.default);

export function App() {
  return (
    <LocaleProvider>
      <ExperienceProvider>
        <MotionConfig reducedMotion="user">
          <LazyMotion features={loadMotionFeatures} strict>
            <RouterProvider router={router} />
          </LazyMotion>
        </MotionConfig>
      </ExperienceProvider>
    </LocaleProvider>
  );
}
