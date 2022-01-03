import React from "react";
import Head from "next/head";
import Link from "next/link";
import { XIcon } from "@heroicons/react/solid";

export function ExperienceItem({ company, position, duration, description }) {
  return (
    <div>
      <p className="text-lg font-semibold">{company}</p>
      <p className="text-base text-gray-400">{position + "  |  " + duration}</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    </div>
  );
}
export function EducationItem({ school, major, profession, status }) {
  return (
    <div>
      <p className="text-lg font-semibold">
        {school} - <span className="text-red-500">{status}</span>
      </p>
      <p className="text-base text-gray-400">{major + "  |  " + profession}</p>
    </div>
  );
}

export function SkillButton({ skillName, level, onDelete }) {
  return (
    <div className="px-4 py-1 rounded-full border border-blue-600 flex gap-2 items-center group">
      <p>{skillName + " (" + level + "/5) "}</p>
      {onDelete !== null && (
        <XIcon
          className="h-4 w-4 text-red-600 hidden group-hover:block cursor-pointer"
          onClick={onDelete}
        />
      )}
    </div>
  );
}

export default function ProfileLayout(props) {
  return (
    <div className="px-20 py-10 flex flex-col gap-12">
      <Head>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <title>{props.profile.name} Profile | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex gap-12">
        <img
          src={props.profile.avatarUrl || "/avatar/avatar.png"}
          alt=""
          className="rounded-full h-40 w-40 object-cover"
        />

        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between">
            <div>
              <p className="text-4xl font-semibold">{props.profile.name}</p>
              <p className="text-sm text-gray-400">
                Web Dev | Software Engineer
              </p>
            </div>
            <Link href="/profile/edit" passHref>
              <button className="btn btn-primary w-40 h-10">Edit</button>
            </Link>
          </div>
          <p className="mt-2 text-gray-600">{props.profile.introduction}</p>
        </div>
      </div>
      <hr className="h-[1px] w-full text-gray-400" />

      <div className="ml-52 ">
        {props.profile.skills.length > 0 && (
          <div>
            <p className="text-2xl font-semibold text-blue-500">Skills</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {props.profile.skills.map((item, index) => (
                <div key={index}>
                  <SkillButton {...item} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 mt-4">
          {/* left */}
          {props.profile.experiences?.length > 0 && (
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-2xl font-semibold text-blue-500">
                  Experiences
                </p>
                <div className="mt-2 flex flex-col gap-4">
                  {props.profile.experiences
                    ? props.profile.experiences.map((experience) => (
                        <div key={experience.id}>
                          <ExperienceItem {...experience} />
                        </div>
                      ))
                    : "Updating..."}
                </div>
              </div>
              {props.profile.awards.length > 0 && (
                <div>
                  <p className="text-2xl font-semibold text-blue-500">Awards</p>
                  <div className="mt-2 flex flex-col">
                    {props.profile.awards.map((item) => (
                      <p key={item.id}>{item}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* right */}
          {props.profile.educations?.length > 0 && (
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-2xl font-semibold text-blue-500">
                  Educations
                </p>
                <div className="mt-2 flex flex-col gap-4">
                  {props.profile.educations
                    ? props.profile.educations.map((education) => (
                        <div key={education.id}>
                          <EducationItem {...education} />
                        </div>
                      ))
                    : "Updating..."}
                </div>
              </div>
              {props.profile.certifications.length > 0 && (
                <div>
                  <p className="text-2xl font-semibold text-blue-500">
                    Certifications
                  </p>
                  <div className="mt-2 flex flex-col">
                    {props.profile.certifications.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              )}
              {props.profile.certifications.length > 0 && (
                <div>
                  <p className="text-2xl font-semibold text-blue-500">
                    Activities
                  </p>
                  <div className="mt-2 flex flex-col">
                    {props.profile.activities.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
