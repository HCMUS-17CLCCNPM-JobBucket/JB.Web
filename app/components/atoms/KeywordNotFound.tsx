export default function KeywordNotFound({ keyword }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src="static/find.svg" alt="" className="h-40 w-40" />
      {/* <div className="flex flex-col"> */}
      <p>We have not found jobs for this search at the moment keyword</p>
      <p className="font-semibold">{keyword}</p>
      {/* </div> */}
    </div>
  );
}
