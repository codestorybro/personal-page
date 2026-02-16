import Footer from '@/components/Footer';
import { Header } from '@/components/Header';

export default function Layout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <header className="sticky top-0 z-50 border-b border-white/20 bg-black">
        <div className="mx-auto my-2 w-full max-w-screen-xl px-8">
          <Header />
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl flex-col items-center p-8 pt-0 font-bodyText text-base text-bodyText xl:px-0">
        <div className="w-full max-w-screen-xl">
          <div className="my-8">{props.children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
