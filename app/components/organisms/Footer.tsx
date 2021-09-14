export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__link">
        {/* <div> */}
        <div className="footer__logo">
          <img src="logo.png" alt="JobBucket" />
          <span>JobBucket</span>
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
        {/* </div> */}
        <div className="footer__content">
          <div>
            <p className="footer__title">Category</p>
            <ul className="footer__líst">
              <li>
                <a>Design</a>
              </li>
              <li>
                <a>IT</a>
              </li>
              <li>
                <a>Marketing</a>
              </li>
              <li>
                <a>Scene</a>
              </li>
            </ul>
          </div>
          <div>
            <p>Business</p>
            <ul>
              <li>
                <a>Web</a>
              </li>
              <li>
                <a>eCommerce</a>
              </li>
              <li>
                <a>Business</a>
              </li>
              <li>
                <a>Entertainment</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
            </ul>
          </div>
          <div>
            <p>Apples</p>
            <ul>
              <li>
                <a>Media</a>
              </li>
              <li>
                <a>Brochure</a>
              </li>
              <li>
                <a>Nonprofit</a>
              </li>
              <li>
                <a>Educational</a>
              </li>
              <li>
                <a>Projects</a>
              </li>
            </ul>
          </div>
          <div>
            <p>Cherry</p>
            <ul>
              <li>
                <a>Infopreneur</a>
              </li>
              <li>
                <a>Personal</a>
              </li>
              <li>
                <a>Wiki</a>
              </li>
              <li>
                <a>Forum</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__ref">
        <p>
          Reference{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://dribbble.com/shots/15761479-Chakri-Job-Portal-Landing-page-v1"
          >
            Nasim ⛹🏻‍♂️
          </a>
        </p>
      </div>
    </div>
  );
}
