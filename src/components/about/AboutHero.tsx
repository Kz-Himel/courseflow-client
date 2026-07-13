export default function AboutHero() {
  return (
    <section className="bg-gray-900 rounded-2xl px-6 py-14 md:py-20 text-center mb-12">
      <span className="inline-block bg-violet-600/20 text-violet-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
        Our Story
      </span>
      <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
        Empowering Learners, <span className="text-violet-400">One Course</span> at a Time
      </h1>
      <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
        CourseFlow was built to make quality education accessible to
        everyone, everywhere. We connect passionate instructors with
        curious minds ready to grow their skills.
      </p>
    </section>
  );
}