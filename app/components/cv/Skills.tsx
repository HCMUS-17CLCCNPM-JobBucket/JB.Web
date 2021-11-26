import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";

export default function Skills() {
  const [isEdit, setIsEdit] = useState(false);
  const [editindex, setIndex] = useState(0);
  const [tempSkill, setTempSkill] = useState({
    skillName: "",
    level: "",
  });
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("1");
  const dispatch = useDispatch();
  const SkillList = useSelector((state: any) => state.cv.skill);
  const onHandleAdd = () => {
    const newSkill = {
      skillName: skill,
      level: parseInt(level),
    };
    dispatch(cvActions.addSkill(newSkill));
    setSkill("");
    setLevel("1");
  };
  const handleChangeLevel = (e) => {
    setLevel(e.target.value);
  };
  const deleteHandler = (index) => {
    dispatch(cvActions.deleteSkill(index));
  };
  const editHander = (index, data) => {
    dispatch(cvActions.deleteSkill(index));
    setSkill(data.skillName);
    setLevel(data.level);
    setTempSkill(data);
    setIndex(index);
    setIsEdit(true);
  };
  const onSaveEdit = () => {
    const data = {
      index: editindex,
      data: {
        skillName: skill,
        level: parseInt(level),
      },
    };
    dispatch(cvActions.editSkill(data));
    setIsEdit(false);
    setSkill("");
    setLevel("1");
  };
  const onCancle = () => {
    const data = {
      index: editindex,
      data: {
        skillName: tempSkill.skillName,
        level: parseInt(tempSkill.level),
      },
    };
    dispatch(cvActions.editSkill(data));
    setIsEdit(false);
    setSkill("");
    setLevel("1");
  };
  return (
    <div className="border-gray-300 border p-10 bg-white mb-8">
      <p className="font-bold mb-4">Skills</p>
      {SkillList.map((data, index) => (
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div
            key={index}
            className="rounded-lg border-gray-300 border flex flex-col md:flex-row p-4 md:justify-between mb-4 md:items-center"
          >
            <div className="flex flex-col mb-2 md:mb-0">
              <p>{data.skillName}</p>
              <div className="flex flex-row">
                {[...Array(parseInt(data.level))].map(() => (
                  <div className="border-b-4 border-blue-600 w-8 mr-2"></div>
                ))}
              </div>
            </div>
            <div className="flex flex-row">
              <button
                disabled={isEdit}
                onClick={() => editHander(index, data)}
                type="button"
                className="h-10 mr-2 px-4 text-white transition-colors duration-150 bg-red-500 rounded-lg focus:outline-none hover:bg-red-600 disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                disabled={isEdit}
                onClick={() => deleteHandler(index)}
                type="button"
                className="h-10 px-4 text-white transition-colors duration-150 bg-red-500 rounded-lg focus:outline-none hover:bg-red-600 disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
        <div className="flex flex-col">
          <label className="text-gray-700">Skill Name</label>
          <input
            onChange={(e) => setSkill(e.target.value)}
            value={skill}
            type="text"
            id="skill"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Skill"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700">Level</label>

          <select
            value={level}
            onChange={handleChangeLevel}
            className=" rounded-lg border-transparent border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      {isEdit == false ? (
        <button
          onClick={onHandleAdd}
          type="button"
          className="my-4 h-10 px-4 text-white bg-blue-600 rounded-md"
        >
          Add
        </button>
      ) : (
        <>
          <button
            onClick={onSaveEdit}
            type="button"
            className="my-4 h-10 px-4 text-white bg-blue-600 rounded-md"
          >
            Save
          </button>
          <button
            onClick={onCancle}
            type="button"
            className="ml-4 my-4 h-10 px-4 text-white bg-red-600 rounded-md"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
