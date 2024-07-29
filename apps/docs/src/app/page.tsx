import { Footer, Header } from '@components/landing-page';
import Buttons from '@components/buttons';
import Skeletons from '@components/skeletons';
import BounceWrapper from '@components/bounce';
import Badges from '@components/badges';
import Accordions from '@components/accordions';

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col gap-10 items-center min-h-screen overflow-hidden">
      <section className="flex flex-col flex-1 max-w-6xl">
        <Header />
        <section className="flex flex-col gap-10 bg-slate-100 p-5 lg:rounded-2xl lg:mx-10 py-24">
          <Accordions />
          <Badges />
          <Buttons />
          <Skeletons />
          <BounceWrapper />
        </section>
      </section>

      <Footer />
    </main>
  );
}
