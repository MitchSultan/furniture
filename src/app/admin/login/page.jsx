import Link from "next/link";
import { signInAction } from "@/app/admin/actions";
import siteData from "@/data/site.json";

const loginErrors = {
  credentials: "Email or password is incorrect.",
  access: "This account does not have staff access.",
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const error = loginErrors[params?.error];

  return (
    <main className="min-h-screen bg-[#f2f3ed] text-[#202923]">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
        <section className="relative hidden overflow-hidden bg-[#1d3028] px-12 py-10 text-[#f4f1e8] lg:flex lg:flex-col lg:justify-between xl:px-20">
          <Link href="/" className="font-serif text-2xl lowercase">
            {siteData.name.toLowerCase()}.
          </Link>
          <div className="max-w-xl pb-16">
            <p className="mb-5 text-xs uppercase tracking-[0.18em] text-[#b8c5b7]">Studio access</p>
            <h1 className="font-serif text-6xl font-normal leading-[1.05]">Thoughtful work, well kept.</h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[#d3dbd1]">Sign in to manage the catalog and keep the atelier moving.</p>
          </div>
          <span className="text-xs uppercase tracking-[0.14em] text-[#b8c5b7]">{siteData.tagline}</span>
        </section>

        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-[420px]">
            <Link href="/" className="font-serif text-xl lowercase text-[#1d3028] lg:hidden">
              {siteData.name.toLowerCase()}.
            </Link>
            <p className="mt-12 text-xs uppercase tracking-[0.16em] text-[#6b776f] lg:mt-0">Admin portal</p>
            <h2 className="mt-3 font-serif text-4xl font-normal">Welcome back</h2>
            <p className="mt-3 text-sm text-[#66716a]">Use your staff account to continue.</p>

            <form action={signInAction} className="mt-9 flex flex-col gap-5">
              <label className="flex flex-col gap-2 text-sm font-medium">
                Email address
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  required
                  className="h-12 rounded-md border border-[#d6dbd3] bg-white px-4 outline-none transition focus:border-[#3d6652] focus:ring-2 focus:ring-[#3d6652]/15"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Password
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  className="h-12 rounded-md border border-[#d6dbd3] bg-white px-4 outline-none transition focus:border-[#3d6652] focus:ring-2 focus:ring-[#3d6652]/15"
                />
              </label>
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              <button
                type="submit"
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#234534] px-5 text-sm font-medium text-white transition hover:bg-[#172f23]"
              >
                Sign in <span aria-hidden="true">&#8594;</span>
              </button>
            </form>

            <Link href="/" className="mt-8 inline-flex text-sm text-[#66716a] hover:text-[#234534]">
              Return to the store
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}