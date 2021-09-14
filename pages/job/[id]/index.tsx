import React from "react";

export default function index() {
  return (
    <div className="job-details">
      <div className="job-details__header">
        <div className="job-details__header-left">
          <img
            src="https://images.vietnamworks.com/pictureofcompany/b0/11033181.png"
            alt="Nest"
          />
          <div>
            <p>
              [Nestlé] Electrical & Automation (E&A) Supervisor - Work in Dong
              Nai - Shuttle Bus from HCMC
            </p>
            <p>CÔNG TY TNHH NESTLÉ VIỆT NAM</p>
            <p>Địa Điểm Làm Việc: Hồ Chí Minh | Bình Dương | Đồng Nai</p>
            <p>Thương lượng</p>
            <p>159 lượt xem - Hết hạn trong 28 ngày</p>
          </div>
        </div>
        <div className="job-details__header-right">
          <button className="btn">Apply</button>
          <button className="btn">Save</button>
        </div>
      </div>
      <div className="job-details__section">
        <p className="job-details__title">Benefits</p>
        <div>
          13th & 14th month salary + yearly performance bonus + Transportation
          allowance Generali Health Insurance Transportation supported (for
          employees in Hanoi/Ho Chi Minh City
        </div>
      </div>
      <div className="job-details__section">
        <p className="job-details__title">Description</p>
        <div>
          POSITION DESCRIPTION SUMMARY : (state main purpose and scope of the
          job) Provide factory/site engineering with the required competence on
          Factory Automation System (FAS- infra structure), Process Control
          System to effectively support manufacturing operational activities and
          continuously improve manufacturing performance. Provide factory/Site
          for Egron safety delegate competency and dust explosion competency.
        </div>
      </div>
      <div className="job-details__section">
        <p className="job-details__title">Requirements</p>
        <div>
          - Education requirement: Bachelor degree or Master Degree - English
          ability: good (speaking, reading and writing) - Computer skill:
          superior skill is highly recommended, PLC programming - Experience
          related to position: at least 3 years experience in a technical field,
          preferably food manufacturing or consumer goods industry (as an M&I or
          E&A/MES Engineer, or other similar positions) - Personnel Supervisory
          experience (with technical teams, Mechanical and Electrical
          (contractors, suppliers or other 3rd parties)
        </div>
      </div>
    </div>
  );
}
