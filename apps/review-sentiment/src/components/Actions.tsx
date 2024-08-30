export default function Page() {
  async function actionOne() {
    console.log('Training model...');
  }

  return (
    <section className="flex flex-col my-16 gap-4 p-5 border border-slate-200 rounded-md">
      <h1>Actions</h1>

      <button
        className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={actionOne}
      >
        Action One
      </button>
    </section>
  );
}
