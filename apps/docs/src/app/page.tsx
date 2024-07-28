import { Footer, Header } from '@components/landing-page';
import Buttons from '@components/buttons';
import Skeletons from '@components/skeletons';
import BounceWrapper from '@components/bounce';
import Badges from '@components/badges';
import Accordions from '@components/accordions';

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col gap-10 min-h-screen overflow-hidden">
      <Header />

      <section className="flex flex-col gap-10 bg-slate-100 p-5 rounded-2xl mx-10">
        <Accordions />
        <Badges />
        <Buttons />
        <Skeletons />
        <BounceWrapper />
      </section>

      <Footer />
    </main>
  );
}
