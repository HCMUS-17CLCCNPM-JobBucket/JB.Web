const MemberCard = (member) => {
  console.log(member);
  return (
    <div className="flex gap-2 items-center w-[300px]">
      <img
        src={member.avatarUrl || "/avatar/avatar.png"}
        alt={member.name}
        className="h-24 w-24 rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{member.name}</p>
        <p>{member.roleId === 2 ? "Recruiter" : "Manager"}</p>
      </div>
    </div>
  );
};

export default MemberCard;
