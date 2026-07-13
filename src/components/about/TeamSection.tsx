const team = [
  { name: "Rafiq Ahmed", role: "Founder & CEO" },
  { name: "Sarah Johnson", role: "Head of Curriculum" },
  { name: "David Wilson", role: "Lead Engineer" },
  { name: "Lisa Anderson", role: "Head of Design" },
];

export default function TeamSection() {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Meet the Team
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {team.map((member) => (
          <div
            key={member.name}
            className="bg-white rounded-2xl border border-gray-200 p-5 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-semibold text-lg mx-auto mb-3">
              {member.name.charAt(0)}
            </div>
            <p className="text-sm font-medium text-gray-900">
              {member.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}