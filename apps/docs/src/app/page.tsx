import { Footer, Header } from '@components/landing-page';
import Buttons from '@components/buttons';

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col gap-10 justify-between min-h-screen py-24 px-10 overflow-hidden">
      <Header />

      <section className="flex flex-col bg-slate-100 p-5 rounded-2xl">
        <Buttons />
      </section>

      <Footer />
    </main>
  );
}
