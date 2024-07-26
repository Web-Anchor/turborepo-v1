import { Footer, Header } from '@components/landing-page';
import Buttons from '@components/buttons';

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col gap-10 min-h-screen overflow-hidden">
      <Header />

      <section className="flex flex-col bg-slate-100 p-5 rounded-2xl">
        <Buttons />
      </section>

      <Footer />
    </main>
  );
}
