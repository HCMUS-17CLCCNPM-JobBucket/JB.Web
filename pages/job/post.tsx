import { Tab } from "@headlessui/react";
import { blogAPI } from "app/api/modules/blogAPI";
import { imageAPI } from "app/api/modules/imageAPI";
import BlogTagSelection from "app/components/molecules/BlogTagSelection";
import helper from "app/utils/helper";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import router from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const config = {
  placeholderText: "Edit Your Content Here!",
  charCounterCount: true,
  imageUploadURL: "https://api.cloudinary.com/v1_1/derekzohar/image/upload",
  imageUploadParams: {
    api_key: "866395791528912",
    upload_preset: "images",
  },
  imageUploadMethod: "POST",
  events: {
    "froalaEditor.image.uploaded": (e, editor, response) => {
      response = JSON.parse(response);
      editor.image.insert(response.url, true, null, editor.image.get(), null);
      console.log(response);
      // return false;
    },
  },
};
const FroalaEditorComponent: React.ComponentType<any> = dynamic(
  () => {
    return new Promise((resolve) =>
      import("froala-editor/js/plugins.pkgd.min.js").then((e) => {
        import("react-froala-wysiwyg").then(resolve);
      })
    );
  },
  {
    loading: () => null,
    ssr: false,
  }
);
export default function AddNewJob() {
  const user = useSelector((state: any) => state.user);
  const [isUploadImg, setIsUploadImg] = useState(true);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewSource(URL.createObjectURL(e.target.files[0]));
  };

  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const formik = useFormik({
    initialValues: {
      title: "",
      imageUrls: [],
      description: "",
      activeStatus: 0, //
      priority: 0, //
      addresses: [],
      cities: [],
      minSalary: 0,
      maxSalary: 0,
      salaryCurrency: "",
      salaryDuration: "",
      skills: [],
      positions: [],
      applications: [],
      applicationCount: 0,
      interests: [],
      interestCount: 0,
      types: [],
      categories: [],
      isVisaSponsorship: false,
      employerId: 0,
      employer: null,
      expireDate: null,
      benefits: "",
      experiences: "",
      responsibilities: "",
      requirements: "",
      optionalRequirements: "",
      cultures: "",
      whyJoinUs: "",
      numberEmployeesToApplied: 0,
      jobForm: "",
      gender: 0,
      views: 0,
      isJobInterested: false,
      isJobApplied: false,
      organizationId: 0,
      organization: null,
    },
    onSubmit: async (values) => {
      const imageRes: any = await imageAPI.uploadImage(imageFile);
      const res = await blogAPI.add(
        {
          ...values,
          imageUrl: imageRes.data.url,
          content,
        },
        user.token
      );

      if (res.status === 200) router.push("/blog/" + res.data.data.blog.add.id);
    },
  });

  return (
    <form
      className="px-48 py-4 flex flex-col gap-4"
      onSubmit={formik.handleSubmit}
    >
      {/* <img
        src={previewSource || "https://via.placeholder.com/1134x160"}
        alt=""
        className="h-40 w-full object-cover rounded-lg"
      />
      <input type="file" onChange={handleImageChange} /> */}
      {/* <div className="flex justify-between">
        <div></div>
      </div> */}

      <input
        type="text"
        id="title"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        className=" rounded-lg border-transparent flex-1 appearance-none 
          border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 
          placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 
          focus:ring-purple-600 focus:border-transparent"
        placeholder="Title"
      />
      <input type="file" onChange={handleImageChange} />
      <label className="text-gray-700">
        <textarea
          className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 
          bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base 
          focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          id="description"
          placeholder="Enter your description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          rows={5}
          cols={40}
        ></textarea>
      </label>
      <div>
        <input type="text" id="Address" placeholder="Enter your Address" />
        <div>{/* list address */}</div>
      </div>
      <div>
        <input type="text" id="City" placeholder="Enter your City" />
        <div>{/* list City */}</div>
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          id="minSalary"
          defaultValue={0}
          value={formik.values.minSalary}
          onChange={formik.handleChange}
        />
        <input
          type="number"
          id="minSalary"
          defaultValue={0}
          value={formik.values.maxSalary}
          onChange={formik.handleChange}
        />
        <input type="text" />
      </div>
      <div>
        <input type="text" id="Skill" placeholder="Enter your Skill" />
        <div>{/* list Skill */}</div>
      </div>
      <div>
        <input type="text" id="Positions" placeholder="Enter your Positions" />
        <div>{/* list Positions */}</div>
      </div>
      <div>
        <div className="flex">
          <input
            type="text"
            id="applications"
            placeholder="Enter your applications"
          />
          <input type="number" id="applicationCount" defaultValue={0} />
        </div>
        <div>{/* list applications */}</div>
      </div>
      <FroalaEditorComponent
        tag="textarea"
        config={config}
        model={content}
        onModelChange={(model) => setContent(model)}
      />

      <button className="btn btn-primary w-40" type="submit">
        Post
      </button>
    </form>
  );
}
