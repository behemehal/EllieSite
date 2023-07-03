import Header from "../islands/Header.tsx";
import Footer from "../islands/Footer.tsx";
import HeadCustom from "../islands/HeadCustom.tsx";

export default function Home() {
  return (
    <body className="d-flex flex-column h-1001">
      <HeadCustom
        title="Ellie Programing Language"
        description="Ellie is a scripting engine that runs on embedded and sandboxed environments."
        url="https://www.ellie-lang.org"
      />
      <Header />
      <main class="mt-4">
        <section className="theme-section section sectionLead">
          <div className="section-one-leader">
            <p className="section-one-leader">
              Ellie is a type-safe programing language that runs on embedded and
              sandboxed environments.
            </p>
            <br class="intBtns" />
            <div className="gap-3 intBtns">
              <a
                href="https://playground.ellie-lang.org"
                role="button"
                className="btn btn-theme d-flex gap-1"
                style={{ "maxWidth": 100 }}
              >
                <span class="material-icons">play_arrow</span>
                Try it
              </a>
            </div>
          </div>

          <img
            className="section-two-leader"
            src="./img/controller.png"
            alt="Ellie Controller"
            width="285"
            height="285"
          />

          <div className="gap-3 indBtns">
            <a
              href="https://playground.ellie-lang.org"
              role="button"
              className="btn btn-theme d-flex gap-1 display-center"
              style={{ "maxWidth": 100 }}
            >
              <span class="material-icons">play_arrow</span>
              Try it
            </a>
          </div>
        </section>

        <section className="dark-section section">
          <div className="row">
            <div className="col">
              <div className="detail-container">
                <div className="icon-container">
                  <span className="material-icons">hail</span>
                </div>
                <div className="detail-text">
                  <span>Portability</span>
                </div>
                <div className="detail-desc">
                  <span>
                    Compile packages to all platforms
                  </span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="detail-container">
                <div className="icon-container">
                  <span className="material-icons">memory</span>
                </div>
                <div className="detail-text">
                  <span>Low memory usage</span>
                </div>
                <div className="detail-desc">
                  <span>Run your code in low memory devices</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="detail-container">
                <div className="icon-container">
                  <span className="material-icons">
                    running_with_errors
                  </span>
                </div>
                <div className="detail-text">
                  <span>Fail safe countermeasures</span>
                </div>
                <div className="detail-desc">
                  <span>
                    Recover errors easily with protected per device framework
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="light-section section">
          <div className="feature-block">
            <div className="feature-text-l">
              <h3>
                Type safe by default
              </h3>
              <hr />
              <p className="feature-text-p">
                Ellie compiler makes sure that your code is type safe. So any
                error on production will be caught and you will be notified.
              </p>
            </div>
            <div className="feature-photo-r">
              <img
                src="/img/page_res/content1.png"
                alt="Type safe"
                width="900px"
              />
            </div>
          </div>
        </section>

        <section className="dark-section section">
          <div className="feature-block">
            <div className="feature-photo-l">
              <img
                src="/img/page_res/content2.png"
                alt="cli"
                width="900px"
              />
            </div>
            <div className="feature-text-r">
              <h3>
                Rich CLI
              </h3>
              <hr />
              <p className="feature-text-p">
                Ellie CLI tools are rich and helpful. Assistments and
                visualizations are available for your code.
              </p>
            </div>
          </div>
        </section>

        <section className="light-section section">
          <div className="feature-block">
            <div className="feature-text-l">
              <h3>Portable</h3>
              <hr />
              <p className="feature-text-p">
                Ellie engine expands and shrinks with features. You can shrink
                ellie engine as small as 49kb.
              </p>
            </div>
            <div className="feature-photo-r">
              <img
                src="/img/page_res/content3.png"
                alt="portable"
                width="900px"
              />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </body>
  );
}
