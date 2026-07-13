const stats = [
  { label: "Courses", value: "500+" },
  { label: "Students", value: "10K+" },
  { label: "Instructors", value: "200+" },
  { label: "Avg. Rating", value: "4.8/5" },
];

export default function AboutStats() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl border border-gray-200 py-6 text-center"
        >
          <p className="text-2xl font-bold text-violet-600">{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}