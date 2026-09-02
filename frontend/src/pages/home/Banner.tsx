import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row py-16 justify-between items-center gap-8 md:gap-12">
      {/* Banner Image - order-1 on mobile (shows first), order-2 on desktop (shows on right) */}
      <div className="order-1 md:order-2 md:w-1/2 w-full flex items-center md:justify-end">
        <img
          src={bannerImg}
          alt="Featured book releases banner"
          width={512}
          height={512}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-auto max-w-md object-contain"
        />
      </div>

      {/* Content Section - order-2 on mobile (shows below image), order-1 on desktop (shows on left) */}
      <div className="order-2 md:order-1 md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl font-medium mb-5 md:mb-7 leading-tight">
          New Releases This Week
        </h1>
        <p className="mb-8 md:mb-10 text-gray-700 leading-relaxed">
          It's time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week's new releases offer something for
          everyone.
        </p>
        <button type="button" className="btn-primary">
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default Banner;