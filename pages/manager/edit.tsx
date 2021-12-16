import { blogAPI } from "app/api/modules/blogAPI";
import { imageAPI } from "app/api/modules/imageAPI";
import { orgAPI } from "app/api/modules/organization";
import CountrySelect from "app/components/atoms/Select/CountrySelect";
import BlogTagSelection from "app/components/molecules/BlogTagSelection";
import LoadingFullPage from "app/components/molecules/LoadingFullPage";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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

export default function UpdateOrg(props) {
  const [company, setCompany] = useState<any>({ name: " " });

  const [country, setCountry] = useState(company.country || "");
  const [loading, setLoading] = useState(false);
  // const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    orgAPI.getById(user.user.organizationId).then((res) => {
      setCompany(res.data.data.organizations[0]);
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewSource(URL.createObjectURL(e.target.files[0]));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: company?.name || "",
      addresses: company.addresses,
      avatarUrl: company?.avatarUrl || "",
      bio: company?.bio || "",
      country: company?.country || "",
      email: company?.email || "",
      imageUrls: [],
      phoneNumber: company?.phoneNumber || "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const dataToSend = {
        ...values,
        addresses: [values.addresses],
        country,
        id: company.id,
      };
      const res = await orgAPI.update(dataToSend);
      if (res.status === 200) {
        toast.success("Organization updated successfully");
        router.push("/manager");
      } else {
        toast.error("Organization update failed");
      }
      setLoading(false);
    },
  });

  return (
    <form
      className="px-48 py-4 flex flex-col gap-4"
      onSubmit={formik.handleSubmit}
    >
      {loading && <LoadingFullPage />}
      <img
        src={previewSource || "https://via.placeholder.com/1134x160"}
        alt=""
        className="h-40 w-full object-cover rounded-lg"
      />
      <input type="file" onChange={handleImageChange} />

      <div className="grid grid-cols-4 gap-4">
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="col-span-3 rounded-lg border-transparent flex-1 appearance-none 
          border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 
          placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 
          focus:ring-purple-600 focus:border-transparent"
          placeholder="name"
        />
        <CountrySelect value={country} onChange={setCountry} />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="col-span-3 rounded-lg border-transparent flex-1 appearance-none 
          border border-gray-300 py-2 px-4 bg-white text-gray-700 
          placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 
          focus:ring-purple-600 focus:border-transparent"
          placeholder="email"
        />
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          className="col-span-1 rounded-lg border-transparent flex-1 appearance-none 
          border border-gray-300 py-2 px-4 bg-white text-gray-700 
          placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 
          focus:ring-purple-600 focus:border-transparent"
          placeholder="phoneNumber"
        />
      </div>
      <label className="text-gray-700">
        <textarea
          className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 
          bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base 
          focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          id="bio"
          placeholder="Enter your bio"
          name="bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          rows={5}
          cols={40}
        ></textarea>
      </label>
      <input
        type="text"
        id="addresses"
        name="addresses"
        value={formik.values.addresses}
        onChange={formik.handleChange}
        className="col-span-1 rounded-lg border-transparent flex-1 appearance-none 
          border border-gray-300 py-2 px-4 bg-white text-gray-700 
          placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 
          focus:ring-purple-600 focus:border-transparent"
        placeholder="addresses"
      />
      {/* <FroalaEditorComponent
        tag="textarea"
        config={{
          placeholderText: "Edit Your Content Here!",
          charCounterCount: true,
        }}
        model={content}
        onModelChange={(model) => setContent(model)}
      /> */}

      <button className="btn btn-primary w-40" type="submit">
        Update
      </button>
    </form>
  );
}
