import { Footer, Header } from '@components/landing-page';
import Buttons from '@components/buttons';
import Skeletons from '@components/skeletons';
import BounceWrapper from '@components/bounce';
import Badges from '@components/badges';
import Accordions from '@components/accordions';
import Sidebars from '@components/sidebars';
import Breadcrumbs from '@components/breadcrumbs';
import Headers from '@components/headers';
import Spinners from '@components/spinners';
import Forms from '@components/forms';

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col gap-10 items-center min-h-screen overflow-hidden">
      <section className="flex flex-col flex-1 max-w-6xl">
        <Header />
        <section className="flex flex-col gap-10 bg-slate-100 p-5 lg:rounded-2xl lg:mx-10 py-24">
          <Headers />
          <Breadcrumbs />
          <Sidebars />
          <Accordions />
          <Badges />
          <Buttons />
          <Skeletons />
          <BounceWrapper />
          <Spinners />
          <Forms />
        </section>
      </section>

      <Footer />
    </main>
  );
}
