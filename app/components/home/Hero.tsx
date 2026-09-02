/**
 * Homepage introduction: name, role/status tagline, and an illustration
 * placeholder ready for a real image later.
 */
export default function Hero() {
  return (
    <section className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between">
      <div className="flex max-w-md flex-col gap-6">
        <h1 className="font-geneva text-[32px] uppercase text-black">
          Myeongjin
        </h1>
        <div className="flex flex-col gap-6 font-geneva text-base text-black">
          <p>Software ⚬ Design ⚬ Hardware</p>
          <p>
            {"CS (HCI) @ "}
            <a
              href="https://future.utoronto.ca/data-computer-science"
              target="_blank"
              className="text-accent-pink"
            >
              UToronto (main campus)
            </a>
          </p>
          <p>Seeking 2027 Winter Internship</p>
        </div>
      </div>
      <div className="aspect-[593/484] w-full max-w-[593px] shrink-0 rounded-3xl bg-card-gray" />
    </section>
  );
}
