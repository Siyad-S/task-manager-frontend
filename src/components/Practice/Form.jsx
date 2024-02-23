import React, { useState } from "react";
import "./Practice.css";
import { useFormik } from "formik";

const Form = () => {
  const [openSkill, setOpenSkill] = useState(false);
  const [subSkillsBool, setSubSkillsBool] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      country: "",
      address: "",
      gender: "",
      about: "",
      jobType: [],
      jobRole: "",
      domain: "",
      skills: [],
    },
  });

  const handleSkillModal = () => {
    setOpenSkill(true);
  };

  const handleSkillSet = (data) => {
    const skillsArray = [...formik.values.skills];
    if (data.domain !== "") {
      skillsArray.push({
        skills: [
          {
            subSkills: [],
          },
        ],
      });
    }
    formik.setFieldValue("skills", skillsArray);
  };

  const handleMainSkill = () => {
    setSubSkillsBool(true);
  };

  return (
    <div>
      <form action="">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label htmlFor="designation">Designation</label>
        <input
          type="text"
          name="designation"
          id="designation"
          onChange={formik.handleChange}
          value={formik.values.designation}
        />

        <label htmlFor="country">Country</label>
        <select
          name="country"
          id="country"
          onChange={formik.handleChange}
          value={formik.values.country}
        >
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UAE">UAE</option>
          <option value="UK">UK</option>
          <option value="China">China</option>
        </select>

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          onChange={formik.handleChange}
          value={formik.values.address}
        />

        <label htmlFor="gender">Gender</label>
        <div>
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            name="gender"
            id="male"
            onChange={formik.handleChange}
            defaultChecked={formik.values.gender === "male"}
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            name="gender"
            id="female"
            onChange={formik.handleChange}
            defaultChecked={formik.values.gender === "female"}
          />
        </div>

        <label htmlFor="about">About the applicant</label>
        <textarea
          type="text"
          name="about"
          id="about"
          onChange={formik.handleChange}
          value={formik.values.about}
          cols="30"
          rows="10"
        />

        <label htmlFor="jobType">Job Types</label>
        <div>
          <label htmlFor="hybrid">Hybrid</label>
          <input
            type="checkbox"
            name="jobType"
            id="hybrid"
            onChange={(event) => {
              const isChecked = event.target.checked;
              const value = isChecked ? "Hybrid" : "";
              formik.setFieldValue(
                "jobType",
                isChecked
                  ? [...formik.values.jobType, value]
                  : formik.values.jobType.filter((item) => item !== "Hybrid")
              );
            }}
            checked={formik.values.jobType.includes("Hybrid")}
          />
          <br />

          <label htmlFor="onsite">On-Site</label>
          <input
            type="checkbox"
            name="jobType"
            id="onsite"
            onChange={(event) => {
              const isChecked = event.target.checked;
              const value = isChecked ? "On-site" : "";
              formik.setFieldValue(
                "jobType",
                isChecked
                  ? [...formik.values.jobType, value]
                  : formik.values.jobType.filter((item) => item !== "On-site")
              );
            }}
            checked={formik.values.jobType.includes("On-site")}
          />

          <label htmlFor="wfh">WFH</label>
          <input
            type="checkbox"
            name="jobType"
            id="wfh"
            onChange={(event) => {
              const isChecked = event.target.checked;
              const value = isChecked ? "WFH" : "";
              formik.setFieldValue(
                "jobType",
                isChecked
                  ? [...formik.values.jobType, value]
                  : formik.values.jobType.filter((item) => item !== "WFH")
              );
            }}
            checked={formik.values.jobType.includes("WFH")}
          />
        </div>

        <label htmlFor="jobRoles">Job Roles</label>
        <select name="jobRoles" id="jobRoles" onChange={formik.handleChange}>
          <option value="Frontend">Frontend Development</option>
          <option value="Backend">Backend Development</option>
          <option value="Full-Stack">Full-Stack Development</option>
        </select>

        <label htmlFor="skills">Skills</label>
        <button type="button" onClick={handleSkillModal}>
          Add
        </button>
        {openSkill && (
          <div>
            <label htmlFor="domain">Choose Domain</label>
            <select id="domain" name="domain" onChange={formik.handleChange}>
              <option value="Web development">Web development</option>
              <option value="App development">App development</option>
              <option value="Cross development">Cross development</option>
            </select>
            <button onClick={() => handleSkillSet(formik.values)} type="button">
              Ok
            </button>
          </div>
        )}
      </form>

      {formik.values.skills.map((skill, index) => (
        <form>
          <h2>Skills adding block</h2>
          {formik.values.domain !== "" ? (
            <div>
              <h2>{formik.values.domain}</h2>
              <input
                type="text"
                name={`skills[${index}.mainSkill]`}
                placeholder="Enter main skill title"
                onChange={formik.handleChange}
              />
            </div>
          ) : null}
          <button onClick={handleMainSkill} type="button">
            Ok
          </button>
          {subSkillsBool &&
            skill.subSkills.map((subSkill, subSkillIndex) => (
              <div key={subSkillIndex}>
                <h2>Add Related Skills</h2>
                <input
                  type="text"
                  name={`skills[${index}].subSkills[${subSkillIndex}].subSkill`}
                  value={
                    formik.values.skills[index].subSkills[subSkillIndex]
                      .subSkill
                  }
                />
              </div>
            ))}
        </form>
      ))}
    </div>
  );
};

export default Form;
