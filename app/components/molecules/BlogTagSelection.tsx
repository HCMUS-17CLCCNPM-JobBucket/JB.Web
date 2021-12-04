import { blogAPI } from "app/api/modules/blogAPI";
import React, { useMemo, useState } from "react";

import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";

export default function BlogTagSelection({ value, setValue }) {
  const [tags, setTags] = useState([]);
  const customStyles = {
    // option: (provided, state) => ({
    //   ...provided,
    // }),
    control: (styles) => ({
      // none of react-select's styles are passed to <Control />
      //   height: 42,
      ...styles,
      height: "42px",
      width: "100%",
      borderRadius: "0.5rem",
      border: "1px solid #E5E7EB",
    }),
    // singleValue: (provided, state) => {
    //   const opacity = state.isDisabled ? 0.5 : 1;
    //   const transition = "opacity 300ms";

    //   return { ...provided, opacity, transition };
    // },
  };
  useMemo(() => {
    blogAPI.getBlogTags().then((res) => {
      setTags(
        res.data.data.blogTags.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }))
      );
    });
  }, []);

  const handleChange = (newValue: OnChangeValue, actionMeta: ActionMeta) => {
    setValue(newValue.map((tag) => tag.value.toLowerCase().trim()));
  };

  return (
    <CreatableSelect
      isClearable
      isMulti
      styles={customStyles}
      onChange={handleChange}
      options={tags}
    />
  );
}
