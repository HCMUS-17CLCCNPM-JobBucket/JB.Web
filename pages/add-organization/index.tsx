import { blogAPI } from "app/api/modules/blogAPI";
import { imageAPI } from "app/api/modules/imageAPI";
import { orgAPI } from "app/api/modules/organization";
import CountrySelect from "app/components/atoms/Select/CountrySelect";
import LoadingFullPage from "app/components/molecules/LoadingFullPage";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Head from "next/head";
import { updateOrgId } from "app/redux/features/user";
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
  const [address, setAddress] = useState("");
  // const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewSource(URL.createObjectURL(e.target.files[0]));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      addresses: [],
      avatarUrl: "",
      bio: "",
      country: "",
      email: "",
      imageUrls: [],
      phoneNumber: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      if (imageFile === null) {
        const dataToSend = {
          ...values,
          //   addresses: address,
          //   id: company.id,
        };
        const res = await orgAPI.add(dataToSend);

        if (res.status === 200) {
          dispatch(updateOrgId(res.data.data.organization.add.id));
          toast.success("Organization added successfully");
          router.push("/manager");
        } else {
          toast.error("Organization added failed");
        }
      } else {
        const imageRes = await imageAPI.uploadImage(imageFile);
        if (imageRes.status === 200) {
          const dataToSend = {
            ...values,
            avatarUrl: imageRes.data.url,
            addresses: [address],
            country,
            id: company.id,
          };
          const res = await orgAPI.add(dataToSend);
          if (res.status === 200) {
            toast.success("Organization updated successfully");
            router.push("/manager");
          } else {
            toast.error("Organization update failed");
          }
        }
      }

      setLoading(false);
    },
  });

  return (
    <form
      className="px-48 py-4 flex flex-col gap-4"
      onSubmit={formik.handleSubmit}
    >
      <Head>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <title>Update {company.name} | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {loading && <LoadingFullPage />}
      <img
        src={
          previewSource ||
          company.avatarUrl ||
          "https://via.placeholder.com/1134x160"
        }
        alt=""
        className="h-40 w-40 object-cover rounded-lg"
      />
      <input type="file" onChange={handleImageChange} />

      <div className="grid grid-cols-4 gap-4">
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formik.values.name}
          onChange={formik.handleChange}
          className="col-span-3 input"
          placeholder="Organization's name"
        />
        <input
          type="text"
          className="input"
          id="country"
          name="country"
          placeholder="Country"
          value={formik.values.country}
          onChange={formik.handleChange}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          className="col-span-3 input"
          placeholder="Email"
        />
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          required
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          className="col-span-1 input"
          placeholder="PhoneNumber"
        />
      </div>
      <input
        type="text"
        id="addresses"
        name="addresses"
        value={address}
        required
        onChange={(e) => setAddress(e.target.value)}
        className="col-span-1 input"
        placeholder="Address"
      />
      <label className="text-gray-700">
        <textarea
          className="input"
          id="bio"
          placeholder="Bio"
          name="bio"
          required
          value={formik.values.bio}
          onChange={formik.handleChange}
          rows={5}
          cols={40}
        ></textarea>
      </label>

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
        Add
      </button>
    </form>
  );
}
