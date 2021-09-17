export default function Footer() {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
        <div className="md:max-w-md lg:col-span-2">
          <div className="flex gap-2 items-center">
            <img src="logo.png" alt="JobBucket" className="h-10 w-10" />
            <span className="ml-2 text-xl font-bold tracking-wide uppercase">
              JobBucket
            </span>
          </div>
          {/* <div className="mt-4 lg:max-w-sm">
            <p className="text-sm text-gray-800">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <p className="mt-4 text-sm text-gray-800">
              Eaque ipsa quae ab illo inventore veritatis et quasi architecto
              beatae vitae dicta sunt explicabo.
            </p>
          </div> */}
        </div>
        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
          <div>
            <p className="font-semibold tracking-wide text-gray-800">
              Category
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Design
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  IT
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Marketing
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Scene
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-800">
              Business
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Web
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  eCommerce
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Business
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Entertainment
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-800">Apples</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Media
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Brochure
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Nonprofit
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Educational
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Projects
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-800">Cherry</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Infopreneur
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Personal
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Wiki
                </a>
              </li>
              <li>
                <a className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                  Forum
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row">
        <p className="text-sm text-gray-600">
          Reference{" "}
          <a
            className="cursor-pointer hover:underline font-semibold"
            href="https://dribbble.com/shots/15761479-Chakri-Job-Portal-Landing-page-v1"
          >
            Nasim ⛹🏻‍♂️
          </a>
        </p>
      </div>
    </div>
  );
}
